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
const scenario_item_schema_1 = __importDefault(require("../../core/database/schemas/scenario-item.schema"));
const multer_config_1 = __importDefault(require("../../core/utiles/multer-config"));
const uploadFile_1 = require("../../core/decorators/mongoose/uploadFile");
const scenario_schema_1 = __importDefault(require("../../core/database/schemas/scenario.schema"));
let ScenarioItemController = class ScenarioItemController {
    getAll(req, res, next) {
        return res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).json(req.mongoGet);
    }
    create(req, res, next) {
        var _a;
        if (Array.isArray(req.mongoCreate)) {
            req.mongoCreate.forEach((element) => {
                scenario_schema_1.default.findByIdAndUpdate(req.body.scenario_id, { $push: { 'scenario_items_id': element._id } }).exec();
            });
        }
        else {
            scenario_schema_1.default.findByIdAndUpdate(req.body.scenario_id, { $push: { 'scenario_items_id': (_a = req.mongoCreate) === null || _a === void 0 ? void 0 : _a._id } }).exec();
        }
        return res.status(201).json(req.mongoCreate);
    }
    query(req, res, next) {
        return res.status(200).json(req.mongoQuery);
    }
    uploadFile(req, res, next) {
        return res.status(201).json(req.mongoUPloadFileRes);
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
    (0, getAll_1.MongoGetAll)(scenario_item_schema_1.default, ['scenario_id'])
], ScenarioItemController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(scenario_item_schema_1.default, ['scenario_id'])
], ScenarioItemController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('post', '/create'),
    (0, create_1.MongoCreate)(scenario_item_schema_1.default)
], ScenarioItemController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('post', '/query'),
    (0, query_1.MongoQuery)(scenario_item_schema_1.default)
], ScenarioItemController.prototype, "query", null);
__decorate([
    (0, route_1.Route)('post', '/upload-file', multer_config_1.default.single('file')),
    (0, uploadFile_1.MongoUploadFile)(scenario_item_schema_1.default)
], ScenarioItemController.prototype, "uploadFile", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id'),
    (0, update_1.MongoUpdate)(scenario_item_schema_1.default)
], ScenarioItemController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(scenario_item_schema_1.default)
], ScenarioItemController.prototype, "remove", null);
ScenarioItemController = __decorate([
    (0, controller_1.Controller)('/scenario-item')
], ScenarioItemController);
exports.default = ScenarioItemController;
