from rest_framework import serializers
from .models import *

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
        fields = ['id', 'english_name', 'arabic_name','advantages']

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = ['id', 'english_address','arabic_address', 'phone']

class CommentSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user_first_name', 'user_last_name', 'role', 'description']

