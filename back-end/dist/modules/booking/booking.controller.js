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
const route_1 = require("../../core/decorators/route");
const get_1 = require("../../core/decorators/mongoose/get");
const getAll_1 = require("../../core/decorators/mongoose/getAll");
const booking_schema_1 = __importDefault(require("../../core/database/schemas/booking.schema"));
const controller_1 = require("../../core/decorators/controller");
const delete_1 = require("../../core/decorators/mongoose/delete");
const booking_service_1 = require("./booking.service");
let BookingController = class BookingController {
    getAll(req, res, next) {
        return res.status(200).json(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).json(req.mongoGet);
    }
    getBookingByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { date } = req.params;
            const booking = yield booking_service_1.bookingService.bookingCompany(id, date);
            res.status(booking.status).send(booking.message);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const booking = yield booking_service_1.bookingService.create(data);
            res.status(booking.status).send(booking.message);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const bookingId = req.params.id;
            const booking = yield booking_service_1.bookingService.update(bookingId, data);
            return res.status(booking.status).send(booking.message);
        });
    }
    remove(req, res, next) {
        return res.status(200).json({ message: 'Deleted' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(booking_schema_1.default)
], BookingController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/id/:id'),
    (0, get_1.MongoGet)(booking_schema_1.default)
], BookingController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('get', '/company/:id')
    // @MongoGet(Booking)
], BookingController.prototype, "getBookingByCompany", null);
__decorate([
    (0, route_1.Route)('post', '/create')
], BookingController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id')
], BookingController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(booking_schema_1.default)
], BookingController.prototype, "remove", null);
BookingController = __decorate([
    (0, controller_1.Controller)('/booking')
], BookingController);
exports.default = BookingController;
