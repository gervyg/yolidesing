require('dotenv').config()
const fs = require('fs')
const { Client } = require('pg')
const migrate = async () => {    
const client = new Client()    
await client.connect()    

//1
const sql1 = fs.readFileSync('migracionbd/1tablacliente.sql').toString();    
const res1 = await client.query(sql1)

//2
const sql2 = fs.readFileSync('migracionbd/2tablapresupuesto.sql').toString();    
const res2 = await client.query(sql2)

//3
const sql3 = fs.readFileSync('migracionbd/3tablaproducto.sql').toString();    
const res3 = await client.query(sql3)

//4
const sql4 = fs.readFileSync('migracionbd/4tabcliente_presupuesto.sql').toString();    
const res4 = await client.query(sql4)

//5
const sql5 = fs.readFileSync('migracionbd/5tabpresupuesto_producto.sql').toString();    
const res5 = await client.query(sql5)

await client.end()    
return res5.rows
}

migrate().then(console.log)