import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
export const JWT_SECRET_KEY = process.env.SECRET_KEY;
export const JWT_EXPIRE_TIME = 24 * 60 * 60; // 24 hours
