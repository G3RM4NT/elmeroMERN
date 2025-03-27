/*
    Campos:
        name
  lastName
  birthday (esto es de tipo Date o lo puden poner como String)
  email
  address
  hireDate (esto es de tipo Date o lo puden poner como String)
  password
  telephone
  dui
  isssNumber
  isVerified (esto es booleano)
*/

import { Schema, model } from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const EmpleadosSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
    },
    birthday: {
      type: String,
      require: true,
      min: 0,
    },
    email: {
      type: String,
      require: true,
      match: [emailRegex, 'Por favor ingresa un correo válido']
    },

    address: {
        type: String,
        require: true,
        
      },
    password: {
        type: String,
        require: true,
      },

      telephone: {
        type: Number,
        require: true,
        minLength: 8
        
      },

      dui: {
        type: String,
        require: true,
        minLength: 9
        
      },

      isssNumber: {
        type: String,
        require: true,
        minLength: 9
        
      },

      isVerified: {
        type: Boolean,
        require: true,
        
        
      },


  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Empleados", EmpleadosSchema);