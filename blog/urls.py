from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'<int:pk>/', BlogViewSet, basename='blog-details')

urlpatterns = [
    path('', ListBlogsView.as_view(), name='list-blogs'),
    path('', include(router.urls)),
]