DROP DATABASE IF EXISTS gestorTareas;
CREATE DATABASE gestorTareas;
USE gestorTareas;

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE `tareas` (
	id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255),
    descripcion text,
    progreso ENUM("0","1","2") DEFAULT "0",
    fecha_creacion DATETIME
);
