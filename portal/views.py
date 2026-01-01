from rest_framework import generics,permissions
from .models import *
from about.models import AboutUs
from bundles.models import Bundle
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
class NewsView(generics.ListAPIView):
    queryset = New.objects.all()
    serializer_class = NewsSerializer

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class BundleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bundle.objects.all()
    serializer_class = BundleSerializer

class FooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
class AllCommentsListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

class HomeStartingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeStarting.objects.all()
    serializer_class = HomeStartingSerializer


class SystemPartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SystemPartner.objects.all()
    serializer_class = SystemPartnerSerializer


class PortalMetadataViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving Portal page metadata.
    Provides list and retrieve endpoints for metadata.
    """
    queryset = Metadata.objects.all()
    serializer_class = PortalMetadataSerializer


class PortalMetaTagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for retrieving individual meta tags for Portal pages.
    """
    queryset = MetaTag.objects.all()
    serializer_class = PortalMetaTagSerializer


class PortalMetadataByPageView(generics.ListAPIView):
    """
    Get metadata for a specific page by page identifier.
    Example: /api/portal/metadata/?page=home
    """
    serializer_class = PortalMetadataSerializer
    
    def get_queryset(self):
        page = self.request.query_params.get('page', None)
        if page:
            return Metadata.objects.filter(page_title__icontains=page)
        return Metadata.objects.all()

