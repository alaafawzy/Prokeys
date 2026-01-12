from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'metadata', MetadataViewSet)
# router.register(r'meta-tags', MetaTagViewSet)
router.register(r'about-us', AboutUsViewSet)
router.register(r'sections', AboutSectionViewSet)
# router.register(r'section-items', AboutSectionListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
