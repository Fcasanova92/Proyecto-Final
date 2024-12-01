import dotenv from 'dotenv';

dotenv.config();

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const PORT = process.env.PORT;

export const SECRET_KEY = process.env.SECRET_KEY;
