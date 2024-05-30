# Generated by Django 4.2.3 on 2024-05-29 17:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cultivo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('imagen', models.CharField(max_length=255)),
                ('categoria', models.CharField(max_length=45)),
                ('estacion_de_siembra', models.CharField(max_length=45)),
                ('region', models.CharField(max_length=45)),
                ('temperatura_recomendada', models.FloatField()),
                ('favorito', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='FavoritoCultivo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cultivo_favorito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='favoritos.cultivo')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]