import express from 'express';
import connectDB from './src/config/db.js';
import { port,uri } from './src/config/constants.js';

import healtCheckRoutes from './src/routes/healtCheckRoutes.js';


connectDB();

const app = express();
//nos permite hacer uso de json en peticiones
app.use(express.json());

app.use (uri,healtCheckRoutes);

//to do hacer ruta a mi endpoint de prueba

const PORT = port || 5001;
app.listen(PORT,console.log(`Server running on http://localhost:${PORT}${uri}`));