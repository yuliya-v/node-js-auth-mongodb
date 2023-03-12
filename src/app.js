import express from 'express';
import cors from 'cors';
import { errorHandler } from './errors/errorHandler.js';
import { authRoutes } from './routes/auth.routes.js';
import { testRoutes } from './routes/test.routes.js';

export const app = express();

app.use(express.json());
app.use(cors());
authRoutes(app);
testRoutes(app);
app.use(errorHandler);
