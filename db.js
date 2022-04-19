const url = require('url')
const { Pool } = require("pg");
const { query } = require('express');
const { Client } = require('pg')

require('dotenv').config()
const { Router } = require("express")




const connectionString = process.env.DATABASE_URL


const getcliente = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect();
    const res = await client.query('SELECT * from cliente')
    await client.end()
    return res.rows
}


const productos = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect();
    const res = await client.query('SELECT * from producto')
    await client.end()
    return res.rows
}





const clienteInicio = async (email, password) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    console.log(email, password)
    await client.connect();
    const res = await client.query(`SELECT * from cliente WHERE email='${email}' and password = '${password}'; `)
    await client.end()
    return res.rows
}


const clienteCrear = async (rut, nombre, email, password, direccion, telefono) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()
    const res = await client.query(`INSERT INTO cliente (rut, nombre, email, password, direccion, telefono) VALUES ('${rut}', '${nombre}' , '${email}', '${password}', '${direccion}', '${telefono}' );`);
    await client.end()
    return res.rows;

}

// Editando Cliente
const clientEditar = async (id, rut, nombre, password, telefono, direccion) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()
    const res = {
        text: `UPDATE cliente SET rut = $2, nombre = $3, password = $4, direccion= $6, telefono= $5 WHERE id = $1`,
        values: [id, rut, nombre, password, telefono, direccion]
    }
    const result = await client.query(res);
    await client.end()
    return result;

}


const presupuestos = async (rut) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect();
    const res = await client.query(`SELECT p.* FROM presupuesto p INNER JOIN cliente_presupuesto cp  ON p.id= cp.id_presupuesto AND cp.rut_cliente='${rut}'`)
    await client.end()
    return res.rows
}


const presupuestoFiltro = async (rut, fecha, estado) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    let where = (rut != "" || fecha != "" || estado != "")? "WHERE" : ""; 
    let filtroRut = (rut != "")? "cp.rut_cliente='"+rut+"'" : ""; 
    let filtroFecha = (fecha != "")? ((filtroRut != "")?" and p.fecha_de_emision='"+fecha+"'": " p.fecha_de_emision='"+fecha+"'") : ""; 
    let filtroEstado= (estado != "")? ((filtroFecha != "" || filtroRut != "")?" and p.estado='"+estado+"'": "p.estado='"+estado+"'") : "" ;
        
    await client.connect();
    const res = await client.query(`SELECT p.*, c.rut, c.nombre, c.email, c.telefono FROM presupuesto p INNER JOIN cliente_presupuesto cp ON p.id= cp.id_presupuesto LEFT JOIN cliente AS c ON c.rut=cp.rut_cliente ${where} ${filtroRut} ${filtroFecha} ${filtroEstado}`)
    await client.end()
    return res.rows
}







const presupuestoCrear = async (rut, productos, precio_total, observaciones_cliente) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()
    const res = await client.query(`INSERT INTO presupuesto (fecha_de_emision, fecha_de_validez,  precio_total, observaciones_cliente,  estado) 
                                    VALUES ( NOW(), NOW() + interval'3 D' , '${precio_total}', '${observaciones_cliente}', 'PENDIENTE' )RETURNING *;`);

    if (res.rows.length > 0) {
        let idPresupuesto = res.rows[0].id;

        const res2 = await client.query(`INSERT INTO cliente_presupuesto (rut_cliente,  id_presupuesto) 
                                        VALUES ('${rut}', '${idPresupuesto}') RETURNING *;`);

        if (res2.rows.length > 0) {

            for (i = 0; i < productos.length; i++) {
                const res3 = await client.query(`INSERT INTO presupuesto_producto (presupuesto_id, producto_id, precio, cantidad) 
                                                 VALUES ('${idPresupuesto}', '${productos[i].id}', '${productos[i].precio}', '${productos[i].cantidad}') RETURNING *;`);

            }
        }

    }
    await client.end()
    return res.rows;

}

const presupuestosDetalle = async (id) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect();
    
    const res = await client.query(`SELECT p.*, pp.* from producto p INNER join presupuesto_producto pp ON p.id=pp.producto_id and pp.presupuesto_id='${id}'`)
    await client.end()
    return res.rows
}

const presupuestosAdm = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect();    
    const res = await client.query(`SELECT p.*,  c.rut, c.nombre, c.email, c.telefono from cliente_presupuesto AS cp INNER join presupuesto AS p ON cp.id_presupuesto=p.id LEFT JOIN cliente AS c ON c.rut=cp.rut_cliente;`)
     
    await client.end()
    return res.rows
}

const adminEditar = async (id, fecha_probable_de_entrega, estado, observaciones_admin) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()
    const res = {
        text: `UPDATE presupuesto SET fecha_probable_de_entrega = $2, estado = $3, observaciones_admin = $4 WHERE id = $1`,
        values: [id, fecha_probable_de_entrega, estado, observaciones_admin]
    }
    const result = await client.query(res);
    await client.end()
    return result;

}




const productoCrear = async (articulo, precio, descripcion, foto, estado) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    await client.connect()
    const res = await client.query(`INSERT INTO producto (articulo, precio, descripcion, foto, estado) VALUES ('${articulo}', '${precio}' , '${descripcion}', '${foto}', '${estado}' );`);
    await client.end()
    return res.rows;

}




module.exports = { getcliente, clienteInicio, clienteCrear, productos, clientEditar, presupuestoCrear, presupuestos, presupuestosDetalle, presupuestosAdm, adminEditar, presupuestoFiltro }