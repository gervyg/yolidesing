const { Router } = require("express");
const db = require("../db");
const path = require('path');
const router = Router()
const axios = require('axios')

//**Rutas API*/
router.get('/clientes', async (req, res) => {
    const user = await db.getcliente()
    res.json(user);
})

//Crear
router.post('/clientes', async (req, res) => {     
    
    const { rut, nombre, email, password, direccion ,telefono } = req.body;   
    const user = await db.clienteCrear(rut, nombre, email, password, direccion,telefono )
    res.send(user);    

})


router.get('/productos', async (req, res) => {
    const productos = await db.productos()
    res.json(productos);
})










module.exports = router