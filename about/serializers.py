from rest_framework import serializers
from .models import  Metadata, AboutUs, AboutSection





class MetadataSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Metadata
        fields = "__all__"




class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['id', 'english_title', 'arabic_title', 'english_description', 'arabic_description']




class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = [
            'id',
            'arabic_title',
            'english_title',
            'english_content',
            'arabic_content',
            'section_image',
            'english_alt',
            'arabic_alt',
        ]
