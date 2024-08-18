from django.urls import path
from .views import *

urlpatterns = [
    path('', ContactUs.as_view(),name='contact_us'),
]