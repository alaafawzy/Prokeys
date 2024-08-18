from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'faq', FAQViewSet)
router.register(r'bundles', BundleViewSet)
router.register(r'footer', FooterViewSet)

urlpatterns = [
    path('carousel/', NewsView.as_view(), name='news-list'),
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
    path('all-comments/', AllCommentsListView.as_view(), name='all-comments-list'),
    path('', include(router.urls)),
]