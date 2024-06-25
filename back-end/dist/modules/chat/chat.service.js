"use strict";
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
exports.chatService = void 0;
const facebook_webservice_1 = require("../../core/enums/facebook-webservice");
const message_enum_1 = require("../../core/enums/message.enum");
const http_service_1 = __importDefault(require("../../core/utiles/http.service"));
const whatsapp_helper_method_1 = require("../../core/utiles/whatsapp-helper-method");
const session_service_1 = require("../session/session.service");
const chat_repository_1 = require("./chat.repository");
class ChatService {
    createChatInSession(chatData, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isSessionValid = yield session_service_1.sessionService.sessionIsValid(chatData.conversation_id.toString());
                yield chat_repository_1.chatRepository.create(chatData);
                if (!isSessionValid) {
                    const body = whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({ type: "text", message: message_enum_1.StandardMessageEnum.INACTIVE_SESSION, recipientPhone: phoneNumber });
                    yield chat_repository_1.chatRepository.create({
                        conversation_id: chatData.conversation_id,
                        origin: message_enum_1.ChatOrigin.BOT,
                        text: message_enum_1.StandardMessageEnum.INACTIVE_SESSION,
                        is_read: true
                    });
                    return body;
                }
                const body = whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({ type: "text", message: chatData.text, recipientPhone: phoneNumber });
                return body;
            }
            catch (error) {
                console.error('Error creating chat in session:', error);
                throw new Error('Unable to create chat in session');
            }
        });
    }
    sendWhatsappMessage(body, phone_number_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield http_service_1.default.post(facebook_webservice_1.FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', phone_number_id)
                    .replace(':token', token), body);
            }
            catch (error) {
                console.log('error send message admin', error);
                throw error;
            }
        });
    }
}
exports.chatService = new ChatService();
