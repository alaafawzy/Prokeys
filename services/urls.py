from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', ServiceViewSet, basename='services')
router.register(r'service-sections', ServiceSectionViewSet, basename='service-sections')

urlpatterns = [
    path('', include(router.urls)),
]