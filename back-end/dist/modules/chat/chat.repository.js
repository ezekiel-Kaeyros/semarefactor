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
exports.chatRepository = void 0;
const chat_schema_1 = __importDefault(require("../../core/database/schemas/chat.schema"));
const conversation_repository_1 = require("../conversation/conversation.repository");
class ChatRepository {
    // Méthode pour créer un nouveau chat
    create(chatData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = new chat_schema_1.default(chatData);
                return yield chat.save();
            }
            catch (error) {
                console.error('Erreur lors de la création du chat:', error);
                throw error;
            }
        });
    }
    // Méthode pour récupérer un chat par ID
    getById(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chat_schema_1.default.findById(chatId).exec();
            }
            catch (error) {
                console.error('Erreur lors de la récupération du chat par ID:', error);
                throw error;
            }
        });
    }
    // Méthode pour récupérer tous les chats (possibilité de filtrer ou paginer)
    getAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, limit = 10, skip = 0) {
            try {
                return yield chat_schema_1.default.find(filter).limit(limit).skip(skip).exec();
            }
            catch (error) {
                console.error('Erreur lors de la récupération des chats:', error);
                throw error;
            }
        });
    }
    // Méthode pour mettre à jour un chat par ID
    update(chatId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chat_schema_1.default.findByIdAndUpdate(chatId, { $set: updateData }, { new: true, runValidators: true }).exec();
            }
            catch (error) {
                console.error('Erreur lors de la mise à jour du chat:', error);
                throw error;
            }
        });
    }
    // Méthode pour supprimer un chat par ID
    delete(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chat_schema_1.default.findByIdAndDelete(chatId).exec();
            }
            catch (error) {
                console.error('Erreur lors de la suppression du chat:', error);
                throw error;
            }
        });
    }
    getLastAdminOfConversation(phoneNumber, credentialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield conversation_repository_1.conversationRepository.getByPhoneNumberAndCredentialId(phoneNumber, credentialId);
            if (!conversation || !(conversation === null || conversation === void 0 ? void 0 : conversation.chat_ids)) {
                return null;
            }
            const idLastChat = conversation.chat_ids[conversation.chat_ids.length - 1];
            const chat = yield chat_schema_1.default.findOne({ _id: idLastChat, origin: 'admin' });
            return chat;
        });
    }
}
exports.chatRepository = new ChatRepository();
