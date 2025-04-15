from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

# 📌 Kullanıcı Kayıt (Register)
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully. Check your email for activation."}, status=201)
    return Response(serializer.errors, status=400)

# 📌 Kullanıcı Aktivasyonu (Email ile)
@api_view(['GET'])
def activate_account(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"message": "Account activated successfully!"}, status=200)
        else:
            return Response({"error": "Invalid token"}, status=400)
    except:
        return Response({"error": "Invalid activation link"}, status=400)

# 📌 Kullanıcı Girişi (Login ve JWT Token Alma)
@api_view(['POST'])
def login(request):
    # identifier=request.data.get("username") or request.data.get("email")
    username=request.data.get("username")
    password = request.data.get("password")

    # user = User.objects.filter(username=identifier).first()
    user = User.objects.filter(username=username).first()
    # if not user:
    #     user=User.objects.filter(email=identifier).first()

    if user and user.check_password(password):
        if not user.is_active:
            return Response({"error": "Account is not activated. Check your email."}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    return Response({"error": "Invalid credentials"}, status=401)

# 📌 Kullanıcı Bilgilerini Getirme (JWT ile)
@api_view(['GET'])
def get_user(request):
    user = request.user
    return Response({"id": user.id, "username": user.username, "email": user.email})
