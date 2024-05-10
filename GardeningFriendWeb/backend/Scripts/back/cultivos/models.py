from django.db import models


class Cultivo(models.Model):
    id_cultivo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    categoria = models.CharField(max_length=45)
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    descripcion = models.TextField()
    imagen = models.CharField(max_length=255)
    region = models.CharField(max_length=45)
    estacion_de_siembra = models.CharField(max_length=45)
    temperatura_recomendada = models.FloatField()
    favorito = models.BooleanField()


class Meta:
    db_table = 'cultivo'
    verbose_name = 'Cultivo'
    verbose_name_plural = 'Cultivos'

def __str__(self):
    if self.nombre==None:
        return "ERROR-CULTIVOS NOMBRE IS NULL"
    return self.nombre