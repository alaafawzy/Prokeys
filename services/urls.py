from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'faq', FAQViewSet)
router.register(r'bundles', BundleViewSet)
router.register(r'footer', FooterViewSet)
router.register(r'aboutUs', AboutUsViewSet)
router.register(r'homeStarting', HomeStartingViewSet)

urlpatterns = [
    path('carousel/', NewsView.as_view(), name='news-list'),
    path('comment/', CommentCreateView.as_view(), name='comment-list-create'),
    path('yarb/', CommentCreateView.as_view(), name='comment'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
    path('all-comments/', AllCommentsListView.as_view(), name='all-comments-list'),
    path('', include(router.urls)),
]