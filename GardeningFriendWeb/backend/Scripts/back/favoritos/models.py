from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Cultivo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.CharField(max_length=255)
    categoria = models.CharField(max_length=45)
    estacion_de_siembra = models.CharField(max_length=45)
    region = models.CharField(max_length=45)
    temperatura_recomendada = models.FloatField()
    favorito = models.BooleanField()
    


class FavoritoCultivo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    cultivo_favorito = models.ForeignKey(Cultivo, on_delete=models.CASCADE)