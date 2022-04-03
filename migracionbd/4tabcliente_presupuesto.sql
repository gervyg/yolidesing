CREATE TABLE cliente_presupuesto (
id SERIAL NOT NULL,
rut_cliente VARCHAR(20) NOT NULL,
id_presupuesto INT,
FOREIGN KEY (rut_cliente) REFERENCES cliente(rut),
FOREIGN KEY (id_presupuesto) REFERENCES presupuesto(id),
PRIMARY KEY(id));