from django.urls import path, include
from .views import MetadataViewSet, DescriptionSectionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# Keep other routers here if/when re-enabled:
router.register(r'metadata', MetadataViewSet)
router.register(r'description-section', DescriptionSectionViewSet)
# router.register(r'bundles', BundleViewSet)
# router.register(r'advantages', AdvantageViewSet)

urlpatterns = [
    # path('test/', MetadataListView.as_view(), name='bundles-metadata'),
    path('', include(router.urls)),
]
