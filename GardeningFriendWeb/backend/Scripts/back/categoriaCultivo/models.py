from django.db import models

# Create your models here.
class CategoriaCultivo(models.Model):
    nombre = models.CharField(max_length=100, blank=False)

    class Meta:
        db_table = "categoriaCultivo"
        verbose_name_plural = "categoriasCultivos"
        verbose_name = "categoriaCultivo"

    def __str__(self):
        return self.nombre