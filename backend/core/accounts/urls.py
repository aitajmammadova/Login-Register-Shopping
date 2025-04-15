from django.urls import path
from .views import register, activate_account, login, get_user

urlpatterns = [
    path('register/', register, name='register'),
    path('activate/<uidb64>/<token>/', activate_account, name='activate'),
    path('login/', login, name='login'),
    path('user/', get_user, name='get_user'),
]
