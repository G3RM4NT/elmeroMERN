//Array de metodos (C R U D)
const Empleadoscontroller = {};
import EmpleadosModel from "../models/Empleados.js";

// SELECT
Empleadoscontroller.getEmpleados = async (req, res) => {
  const empleados = await EmpleadosModel.find();
  res.json(empleados);
};

// INSERT
Empleadoscontroller.createEmpleados = async (req, res) => {
  const { name, lastname, birthday, email, address, password, telephone, dui, isssNumber, isVerified } = req.body;

  const newClient = new EmpleadosModel({ name, lastname, birthday, email, address, password, telephone, dui, isssNumber, isVerified});
  await newClient.save();
  res.json({ message: "employee saved" });
};

// DELETE
Empleadoscontroller.deleteEmpleados = async (req, res) => {
  const deletedClient = await EmpleadosModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "employee no find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
Empleadoscontroller.updateEmpleados = async (req, res) => {
  // Solicito todos los valores
  const { name, lastname, birthday, email, address, password, telephone, dui, isssNumber, isVerified } = req.body;
  // Actualizo
  await EmpleadosModel.findByIdAndUpdate(
    req.params.id,
    {
        name, lastname, birthday, email, address, password, telephone, dui, isssNumber, isVerified
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee updated" });
};

export default Empleadoscontroller;