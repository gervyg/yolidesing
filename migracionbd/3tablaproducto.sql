CREATE TABLE producto (
id SERIAL NOT NULL,
Articulo VARCHAR(50) NOT NULL,
precio INT  NOT NULL,
descripcion VARCHAR(255) NOT NULL,
foto VARCHAR(25),
estado_producto BOOLEAN  NOT NULL,
PRIMARY KEY(id));