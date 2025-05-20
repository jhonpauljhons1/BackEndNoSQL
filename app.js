import express from 'express';
import connectDB from './src/config/db.js';

import { port, uri } from './src/config/constants.js';
import healtCheckRoutes from './src/routes/healthCheckRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { celebrateErrorHandler, generateErrorHandler } from './src/middleware/errorMiddleware.js';


connectDB();

const app = express();
// nos permitira hacer uso de json en peticiones
app.use(express.json());

// se agrega manejo de errores de celebrate


app.use(uri,healtCheckRoutes);
app.use(`${uri}/users`,userRoutes);
app.use(`${uri}/auth`, authRoutes);

app.use(celebrateErrorHandler);  // Primero errores de celebrate
app.use(generateErrorHandler);   // Luego errores generales


const PORT = port || 5000;
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}${uri}`));