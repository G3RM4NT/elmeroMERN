import express from "express";
import EmpleadosController from "../controllers/empleadoscontroller.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(EmpleadosController.getEmpleados)
  .post(EmpleadosController.createEmpleados);

router
  .route("/:id")
  .put(EmpleadosController.updateEmpleados)
  .delete(EmpleadosController.deleteEmpleados);

export default router;