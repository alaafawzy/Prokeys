from rest_framework import serializers
from .models import MetaTag, Metadata, AboutUs, AboutSection


class MetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTag
        fields = '__all__'


class MetadataSerializer(serializers.ModelSerializer):
    meta_tags = MetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Metadata
        fields = ['id', 'page_title', 'meta_tags']




class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['id', 'english_title', 'arabic_title', 'english_description', 'arabic_description']




class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ['id', 'arabic_title', 'english_title', 'english_content', 'arabic_content', 'section_image', 'image_alt_text']
