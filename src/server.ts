import dotenv from 'dotenv';

import app from './main.js';
import { connectDB } from './config/connect-db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servicio corriendo http://${HOST}:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error al conectarse la base de datos:', error);
    process.exit(1);
  });
