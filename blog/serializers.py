from rest_framework import serializers
from .models import *

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id',
            'english_title',
            'arabic_title',
            'english_description',
            'arabic_description',
            'image',
            'english_alt',
            'arabic_alt',
            'english_content',
            'arabic_content',
            'english_page_title_for_metadata',
            'arabic_page_title_for_metadata',
            'english_page_description_for_metadata',
            'arabic_page_description_for_metadata',
        ]

class BlogsPageMetadataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BlogsPageMetadata
        fields = ['id', 'english_page_title_for_metadata', 'arabic_page_title_for_metadata', 'english_page_description_for_metadata', 'arabic_page_description_for_metadata']