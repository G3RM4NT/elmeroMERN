// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clientes.js";
import empleadosRoutes from "./src/routes/empleados.js";
import sucursalRoutes from "./src/routes/sucursal.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/clientes", clientsRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/sucursales", sucursalRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
