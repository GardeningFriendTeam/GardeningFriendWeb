from django.db import models

# Create your models here.

class Productos(models.Model):
    idproducto=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    descripcion=models.CharField(max_length=45, verbose_name='Descripción')
    imagen=models.CharField(max_length=45)
    precio=models.DecimalField
    stock=models.CharField(max_length=45)
    producto_pedido=models.ForeignKey('auth.User', on_delete=models.CASCADE)

    class Meta:
        db_table='Productos'
        

class Categoria(models.Model):
    idcategoria=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    categoria_producto=models.ForeignKey(Productos,on_delete=models.CASCADE)

    class Meta:
        db_table='Categoria'

class Pedido(models.Model):
    idpedido=models.IntegerField(primary_key=True)
    producto=models.CharField(max_length=45, verbose_name='Pedido')
    nombre=models.CharField(max_length=45, verbose_name='Nombre')
    descripcion=models.Charfield(max_length=45, verbose_name='Descripción')
    imagen=models.CharField(max_length=45)
    fecha=models.DateTimeField
    direccion_envio=models.CharField(max_length=45)
    pedido_generado=models.ForeignKey(Productos, on_delete=models.CASCADE)

    class Meta:
        db_table='Pedido'

class Carrito(models.Model):
    idcarrito=models.IntegerField(primary_key=True)
    productos=models.CharField(max_length=45, verbose_name='Productos')
    total=models.DecimalField
    pedido_carrito=models.ForeignKey(Pedido, on_delete=models.CASCADE)

    class Meta:
        db_table='Carrito'





