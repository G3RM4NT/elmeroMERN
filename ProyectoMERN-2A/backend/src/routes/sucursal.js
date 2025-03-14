import express from "express";
import SucursalesController from "../controllers/sucursalesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(SucursalesController.getsucursales)
  .post(SucursalesController.createsucursales);

router
  .route("/:id")
  .put(SucursalesController.updatesucursales)
  .delete(SucursalesController.deletesucursales);

export default router;