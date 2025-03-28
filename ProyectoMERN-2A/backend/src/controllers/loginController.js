import Cientes from "../models/Cientes.js";
import Empleados from "../models/Empleados.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const loginController = {};

loginController.login = async (req,res) => {



const { email,password} = req.body;


let userFound; 
let userType;

try {

//validamos los 3 posibles niveles
//1 admin, 2 empleado, 3 Cliente



//1. admin

if (email == config.ADMIN.emailAdmin && password == config.ADMIN.passwordAdmin){
userType = "admin"
userFound = {_id: "admin"};
}else{

userFound = await Empleados.findOne ({email})
userType = "employee"
if (!userFound) {

userFound = await Cientes.findOne({email})
userType = "customer"
}
}
if (!userFound) {
return res.json ({message: "User not found ;("})

}

if (userType !== "admin") {

const isMatch = await bcrypt.compare (password, userFound.password)
if (!isMatch){

    return res.json ({message: "invalid password"})


}

}

jsonwebtoken.sign(

{id: userFound._id, userType},

config.JWT.secret,

{expiresIn: config.JWT.expiresIn},

(error, token) => {

if (error) console.log ("error"+error)
    res.cookie("authCookie", token)
res.json({message: "login succesful"})


}


)





} catch (error){

    console.log ("error" + error);
}
};

export default loginController;
