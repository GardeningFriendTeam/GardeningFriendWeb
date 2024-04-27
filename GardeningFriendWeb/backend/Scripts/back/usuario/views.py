from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializer import CustomUserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
# Create your views here.
