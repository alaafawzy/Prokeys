from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'service-sections', ServiceSectionViewSet, basename='service-sections')
# router.register(r'single-service-metadata', SingleServiceMetadataViewSet, basename='single-service-metadata')
router.register(r'metadata', ServicesPageMetadataViewSet, basename='services-metadata')
router.register(r'description-section', ServicesDescriptionSectionViewSet, basename='services-description-section')

urlpatterns = [
    path('', include(router.urls)),
]