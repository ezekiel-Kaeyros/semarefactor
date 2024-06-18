import express, { Request, Response } from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from "path";
import './core/config/logging';
import 'reflect-metadata';
import connectDB from './core/database/connection';
// import routes from './routes';
import { defineRoutes } from './core/routes/route';
import errorHandler from './core/middlewares/errorHandler';
import { declareHandler } from './core/middlewares/declareHandler';
import CredentialController from './modules/credential/credential.controller';
import WebhookController from './modules/webhook/webhook.controller';
import ScenarioController from './modules/scenario/scenario.controller';
import ConversationController from './modules/conversation/conversation.controller';
import UserSemaController from './modules/usersema/usersema.controller';
import ScenarioItemController from './modules/scenario-item/scenario-item.controller';
import TemplateScenariosController from './modules/template-scenario/template-scenario.contoller';
import ChatController from './modules/chat/chat.controller';
import UserController from './modules/user/user.controller';

dotenv.config();
console.log(process.env.DATABASE_URL_DEV);

connectDB();

export const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Vérifier et créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get('/', (req: Request, res: Response) => {console.log('App start xx');return res.send('App startx')});
app.use('/uploads', express.static(uploadDir));
app.use(declareHandler)
// app.use('/', routes);
defineRoutes([
  WebhookController,
  CredentialController,
  ScenarioController,
  ScenarioItemController,
  ConversationController,
  UserSemaController,
  TemplateScenariosController,
  ChatController,
  UserController
], app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);