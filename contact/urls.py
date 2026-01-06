from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ContactUs, MetadataViewSet, MetaTagViewSet

router = DefaultRouter()
router.register(r"metadata", MetadataViewSet, basename="contact-metadata")
router.register(r"meta-tags", MetaTagViewSet, basename="contact-metatag")

urlpatterns = [
    path('', ContactUs.as_view(), name='contact_us'),
    path('', include(router.urls)),
]