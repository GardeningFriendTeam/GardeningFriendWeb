from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_admin', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     password = validated_data.pop('password')
    #     user = User.objects.create(**validated_data)
    #     user.set_password(password)
    #     user.save()
    #     return user