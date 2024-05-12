from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'nombre', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            nombre=validated_data['nombre'],
            password=validated_data['password']
        )
        return user
    
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = get_user_model().objects.filter(email=data['email']).first()
        if user is None:
            raise serializers.ValidationError("Invalid email or password")
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Invalid email or password")
        
        return {'user': user}