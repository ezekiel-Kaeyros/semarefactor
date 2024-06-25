"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = require("../../core/decorators/mongoose/getAll");
const get_1 = require("../../core/decorators/mongoose/get");
const update_1 = require("../../core/decorators/mongoose/update");
const delete_1 = require("../../core/decorators/mongoose/delete");
const controller_1 = require("../../core/decorators/controller");
const route_1 = require("../../core/decorators/route");
const userSema_schema_1 = __importDefault(require("../../core/database/schemas/userSema.schema"));
const register_1 = require("../../core/decorators/mongoose/register");
const auth_1 = require("../../core/decorators/mongoose/auth");
let UserSemaController = class UserSemaController {
    getAll(req, res, next) {
        return res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).json(req.mongoGet);
    }
    create(req, res, next) {
        return res.status(201).json(req.mongoCreate);
    }
    query(req, res, next) {
        return res.status(200).json(req.mongoAuthRes);
    }
    update(req, res, next) {
        return res.status(201).json(req.mongoUpdate);
    }
    remove(req, res, next) {
        return res.status(201).json({ message: 'Deleted' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(userSema_schema_1.default)
], UserSemaController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(userSema_schema_1.default)
], UserSemaController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('post', '/create'),
    (0, register_1.MongoUserRegister)(userSema_schema_1.default)
], UserSemaController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('post', '/auth'),
    (0, auth_1.MongoUserAuth)(userSema_schema_1.default)
], UserSemaController.prototype, "query", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id'),
    (0, update_1.MongoUpdate)(userSema_schema_1.default)
], UserSemaController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(userSema_schema_1.default)
], UserSemaController.prototype, "remove", null);
UserSemaController = __decorate([
    (0, controller_1.Controller)('/usersema')
], UserSemaController);
exports.default = UserSemaController;
