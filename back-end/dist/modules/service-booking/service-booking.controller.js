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
const get_1 = require("../../core/decorators/mongoose/get");
const delete_1 = require("../../core/decorators/mongoose/delete");
const service_booking_schema_1 = __importDefault(require("../../core/database/schemas/service-booking.schema"));
const service_booking_service_1 = require("./service-booking.service");
let ServiceBookingController = class ServiceBookingController {
    getAll(req, res, next) {
        return res.status(200).send(req.mongoGetAll);
    }
    getByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyHourServiceId = req.params.id;
            const serviceBooking = yield service_booking_service_1.serviceBookingService.findByCompany(companyHourServiceId);
            res.status(serviceBooking.status).send(serviceBooking.message);
        });
    }
    get(req, res, next) {
        return res.status(200).send(req.mongoGet);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const service = yield service_booking_service_1.serviceBookingService.create(data);
            return res.status(service.status).send(service.message);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const { id } = req.params;
            const service = yield service_booking_service_1.serviceBookingService.update(id, data);
            return res.status(service.status).send(service.message);
        });
    }
    remove(req, res, next) {
        return res.status(200).send({ msg: 'Deleted' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(service_booking_schema_1.default)
], ServiceBookingController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/company/:id')
], ServiceBookingController.prototype, "getByCompany", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(service_booking_schema_1.default)
], ServiceBookingController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('post', '/create')
    // @MongoCreate(ServiceBooking)
], ServiceBookingController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id')
    // @MongoUpdate(ServiceBooking)
], ServiceBookingController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(service_booking_schema_1.default)
], ServiceBookingController.prototype, "remove", null);
ServiceBookingController = __decorate([
    (0, controller_1.Controller)('/service-booking')
], ServiceBookingController);
exports.default = ServiceBookingController;
