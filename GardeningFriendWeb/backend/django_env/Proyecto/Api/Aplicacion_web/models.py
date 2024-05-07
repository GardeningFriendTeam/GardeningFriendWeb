from django.db import models

# Create your models here.
class Usuario(models.Model):
    idusuario=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    email=models.CharField(max_length=45)
    password=models.CharField(max_length=8)
    favoritos=models.CharField(max_length=45)
    is_admin=models.BooleanField
    class Meta:
        db_table='Usuario'

class Cultivo(models.Model):
    idcultivo=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    descripcion=models.CharField(max_length=45, verbose_name='Descripción')
    imagen=models.CharField(max_length=45)
    region=models.CharField(max_length=45)
    estacion_siembra=models.CharField(max_length=45)
    temperatura_recomendada=models.DecimalField
    usuario_cultivo=models.ForeignKey(Usuario, on_delete=models.CASCADE)
    class Meta:
        db_table='Cultivo'


class Pedido(models.Model):
    idpedido=models.IntegerField(primary_key=True)
    producto=models.CharField(max_length=45, verbose_name='Pedido')
    nombre=models.CharField(max_length=45, verbose_name='Descripción')
    imagen=models.CharField(max_length=45)
    fecha=models.DateTimeField
    direccion_envio=models.CharField(max_length=45)
    usuario_pedido=models.ForeignKey(Usuario, on_delete=models.CASCADE)

    class Meta:
        db_table='Pedido'

class Carrito(models.Model):
    idcarrito=models.IntegerField(primary_key=True)
    productos=models.CharField(max_length=45, verbose_name='Productos')
    total=models.DecimalField
    pedido_carrito=models.ForeignKey(Pedido, on_delete=models.CASCADE)

    class Meta:
        db_table='Carrito'

class Productos(models.Model):
    idproducto=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    descripcion=models.CharField(max_length=45, verbose_name='Descripción')
    imagen=models.CharField(max_length=45)
    precio=models.DecimalField
    stock=models.CharField(max_length=45)
    producto_pedido=models.ForeignKey(Pedido, on_delete=models.CASCADE)

    class Meta:
        db_table='Productos'

class Categoria(models.Model):
    idcategoria=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    categoria_producto=models.ForeignKey(Productos,on_delete=models.CASCADE)

    class Meta:
        db_table='Categoria'

