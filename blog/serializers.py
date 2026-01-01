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
            'english_content',
            'arabic_content',
        ]


class SingleBlogMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleBlogMetaTag
        fields = ['id', 'attribute_type', 'meta_name', 'meta_content']


class SigngleBlogMetadataSerializer(serializers.ModelSerializer):
    meta_tags = SingleBlogMetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = SigngleBlogMetadata
        fields = ['id', 'blog', 'page_title', 'meta_tags']


class BlogsPageMetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogsPageMetaTag
        fields = ['id', 'attribute_type', 'meta_name', 'meta_content']


class BlogsPageMetadataSerializer(serializers.ModelSerializer):
    meta_tags = BlogsPageMetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogsPageMetadata
        fields = ['id', 'page_title', 'meta_tags']