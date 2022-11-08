import AWS from 'aws-sdk'
import * as nodemailer from "nodemailer"
const path = require("path")

//todo make keys
AWS.config.update({ 
    accessKeyId: process.env.AWS_SES_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
    region: 'us-east-1' 
})

var transporter = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: '2010-12-01' })
})

export const Mailer = transporter;

export const SendEmail = async (to, subject, text) => {
    try{
        var send = await transporter.sendMail({
			from: '"Fridom" <naoresponda@fridom.com.br>',
            to: to || "lucasevivibackup@gmail.com", 
            subject: subject || "Sem título", 
            text: text || "Sem texto"
        }, (err) => console.log("err", err))

        console.log("send", send)
        if(!send) throw new Error("Não foi possível enviar o email!")

        return {ok: true}

    }catch(err){
        return err.message
    }
}