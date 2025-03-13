import express from "express";

import Clientescontroller from "../controllers/clientesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(Clientescontroller.getClients)
  .post(Clientescontroller.createClients);

router
  .route("/:id")
  .put(Clientescontroller.updateClients)
  .delete(Clientescontroller.deleteClients);

export default router;
