-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-07-2020 a las 04:44:30
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `identificacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `direccion_res` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `departamento` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  PRIMARY KEY (`identificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`identificacion`, `nombre`, `telefono`, `direccion_res`, `pais`, `departamento`, `ciudad`) VALUES
(109892, 'Keivin', '12312', 'asd', 'Colombia', 'Santander', 'Bucaramanga');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

DROP TABLE IF EXISTS `detalle`;
CREATE TABLE IF NOT EXISTS `detalle` (
  `iddetalle` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` double NOT NULL,
  `precio` varchar(45) NOT NULL,
  `productos_idproductos` int(11) NOT NULL,
  `facturacion_id` int(11) NOT NULL,
  PRIMARY KEY (`iddetalle`),
  KEY `fk_detalle_productos1_idx` (`productos_idproductos`),
  KEY `fk_detalle_facturacion1_idx` (`facturacion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`iddetalle`, `cantidad`, `precio`, `productos_idproductos`, `facturacion_id`) VALUES
(1, 10, '21800', 1, 1),
(2, 20, '10000', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion`
--

DROP TABLE IF EXISTS `facturacion`;
CREATE TABLE IF NOT EXISTS `facturacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `clientes_identificacion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_facturacion_clientes1_idx` (`clientes_identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `facturacion`
--

INSERT INTO `facturacion` (`id`, `fecha`, `clientes_identificacion`) VALUES
(1, '2020-07-15', 109892);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `idproductos` int(11) NOT NULL AUTO_INCREMENT,
  `cod_prod` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `stock` double NOT NULL,
  `fecha_expiracion` date NOT NULL,
  `num_lote` int(11) NOT NULL,
  `precio` double NOT NULL,
  `marca` varchar(45) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idproductos`),
  UNIQUE KEY `cod_prod_UNIQUE` (`cod_prod`),
  UNIQUE KEY `idproductos_UNIQUE` (`idproductos`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproductos`, `cod_prod`, `nombre`, `stock`, `fecha_expiracion`, `num_lote`, `precio`, `marca`, `descripcion`) VALUES
(1, 10, 'Harina', 10, '2020-07-30', 1312, 10900, 'Kilo', 'Harina para arepas');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `fk_detalle_facturacion1` FOREIGN KEY (`facturacion_id`) REFERENCES `facturacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detalle_productos1` FOREIGN KEY (`productos_idproductos`) REFERENCES `productos` (`idproductos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD CONSTRAINT `fk_facturacion_clientes1` FOREIGN KEY (`clientes_identificacion`) REFERENCES `clientes` (`identificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
