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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../../core/decorators/controller");
const route_1 = require("../../core/decorators/route");
const getAll_1 = require("../../core/decorators/mongoose/getAll");
const company_creneau_schema_1 = __importDefault(require("../../core/database/schemas/company-creneau.schema"));
const update_1 = require("../../core/decorators/mongoose/update");
const delete_1 = require("../../core/decorators/mongoose/delete");
const company_creneau_service_1 = require("./company-creneau.service");
let CompanyCreneauController = class CompanyCreneauController {
    getAll(req, res, next) {
        res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        res.status(200).json(req.mongoGet);
    }
    getAvailable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { companyId } = req.params;
            const { date, typeFormat } = req.query;
            const availableList = yield company_creneau_service_1.companyCreneauService.getAvailalable(date, companyId, typeFormat);
            res.status(availableList.status).json(availableList.message);
        });
    }
    getAvailableDays(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { companyId } = req.params;
            const { nb_days } = req.query;
            const availableList = yield company_creneau_service_1.companyCreneauService.getPeriodeDays(companyId, nb_days);
            res.status(availableList.status).json(availableList.message);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const companyCreneau = yield company_creneau_service_1.companyCreneauService.create(data);
            res.status(companyCreneau.status).json(companyCreneau.message);
        });
    }
    update(req, res, next) {
        res.status(200).json(req.mongoUpdate);
    }
    remove(req, res, next) {
        res.status(200).json({ msg: "Deleted" });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(company_creneau_schema_1.default)
], CompanyCreneauController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, getAll_1.MongoGetAll)(company_creneau_schema_1.default)
], CompanyCreneauController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('get', '/available/:companyId')
], CompanyCreneauController.prototype, "getAvailable", null);
__decorate([
    (0, route_1.Route)('get', '/availableDays/:companyId')
], CompanyCreneauController.prototype, "getAvailableDays", null);
__decorate([
    (0, route_1.Route)('post', '/create')
    // @MongoCreate(CompanyCreneau)
], CompanyCreneauController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id'),
    (0, update_1.MongoUpdate)(company_creneau_schema_1.default)
], CompanyCreneauController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('patch', '/delete/:id'),
    (0, delete_1.MongoDelete)(company_creneau_schema_1.default)
], CompanyCreneauController.prototype, "remove", null);
CompanyCreneauController = __decorate([
    (0, controller_1.Controller)('/company-creneau')
], CompanyCreneauController);
exports.default = CompanyCreneauController;
