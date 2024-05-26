# Generated by Django 4.2.4 on 2024-05-21 21:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categoriaCultivo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cultivo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=45)),
                ('descripcion', models.TextField()),
                ('imagen', models.ImageField(upload_to='photos/')),
                ('region', models.CharField(max_length=45)),
                ('estacion', models.CharField(max_length=45)),
                ('temperatura', models.FloatField()),
                ('favorito', models.BooleanField(default=False)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categoriaCultivo.categoriacultivo')),
            ],
        ),
    ]
