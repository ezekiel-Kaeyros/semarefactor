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
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../../core/decorators/controller");
const route_1 = require("../../core/decorators/route");
const webhook_service_1 = require("./webhook.service");
const whatsapp_helper_method_1 = require("../../core/utiles/whatsapp-helper-method");
let WebhookController = class WebhookController {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = req.query;
                console.log(" queryParams ======", queryParams);
                const mode = queryParams["hub.mode"];
                const verify_token = queryParams["hub.verify_token"];
                const challenge = queryParams["hub.challenge"];
                const result = yield webhook_service_1.webhookService.verifyToken(mode, verify_token, challenge);
                if (result.message) {
                    return res.status(result.status).send(result.message);
                }
                else {
                    return res.status(result.status).send();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    chatbot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // console.log(`\u{1F7EA} Received webhook:`);
                // console.dir(body, { depth: null });
                // Validate the request body format
                if (!whatsapp_helper_method_1.WhatsappHelperMethode.contentMessageIsValid(body)) {
                    return res.status(200).send({});
                }
                // Format the request data
                const whatsappRequestData = whatsapp_helper_method_1.WhatsappHelperMethode.formatWhatsappMessage(body);
                // Init service
                yield webhook_service_1.webhookService.init(whatsappRequestData.phone_number_id, whatsappRequestData.phone_number);
                // Check if bot is not active
                if (yield webhook_service_1.webhookService.botIsNotActive(whatsappRequestData)) {
                    return res.status(200).send({});
                }
                // Handle kill session
                if (yield webhook_service_1.webhookService.killSessionWithKeyword(whatsappRequestData)) {
                    return res.status(200).send({});
                }
                // Handle the chatbot process
                yield webhook_service_1.webhookService.handleChatbotProcess(whatsappRequestData);
                // destroy service
                webhook_service_1.webhookService.destroy();
                return res.status(200).send({});
            }
            catch (error) {
                throw error;
            }
        });
    }
};
__decorate([
    (0, route_1.Route)('get', '')
], WebhookController.prototype, "verifyToken", null);
__decorate([
    (0, route_1.Route)('post', '')
], WebhookController.prototype, "chatbot", null);
WebhookController = __decorate([
    (0, controller_1.Controller)('/webhook')
], WebhookController);
exports.default = WebhookController;
