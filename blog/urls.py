from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BlogViewSet, BlogsPageMetadataViewSet, BlogBySlugView


router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog-details')
router.register(r'metadata', BlogsPageMetadataViewSet, basename='page-metadata')

urlpatterns = [
    path('', include(router.urls)),
    # Use <str:slug> so Arabic (Unicode) slugs are accepted
    path('blogs/by-slug/<str:slug>/', BlogBySlugView.as_view(), name='blog-by-slug'),
]