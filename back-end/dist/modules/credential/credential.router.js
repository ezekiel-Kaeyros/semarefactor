"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credential_controller_1 = __importDefault(require("./credential.controller"));
const creadentialRoute = (0, express_1.Router)();
const credentialController = new credential_controller_1.default();
creadentialRoute.get('/', (req, res, next) => credentialController.getAll(req, res, next));
exports.default = creadentialRoute;
