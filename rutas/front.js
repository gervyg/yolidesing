const { Router } = require("express");
const db = require("../db")
const url = require('url')
const http = require('http')
const fs = require('fs')
const axios = require('axios')
const mail = require('../mailer')

//const jwt = require('jsonwebtoken')

//const secretKey = "12346";
//console.log(secretKey)

const router = Router()

//**Rutas handlebars*/
router.get('/', async (req, res) => {
   // const user = await db.getskaters()
   res.render("index", {
    layout: "main"
});
})

router.post('/mailing', async (req, res) => {   
    const { nombre, correo, asunto, contenido } = req.body;    
    mail(nombre, correo.split(','), asunto, contenido)                
      res.send("Envie correo")   

});

router.get('/login', async (req, res) => {
    res.render("index", {
        layout: "login",
        id: req.params.id
    });
})

router.get('/cliente', async (req, res) => {
    res.render("index", {
        layout: "registro"
    });
})








module.exports = router