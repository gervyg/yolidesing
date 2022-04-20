const { Router } = require("express");
const db = require("../db");
const path = require('path');
const router = Router()
const axios = require('axios')
const mail = require('../mailer')

//**Rutas API*/
router.get('/clientes', async (req, res) => {
    const user = await db.getcliente()
    res.json(user);
})

//Crear cliente
router.post('/clientes', async (req, res) => {     
    
    const { rut, nombre, email, password, direccion ,telefono } = req.body;   
    const user = await db.clienteCrear(rut, nombre, email, password, direccion,telefono )
    res.send(user);    

})
//Editar
router.put('/clientes/editar/:id', async (req, res) => {    
    
    const {id, rut, nombre, password, direccion , telefono } = req.body;   
    const user = await db.clientEditar(id, rut, nombre, password, telefono, direccion )
    res.send(user);   

})

//editando fecha de entrega desde administrar.
router.put('/presupuestos/fechaE/:id', async (req, res) => {       
    const {id} = req.params;
    const {fecha_probable_de_entrega, estado, observaciones_admin} = req.body;
    const fecha = await db.adminEditar(id, fecha_probable_de_entrega, estado,observaciones_admin )
    res.send(fecha);   

})

router.get('/productos', async (req, res) => {
    const productos = await db.productos()
    res.json(productos);
})



router.get('/presupuestos/detalles/:id', async (req, res) => { 
    const { id } = req.params;
    const presupuestosD = await db.presupuestosDetalle(id)
    res.send(presupuestosD);


})

router.get('/presupuestos/filtro', async (req, res) => {   
    const {rut, fecha_de_emision, estado } = req.query;
    const filtro = await db.presupuestoFiltro(rut, fecha_de_emision, estado)
    res.send(filtro);  
})



router.get('/administrar/presupuestos', async (req, res) => {     
    const presupuestosAdm = await db.presupuestosAdm()
    res.send(presupuestosAdm);

})


router.post('/presupuestos', async (req, res) => {     
    const { rut, productos, precio_total, observaciones_cliente } = req.body;   
    const presupuesto = await db.presupuestoCrear(rut, productos, precio_total, observaciones_cliente )
    if (presupuesto.length > 0) {
    const contenidoCorreo =  `Hola Yoliber, te ha llegado un nuevo presupuesto. 
                <br>
                RUT del cliente: ${rut}, 
                <br>
                ID Presupesto: ${presupuesto[0].id}` ;

    mail.enviar("Tienes un nuevo presupuesto ID."+presupuesto[0].id, contenidoCorreo)   
    res.send(presupuesto);    
    }else { 
        console.log("Error al Enviar Correo");
        res.send("Error al crear presupuesto");  
    }
})








module.exports = router