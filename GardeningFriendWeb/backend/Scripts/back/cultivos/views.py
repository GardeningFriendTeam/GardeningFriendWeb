from django.shortcuts import render
from .models import Cultivo
from .serializers import CultivoSerializer
from rest_framework import viewsets # type: ignore
from rest_framework.permissions import AllowAny # type: ignore

# Create your views here.

class CultivoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CultivoSerializer
    queryset = Cultivo.objects.all()