from django.db import models
from categoriaCultivo.models import CategoriaCultivo


class Cultivo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    categoria = models.CharField(max_length=45)
    #categoria = models.ForeignKey(CategoriaCultivo, on_delete=models.CASCADE)
    # usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    descripcion = models.TextField()
    # imagen = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to='photos/')
    region = models.CharField(max_length=45)
    estacion = models.CharField(max_length=45)
    temperatura = models.FloatField()
    favorito = models.BooleanField(default=False)


class Meta:
    db_table = 'cultivo'
    verbose_name = 'Cultivo'
    verbose_name_plural = 'Cultivos'

def __str__(self):
    if self.nombre is None:
        return "ERROR-CULTIVOS NOMBRE IS NULL"
    return self.nombre