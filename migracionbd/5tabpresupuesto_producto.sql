CREATE TABLE presupuesto_producto (
id SERIAL NOT NULL,
presupuesto_id INT,
producto_id INT,
FOREIGN KEY (presupuesto_id) REFERENCES presupuesto(id),
FOREIGN KEY (producto_id) REFERENCES producto(id),
Precio INT NOT NULL,
Cantidad INT NOT NULL,
PRIMARY KEY(id));