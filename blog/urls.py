from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog-details')
router.register(r'metadata', BlogsPageMetadataViewSet, basename='page-metadata')

urlpatterns = [
    path('', include(router.urls)),
]