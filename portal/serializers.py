from rest_framework import serializers
from .models import *
from about.models import  AboutSection, AboutUs
from bundles.models import Advantage, Bundle

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = New
        fields = '__all__'  # This includes all fields of the model. You can specify specific fields like ('name', 'description').
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'english_question', 'arabic_question','english_answer','arabic_answer']

class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = ['id', 'bundle', 'english_advantage','arabic_advantage']

class BundleSerializer(serializers.ModelSerializer):
    advantages = AdvantageSerializer(many=True, read_only=True)

    class Meta:
        model = Bundle
        fields = ['id', 'english_name', 'arabic_name','advantages', 'price', 'discount', 'best_seller']

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = ['id', 'english_address','arabic_address', 'phone', 'email', 'facebook_url', 'instagram_url', 'twitter_url', 'youtube_url', 'linkedin_url', 'whatsapp_url']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'english_name', 'arabic_name', 'english_job_title', 'arabic_job_title', 'english_description', 'arabic_description', 'rate', 'created_at']


class HomeStartingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeStarting
        fields ='__all__'


class SystemPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemPartner
        fields = ['id', 'name', 'logo', 'english_alt', 'arabic_alt']





class PortalMetadataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Metadata
        fields = '__all__'


class PagePathSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagePath
        fields = [
            'id',
            'key',
            'english_path',
            'arabic_path',
        ]





class AboutSectionSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = AboutSection
        fields = '__all__'


class AboutUsSerializer(serializers.ModelSerializer):
    about_sections = AboutSectionSerializer(many=True, read_only=True)

    class Meta:
        model = AboutUs
        fields = [
            'id',
            'english_title',
            'arabic_title',
            'english_description',
            'arabic_description',
            'about_sections'
        ]