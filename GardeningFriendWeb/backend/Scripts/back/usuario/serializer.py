# from rest_framework import serializers
# # from .models import CustomUser
# from .models import User

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ('id', 'email', 'nombre', 'password')
#         extra_kwargs = {'password': {'write_only': True, 'required': True}}

#     def create(self, validated_data):
#         user = CustomUser.objects.create_user(
#             email=validated_data['email'],
#             nombre=validated_data['nombre'],
#             password=validated_data['password']
#         )
#         return user

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         # model = CustomUser
#         model = User
#         # fields = ['id', 'username', 'email', 'password']
#         fields = ['id', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         # user = CustomUser.objects.create_user(
#         user = User.objects.create_user(
#             # username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user

# from rest_framework import serializers
# from .models import CustomUser

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'username', 'name', 'is_active', 'is_staff', 'date_joined']

from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_admin', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user