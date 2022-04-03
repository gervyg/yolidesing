const { Router } = require("express");
const db = require("../db")

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










module.exports = router