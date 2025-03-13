//Array de metodos (C R U D)
const SucursalesController = {};
import SucursalesModel from "../models/Empleados.js";

// SELECT
SucursalesController.getsucursales = async (req, res) => {
  const empleados = await SucursalesModel.find();
  res.json(empleados);
};

// INSERT
SucursalesController.createsucursales = async (req, res) => {
  const {name,
    address,
    telephone,
    schedule } = req.body;

  const newClient = new SucursalesModel({ name,
    address,
    telephone,
    schedule});
  await newClient.save();
  res.json({ message: "sucursal saved" });
};

// DELETE
SucursalesController.deletesucursales = async (req, res) => {
  const deletedClient = await SucursalesModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "sucursal no find" });
  }
  res.json({ message: "sucursal deleted" });
};

// UPDATE
SucursalesController.updatesucursales = async (req, res) => {
  // Solicito todos los valores
  const { name,
    address,
    telephone,
    schedule } = req.body;
  // Actualizo
  await SucursalesModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
    address,
    telephone,
    schedule
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "sucursal updated" });
};

export default SucursalesController;