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
const get_1 = require("../../core/decorators/mongoose/get");
const getAll_1 = require("../../core/decorators/mongoose/getAll");
const route_1 = require("../../core/decorators/route");
const company_hour_service_schema_1 = __importDefault(require("../../core/database/schemas/company-hour-service.schema"));
const delete_1 = require("../../core/decorators/mongoose/delete");
const company_hour_service_service_1 = require("./company-hour-service.service");
let CompanyHourServiceController = class CompanyHourServiceController {
    getAll(req, res, next) {
        return res.status(200).send(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).send(req.mongoGet);
    }
    getByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyHourServiceId = req.params.id;
            const hourservice = yield company_hour_service_service_1.companyHourServiceService.findByCompany(companyHourServiceId);
            res.status(hourservice.status).send(hourservice.message);
            // return res.status(200).send(req.mongoGet)
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { day, openingTime, closeTime, company_id } = req.body;
            const hourservice = yield company_hour_service_service_1.companyHourServiceService.create(day, openingTime, closeTime, company_id);
            res.status(hourservice.status).send(hourservice.message);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { day, openingTime, closeTime, company_id } = req.body;
            const companyHourServiceId = req.params.id;
            const hourservice = yield company_hour_service_service_1.companyHourServiceService.update(companyHourServiceId, day, openingTime, closeTime, company_id);
            res.status(hourservice.status).send(hourservice.message);
        });
    }
    remove(req, res, next) {
        return res.status(200).send({ msg: 'Deleted' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(company_hour_service_schema_1.default)
], CompanyHourServiceController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(company_hour_service_schema_1.default)
], CompanyHourServiceController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('get', '/company/:id')
    // @MongoGet(CompanyHourService)
], CompanyHourServiceController.prototype, "getByCompany", null);
__decorate([
    (0, route_1.Route)('post', '/create')
], CompanyHourServiceController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id')
], CompanyHourServiceController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(company_hour_service_schema_1.default)
], CompanyHourServiceController.prototype, "remove", null);
CompanyHourServiceController = __decorate([
    (0, controller_1.Controller)('/company-hour-service')
], CompanyHourServiceController);
exports.default = CompanyHourServiceController;
