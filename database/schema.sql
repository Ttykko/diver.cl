-- Estructura arquitectónica definitiva para DIVER.CL
CREATE DATABASE IF NOT EXISTS diver_db_2026;
USE diver_db_2026;

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('recreativo','alumno','profesional','empresa','admin','cliente') DEFAULT 'cliente',
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `telefono` VARCHAR(20) DEFAULT NULL,
  `avatar` TEXT DEFAULT NULL
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` INT NOT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `icono` VARCHAR(50) DEFAULT NULL,
  `link_afiliado` VARCHAR(255) DEFAULT NULL,
  `imagen_url` VARCHAR(255) DEFAULT NULL,
  `categoria` VARCHAR(50) DEFAULT NULL
);

-- 3. Tabla de Órdenes (Cabecera)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT NULL,
  `total` DECIMAL(10,2) DEFAULT NULL,
  `status` VARCHAR(20) DEFAULT NULL,
  `estado` VARCHAR(20) DEFAULT 'pendiente',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- 4. Tabla de Ítems de la Orden (Detalle N:M)
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT DEFAULT NULL,
  `product_id` INT DEFAULT NULL,
  `cantidad` INT DEFAULT NULL,
  `precio` INT DEFAULT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
);
