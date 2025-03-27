//Importar mode
import Empleados from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config } from "../config.js";

const registerEmployeescontroller = {};
//creamos un array de funciones
registerEmployeescontroller.register = async (req,res) => {
const { name, lastName, birthday, email, address,password,telephone, dui, isssNumber,isVerified} = req.body;
try{
//verificar si empleado existe 
const  existEmployee = await Empleados.findOne({email})
if (existEmployee) {

 res.json({message: "Employe already exist"})

}
const passwordHash = await bcryptjs.hash(password,10)

//
const newEmployee = new Empleados ({


    name, lastName, birthday, email, address,password: passwordHash,telephone, dui, isssNumber,isVerified


})

await newEmployee.save();

jsonwebtoken.sign (
{id: newEmployee._id},
config.JWT.secret,
{expiresIn: config.JWT.expiresIn},

(error, token) =>{


if (error) console.log("error"+error)

    res.cookie("authToken", token)
    res.json({message: "Empleado guardado"})


}
)

}
catch (error){
console.log(error)
res.json({message: "error saving employee"})
}
}
export default registerEmployeescontroller;
