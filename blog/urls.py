from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog-details')
router.register(r'single-blog-metadata', SigngleBlogMetadataViewSet, basename='single-metadata')
router.register(r'metadata', BlogsPageMetadataViewSet, basename='page-metadata')

urlpatterns = [
    # path('', ListBlogsView.as_view(), name='list-blogs'),
    path('metadata/<int:blog_id>/', BlogMetadataByBlogView.as_view(), name='blog-metadata-by-id'),
    path('', include(router.urls)),
]