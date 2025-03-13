//Array de metodos (C R U D)
const Clientescontroller = {};
import clientesModel from "../models/Cientes.js";

// SELECT
Clientescontroller.getClients = async (req, res) => {
  const clients = await clientesModel.find();
  res.json(clients);
};

// INSERT
Clientescontroller.createClients = async (req, res) => {
  const { name, lastname, birthday, email, password, telephone, dui, isVerified } = req.body;

  const newClient = new clientesModel({ name, lastname, birthday, email, password, telephone, dui, isVerified});
  await newClient.save();
  res.json({ message: "client saved" });
};

// DELETE
Clientescontroller.deleteClients = async (req, res) => {
  const deletedClient = await clientesModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json({ message: "client deleted" });
};

// UPDATE
Clientescontroller.updateClients = async (req, res) => {
  // Solicito todos los valores
  const { name, lastname, birthday, email, password, telephone, dui, isVerified } = req.body;
  // Actualizo
  await clientesModel.findByIdAndUpdate(
    req.params.id,
    {
        name, lastname, birthday, email, password, telephone, dui, isVerified
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "client updated" });
};

export default Clientescontroller;