// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clientes.js";
import empleadosRoutes from "./src/routes/empleados.js";
import sucursalRoutes from "./src/routes/sucursal.js";
import reviewRouter from "./src/routes/reviews.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import LoginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js";
import RegisterClients from "./src/routes/registerClients.js"


// Creo una constante que es igual a la libreria que importé
const app = express();


app.use(cookieParser());

//Que acepte datos en json
app.use(express.json());
app.use(cookieParser())

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/clientes", clientsRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/sucursales", sucursalRoutes);
app.use("/api/review", reviewRouter);
app.use("/api/registerEmployees", registerEmployeesRoutes)
app.use("/api/login", LoginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/registerClients",RegisterClients)

// Exporto la constante para poder usar express en otros archivos
export default app;
