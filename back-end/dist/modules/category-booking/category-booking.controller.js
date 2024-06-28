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
const category_booking_schema_1 = __importDefault(require("../../core/database/schemas/category-booking.schema"));
const get_1 = require("../../core/decorators/mongoose/get");
const delete_1 = require("../../core/decorators/mongoose/delete");
const category_booking_service_1 = require("./category-booking.service");
let CategoryBookingController = class CategoryBookingController {
    getAll(req, res, next) {
        return res.status(200).send(req.mongoGetAll);
    }
    get(req, res, next) {
        return res.status(200).send(req.mongoGet);
    }
    getByCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const category = yield category_booking_service_1.categoryBookingService.findByCompany(id);
            res.status(category.status).json(category.message);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const category = yield category_booking_service_1.categoryBookingService.create(data);
            res.status(category.status).json(category.message);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const id = req.params.id;
            const category = yield category_booking_service_1.categoryBookingService.update(id, data);
            res.status(category.status).json(category.message);
        });
    }
    remove(req, res, next) {
        return res.status(200).send({ msg: 'Deleted' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/'),
    (0, getAll_1.MongoGetAll)(category_booking_schema_1.default)
], CategoryBookingController.prototype, "getAll", null);
__decorate([
    (0, route_1.Route)('get', '/:id'),
    (0, get_1.MongoGet)(category_booking_schema_1.default)
], CategoryBookingController.prototype, "get", null);
__decorate([
    (0, route_1.Route)('get', '/company/:id')
    // @MongoGet(CategoryBooking)
], CategoryBookingController.prototype, "getByCompany", null);
__decorate([
    (0, route_1.Route)('post', '/create')
], CategoryBookingController.prototype, "create", null);
__decorate([
    (0, route_1.Route)('patch', '/update/:id')
], CategoryBookingController.prototype, "update", null);
__decorate([
    (0, route_1.Route)('delete', '/delete/:id'),
    (0, delete_1.MongoDelete)(category_booking_schema_1.default)
], CategoryBookingController.prototype, "remove", null);
CategoryBookingController = __decorate([
    (0, controller_1.Controller)('/category-booking')
], CategoryBookingController);
exports.default = CategoryBookingController;
