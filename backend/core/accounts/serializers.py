from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False  # Kullanıcıyı pasif olarak oluştur
        )

        # Kullanıcı aktivasyon maili gönder
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        activation_link = f"http://127.0.0.1:8000/auth/activate/{uid}/{token}/"

        subject = "Activate Your Account"
        message = f"Hello {user.username},\n\nClick the link below to activate your account:\n{activation_link}"
        try:
            send_mail(subject, message, 'your-email@gmail.com', [user.email])
        except Exception as e:
            print(f"Error sending activation email: {e}")

        return user
