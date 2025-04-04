//Importamos todas las librerias 
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"
import crypto from "crypto"
import clientesModel from "../models/Cientes.js"
import {config} from "../config.js"

//array de funciones 
const registerClientsController = {};

registerClientsController.registerClient = async (req, res) => {


const {name, lastname, birthday, email, password,telephone,dui, isVerified, } = req.body;
try{

const existingClient = await clientesModel.findOne({email})
if (existingClient){

    return res.json({message: "Client already exists"})

}

const  passwordHash = await bcryptjs.hash(password, 10)

//Guardamos en la base de datos 
const newClient = new clientesModel({

    name,
     lastname,
      birthday, email,
       password: passwordHash,telephone,
       dui: dui || null,
       isVerified: isVerified || false,


    
})

await newClient.save()

//Generar codigo de verificacion 
const verificationCode = crypto.randomBytes(3).toString("hex")
const expiresAt = Date.now() = 2*60*60*1000; //2h



const tokenCode = jsonwebtoken.sign({
//1 que guardaremos 
email,verificationCode,expiresAt
},
config.JWT.secret,
{expiresIn: config.JWT.expiresIn},
(error, token) =>
{
if(error)console.log("error" + error)
    res.cookie("verificationToken", token, {maxAge: 2*60*60*1000})


}
)

//Enviar Correo
const transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {

        user: config.EMAIL.user,
        pass: config.EMAIL.password
    }



})


// options ¿A quien se enviara?

const mailOptions = {

    from: config.email.user,
    to: email,
    subject: "Verificación de correo",
    text: `Para verificar que eres dueño de la cuenta, utiliza este código:  ${verificationCode}\n Advertencia: Este codigo expira en 2H\n `


}



transporter.sendMail(mailOptions, (error, info) => {

if(error)console.log("error" +error)
    res.json({message: "Email sent"})



})

res.json({message: "Client registred, please verify your email"})

}catch(error){


    res.json({message: "error" +error})


}

};


registerClientsController.verifyCodeEmail = async (req,res) =>
    {
        const {verificationCode} = req.body;
        //Access to the token "verification token"
        //This contains  them email and the verification code and the expiration time.
        const token = res.cookies.tokenCode;
     
        if(!token) return res.json({message: "You must register your account firts, please."})
     
            try {
                //Verify and decode the token
                //To obtain the mail and the verification code
                //that we saved at the registration
                const decoded = jsonwebtoken.verify(token, config.JWT.secret)
                const {email, verificationCode: storeCode} = decoded;
                if(verificationCode !== storeCode) {


                    return res.json ({ message: "Invalid verification"})

                }
                const client = await clientesModel.findOne ({email})
                if(client) {


                    return res.json({message: "Client not found"})

                }

                //A ese cliente lo cambio el campo "isVerified" 

                client.isVerified = true,
                await client.save();
                res.clearCookie("verificationToken")
                res.json({message: "Email verified succesfully"})

     
            } catch (error) {res.json({message:" error " + error})}
    }
    export default registerClientsController;