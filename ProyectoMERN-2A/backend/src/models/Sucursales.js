/*
    Campos:
        nombre
        descripcion
        precio
        stock
*/

import { Schema, model } from "mongoose";

const SucursalesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    telephone: {
      type: Number,
      require: true,
      minLength: 8,
    },
    schedule: {
      type: String,
      require: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Products", SucursalesSchema);
