import { config } from 'dotenv';
import argsUtil from './args.js';
import EnvEnum from '../constant/envEnum.js';

// de los argumentos tomo el enviroment
const { env } = argsUtil;

// con el enviroment armo el path
const path = './.env.' + env;

// este es el entorno del cual tomara el valor de las variables de entorno
config({ path });

const BASE_URL = process.env.BASE_URL;

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const SECRET_KEY = process.env.SECRET_KEY;

export const PORT = process.env.PORT;

export const URL = env === EnvEnum.PROD ? `${BASE_URL}` : `${BASE_URL}:${PORT}`;

export const EMAIL = process.env.EMAIL;

export const PASSWORD = process.env.PASSWORD;
