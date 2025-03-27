import express from "express";
import registerEmployeescontroller from "../controllers/registerEmployeescontroller.js"

const router = express.Router();

router.route("/").post(registerEmployeescontroller.register)


export default router