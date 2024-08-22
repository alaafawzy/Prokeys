from django.urls import path
from .views import *

urlpatterns = [
    path('user/', UserView.as_view(),name='user_page'),
    # path('register/', RegisterView.as_view(),name='register'),
    path('login/', LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(),name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    # path('reset/',Password_reset_request.as_view(),name = 'reset'),
    # path('resetPassword/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('resetComplete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('forget-password/', PasswordResetRequestView.as_view(), name='send_password_reset_email'),
    path('reset-password/<uidb64>/<token>/', PasswordResetView.as_view(), name='reset_password')
    
]