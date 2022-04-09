const { Router } = require("express");
const db = require("../db")
const url = require('url')
const http = require('http')
const fs = require('fs')
const axios = require('axios')
const mail = require('../mailer')

const jwt = require('jsonwebtoken')

const secretKey = "12346";
//console.log(secretKey)

const router = Router()

//**Rutas handlebars*/
router.get('/', async (req, res) => {
    const user = await db.getcliente()
    res.render('index', { user })   

});


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

//Verificando token
const Verificar = (req, res, next) => {
    let { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({
                error: "401 No Autorizado",
                message: err.message,
            })
        } else {
            req.user = decoded;
            next();
        };


    })
};

router.get('/administrar', Verificar, async (req, res) => {
    const user = await db.getcliente()

    res.render("index", {
        layout: "administrar",
        user: user
    });

})

router.get('/cliente', async (req, res) => {
    res.render("index", {
        layout: "registro"
    });
})

router.get('/cliente/main', async (req, res) => {
    res.render("index", {
        layout: "main"
    });
})

router.get('/cliente/login', async (req, res) => {
    res.render("index", {
        layout: "login"
    });
})
router.get('/cliente/listapresupuesto', async (req, res) => {
    res.render("index", {
        layout: "listapresupuesto"
    });
})
router.get('/cliente/editar', async (req, res) => {console.log("llegue a editar front")
    res.render("index", {
        layout: "editar",
        id: req.params.id
    });
})


router.get('/cliente/presupuesto', async (req, res) => {
    const productos = await db.productos()
    res.render("index", {
        layout: "presupuesto",
        productos: productos
    });
})



router.get('/cliente/presupuesto/lista', async (req, res) => {
    res.render("index", {
        layout: "listapresupuesto"
    });
})

router.get('/SignIn', async (req, res) => {
    const { email, password } = req.query;
    const user = await db.clienteInicio(email, password)

    if (user.length != 0) {
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 120, data: user[0], },
            secretKey

        );

        if (email == "adminyoli@gmail.com") {
            res.send(` 
                <script>
                localStorage.setItem('token', JSON.stringify('${token}'))
                window.location.href = "/administrar?token=${token}";
                </script>
            `);
        } else {
            res.send(` 
                <script>
                localStorage.setItem('token', JSON.stringify('${token}'))
                window.location.href = "/cliente/presupuesto?token=${token}";
                </script>
            `);
        }

    } else {
        res.send("Usuario o contraseña incorrecta");
    }
});



module.exports = router