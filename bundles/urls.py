from django.urls import path, include
from .views import MetadataViewSet, DescriptionSectionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# Keep other routers here if/when re-enabled:
router.register(r'metadata', MetadataViewSet)
router.register(r'description-section', DescriptionSectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
