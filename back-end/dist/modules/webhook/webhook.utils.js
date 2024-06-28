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
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookUtils = void 0;
const chat_repository_1 = require("../chat/chat.repository");
const conversation_repository_1 = require("../conversation/conversation.repository");
class WebhookUtils {
    initConversation(phoneNumber, credentialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield conversation_repository_1.conversationRepository.getByPhoneNumberAndCredentialId(phoneNumber, credentialId);
                if (!conversation) {
                    const newConversation = yield conversation_repository_1.conversationRepository.create({ credential_id: credentialId, phone_number: phoneNumber });
                    return newConversation;
                }
                return conversation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addChatInConversation(conversation_1, origin_1) {
        return __awaiter(this, arguments, void 0, function* (conversation, origin, text = '', url = '') {
            var _a;
            try {
                const chat = yield chat_repository_1.chatRepository.create({ conversation_id: conversation.id, origin: origin, text, url });
                return yield conversation_repository_1.conversationRepository.update(conversation.id, { chat_ids: [...((_a = conversation.chat_ids) !== null && _a !== void 0 ? _a : []), chat.id] });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.webhookUtils = new WebhookUtils();
