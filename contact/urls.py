from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ContactUs, MetadataViewSet

router = DefaultRouter()
router.register(r"metadata", MetadataViewSet, basename="contact-metadata")

urlpatterns = [
    path('', ContactUs.as_view(), name='contact_us'),
    path('', include(router.urls)),
]