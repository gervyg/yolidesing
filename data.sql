CREATE DATABASE yolidesing;


CREATE TABLE cliente (
id SERIAL NOT NULL,
rut VARCHAR(20) NOT NULL, 
nombre VARCHAR(25) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(12) NOT NULL, 
direccion VARCHAR(255) NOT NULL, 
telefono VARCHAR(15) NOT NULL,
PRIMARY KEY(rut));




CREATE TABLE presupuesto (
id SERIAL NOT NULL,
fecha_de_emision DATE  NOT NULL,
fecha_de_validez DATE  NOT NULL,
fecha_probable_de_entrega DATE,
precio_total INT NOT NULL,
observaciones_cliente  VARCHAR(255), 
observaciones_admin  VARCHAR(255),
estado VARCHAR(25) NOT NULL,
PRIMARY KEY(id));

CREATE TABLE producto (
id SERIAL NOT NULL,
Articulo VARCHAR(50) NOT NULL,
precio INT  NOT NULL,
descripcion VARCHAR(255) NOT NULL,
foto VARCHAR(25),
estado_producto BOOLEAN  NOT NULL,
PRIMARY KEY(id));


CREATE TABLE cliente_presupuesto (
id SERIAL NOT NULL,
rut_cliente VARCHAR(20) NOT NULL,
id_presupuesto INT,
FOREIGN KEY (rut_cliente) REFERENCES cliente(rut),
FOREIGN KEY (id_presupuesto) REFERENCES presupuesto(id),
PRIMARY KEY(id));

CREATE TABLE presupuesto_producto (
id SERIAL NOT NULL,
presupuesto_id INT,
producto_id INT,
FOREIGN KEY (presupuesto_id) REFERENCES presupuesto(id),
FOREIGN KEY (producto_id) REFERENCES producto(id),
Precio INT NOT NULL,
Cantidad INT NOT NULL,
PRIMARY KEY(id));
