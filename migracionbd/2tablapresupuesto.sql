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