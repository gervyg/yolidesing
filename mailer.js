const nodemailer = require('nodemailer')

//aplicando nodemailer en una funcion que envia correos
let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: 'yolidesing8@gmail.com',
                    pass: 'yolisophia',

                },

                tls: {
                    rejectUnauthorized: false
                }

            })

async function enviar(nombre, correo, asunto, contenido) {
    return new Promise((resolve, reject) => {
   
            let mailOptions = {
                from: 'yolidesing8@gmail.com',
                to:'yolidesing8@gmail.com',
                subject: asunto,
                html: `${nombre}, 
                       <br>
                       ${correo}, 
                       <br>
                       ${contenido}` 
            }

            transporter.sendMail(mailOptions, (err, data) => {

                if (err) {
                    console.log(err);
                    reject(err);
                }

                if (data) {
                    console.log(data);
                    resolve(data) ;
                }
            })
        
    });
}


module.exports = enviar