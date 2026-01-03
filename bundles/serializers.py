from rest_framework import serializers
from .models import MetaTag, Metadata, DescriptionSection


class MetaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTag
        fields = '__all__'


class MetadataSerializer(serializers.ModelSerializer):
    meta_tags = MetaTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Metadata
        # fields = ['id', 'page_title', 'meta_tags']
        fields = ['id', 'page_title', 'meta_tags']


class DescriptionSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DescriptionSection
        fields = [
            'id',
            'english_title',
            'arabic_title',
            'english_description',
            'arabic_description',
            'image',
            'english_alt',
            'arabic_alt',
        ]


# class AdvantageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Advantage
#         fields = ['id', 'english_advantage', 'arabic_advantage']


# class BundleSerializer(serializers.ModelSerializer):
#     advantages = AdvantageSerializer(many=True, read_only=True)
    
#     class Meta:
#         model = Bundle
#         fields = ['id', 'english_name', 'arabic_name', 'price', 'discount', 'best_seller', 'advantages']
