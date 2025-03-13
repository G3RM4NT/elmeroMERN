import express from "express";
import SucursalesController from "../controllers/sucursalesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(SucursalesController.getSucursal)
  .post(SucursalesController.createSucursal);

router
  .route("/:id")
  .put(SucursalesController.updateSucursal)
  .delete(SucursalesController.deleteSucursal);

export default router;