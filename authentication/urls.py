from django.urls import path
from .views import *

urlpatterns = [
    path('user/', UserView.as_view(),name='user_page'),
    # path('register/', RegisterView.as_view(),name='register'),
    path('login/', LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(),name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
]