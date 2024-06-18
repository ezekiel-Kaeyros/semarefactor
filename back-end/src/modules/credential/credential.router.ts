import { Router } from "express";
import CredentialController from "./credential.controller";

const creadentialRoute = Router();
const credentialController = new CredentialController()

creadentialRoute.get('/', (req, res, next) => credentialController.getAll(req, res,next));

export default creadentialRoute