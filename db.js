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


const clienteCrear = async (rut, nombre, email, password, direccion ,telefono ) => {
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
const clientEditar = async (id, rut, nombre, password, telefono ,direccion) => { 
    const client = new Client({
     connectionString: process.env.DATABASE_URL,
     ssl: {
     rejectUnauthorized: false
     }
     })

 await client.connect() 
 const res = {
    text: `UPDATE cliente SET rut = $2, nombre = $3, password = $4, direccion= $6, telefono= $5 WHERE id = $1`,
    values: [id, rut, nombre, password, telefono, direccion ]
}  
const result = await client.query(res);
 await client.end()
 return result;

}


      



const presupuestoCrear = async (fecha_de_emision, fecha_de_validez, precio_total, observaciones_cliente, estado) => {
    const client = new Client({
     connectionString: process.env.DATABASE_URL,
     ssl: {
     rejectUnauthorized: false
     }
     })

 await client.connect()
 const res = await client.query(`INSERT INTO cliente (fecha_de_emision, fecha_de_validez,  precio_total, observaciones_cliente,  estado) 
 VALUES ( NOW(), NOW + interval'3 D' , '${precio_total}', '${observaciones_cliente}',  '${estado}' );`);
 await client.end()
 return res.rows;

}

const productoCrear = async (articulo, precio, descripcion, foto, estado ) => {
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



module.exports = { getcliente, clienteInicio, clienteCrear, productos,clientEditar }