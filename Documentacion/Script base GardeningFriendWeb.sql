-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(25) NOT NULL,
  `password` VARCHAR(8) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cultivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cultivo` (
  `idcultivo` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `region` VARCHAR(45) NOT NULL,
  `estacion_siembra` VARCHAR(45) NOT NULL,
  `temperatura_recomendada` FLOAT NOT NULL,
  `usuario_cultivo` INT NULL,
  PRIMARY KEY (`idcultivo`),
  INDEX `fk_usuario_cultivo_idx` (`usuario_cultivo` ASC),
  CONSTRAINT `fk_usuario_cultivo`
    FOREIGN KEY (`usuario_cultivo`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos` (
  `idproductos` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `precio` DECIMAL NOT NULL,
  `stock` VARCHAR(45) NOT NULL,
  `producto_pedido` INT NULL,
  PRIMARY KEY (`idproductos`),
  INDEX `producto_pedido_idx` (`producto_pedido` ASC),
  CONSTRAINT `producto_pedido`
    FOREIGN KEY (`producto_pedido`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pedido` (
  `idpedido` INT NOT NULL,
  `producto` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `fecha` DATETIME NOT NULL,
  `direccion_envio` VARCHAR(45) NOT NULL,
  `pedido_generado` INT NULL,
  PRIMARY KEY (`idpedido`),
  INDEX `pedido_generado_idx` (`pedido_generado` ASC),
  CONSTRAINT `pedido_generado`
    FOREIGN KEY (`pedido_generado`)
    REFERENCES `mydb`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`carrito` (
  `idcarrito` INT NOT NULL,
  `productos` VARCHAR(45) NOT NULL,
  `total` DECIMAL NOT NULL,
  `carrito_pedido` INT NULL,
  PRIMARY KEY (`idcarrito`),
  INDEX `carrito_pedido_idx` (`carrito_pedido` ASC),
  CONSTRAINT `carrito_pedido`
    FOREIGN KEY (`carrito_pedido`)
    REFERENCES `mydb`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `idcategoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `categoria_producto` INT NULL,
  PRIMARY KEY (`idcategoria`),
  INDEX `categori_productos_idx` (`categoria_producto` ASC),
  CONSTRAINT `categori_productos`
    FOREIGN KEY (`categoria_producto`)
    REFERENCES `mydb`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
