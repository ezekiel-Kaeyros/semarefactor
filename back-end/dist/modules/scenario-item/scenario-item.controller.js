"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            var _d;
            if (Array.isArray(req.mongoCreate)) {
                try {
                    for (var _e = true, _f = __asyncValues(req.mongoCreate), _g; _g = yield _f.next(), _a = _g.done, !_a; _e = true) {
                        _c = _g.value;
                        _e = false;
                        const elt = _c;
                        scenario_schema_1.default.findByIdAndUpdate(req.body[0].scenario_id, { $push: { 'scenario_items_id': elt._id } }).exec();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                scenario_schema_1.default.findByIdAndUpdate(req.body.scenario_id, { $push: { 'scenario_items_id': (_d = req.mongoCreate) === null || _d === void 0 ? void 0 : _d._id } }).exec();
            }
            return res.status(201).json(req.mongoCreate);
        });
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
