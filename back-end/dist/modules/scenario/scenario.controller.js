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
const create_1 = require("../../core/decorators/mongoose/create");
const query_1 = require("../../core/decorators/mongoose/query");
const update_1 = require("../../core/decorators/mongoose/update");
const delete_1 = require("../../core/decorators/mongoose/delete");
const controller_1 = require("../../core/decorators/controller");
const route_1 = require("../../core/decorators/route");
const scenario_schema_1 = __importDefault(require("../../core/database/schemas/scenario.schema"));
const getByCredential_1 = require("../../core/decorators/mongoose/getByCredential");
let ScenarioController = class ScenarioController {
    getAll(req, res, next) {
        return res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).json(req.mongoGet);
    }
    getByUserCredential(req, res, next) {
        return res.status(200).json(req.mongoGetAlls);
    }
    create(req, res, next) {
        return res.status(201).json(req.mongoCreate);
    }
    query(req, res, next) {
        return res.status(200).json(req.mongoQuery);
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
    (0, getAll_1.MongoGetAll)(scenario_schema_1.default)
], ScenarioController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(scenario_schema_1.default, ['scenario_items_id'])
], ScenarioController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('get', '/credentialId/:id'),
    (0, getByCredential_1.getByCredential)(scenario_schema_1.default, ['scenario_items_id'])
], ScenarioController.prototype, "getByUserCredential", null);
__decorate([
    (0, route_1.Route)('post', '/create'),
    (0, create_1.MongoCreate)(scenario_schema_1.default)
], ScenarioController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('post', '/query'),
    (0, query_1.MongoQuery)(scenario_schema_1.default)
], ScenarioController.prototype, "query", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id'),
    (0, update_1.MongoUpdate)(scenario_schema_1.default)
], ScenarioController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(scenario_schema_1.default)
], ScenarioController.prototype, "remove", null);
ScenarioController = __decorate([
    (0, controller_1.Controller)('/scenario')
], ScenarioController);
exports.default = ScenarioController;
