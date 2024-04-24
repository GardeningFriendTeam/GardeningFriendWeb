from django.db import models

class Perfil (models.Model):
    nombre=models.CharField(max_length=50)
    correo=models.CharField(max_length=50)
