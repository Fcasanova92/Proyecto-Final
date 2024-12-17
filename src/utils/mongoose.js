import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD, DB_NAME } from './env.js';

export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// agregar base de datos de dev y test
export const mongooseConnect = async () => {
  const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clustercoder.oiit0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=ClusterCoder`;

  try {
    await mongoose.connect(mongoUri);

    console.log(`Conectado exitosamente a la base de datos ${DB_NAME}`);
  } catch (error) {
    console.log(' error en la conexion a la base de datos ', error);

    process.exit();
  }
};
