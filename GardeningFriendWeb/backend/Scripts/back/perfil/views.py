from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PerfilSerializer
from .models import Perfil


class PerfilViewSet(viewsets.ModelViewSet):
 queryset=Perfil.objects.all()
 serializer_class= PerfilSerializer
