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
exports.conversationRepository = void 0;
const conversation_schema_1 = __importDefault(require("../../core/database/schemas/conversation.schema"));
class ConversationRepository {
    // Méthode pour créer une nouvelle conversation
    create(conversationData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = new conversation_schema_1.default(conversationData);
                return yield conversation.save();
            }
            catch (error) {
                console.error('Erreur lors de la création de la conversation:', error);
                throw error;
            }
        });
    }
    // Méthode pour récupérer une conversation par ID
    getById(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_schema_1.default.findById(conversationId).exec();
            }
            catch (error) {
                console.error('Erreur lors de la récupération de la conversation par ID:', error);
                throw error;
            }
        });
    }
    // Méthode pour récupérer toutes les conversations (possibilité de filtrer ou paginer)
    getAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, limit = 10, skip = 0) {
            try {
                return yield conversation_schema_1.default.find(filter).limit(limit).skip(skip).exec();
            }
            catch (error) {
                console.error('Erreur lors de la récupération des conversations:', error);
                throw error;
            }
        });
    }
    // Méthode pour mettre à jour une conversation par ID
    update(conversationId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_schema_1.default.findByIdAndUpdate(conversationId, { $set: updateData }, { new: true, runValidators: true }).exec();
            }
            catch (error) {
                console.error('Erreur lors de la mise à jour de la conversation:', error);
                throw error;
            }
        });
    }
    // Méthode pour supprimer une conversation par ID
    delete(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_schema_1.default.findByIdAndDelete(conversationId).exec();
            }
            catch (error) {
                console.error('Erreur lors de la suppression de la conversation:', error);
                throw error;
            }
        });
    }
    // Méthode pour récupérer une conversation par numéro de téléphone et credential_id
    getByPhoneNumberAndCredentialId(phoneNumber, credentialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversation_schema_1.default.findOne({ phone_number: phoneNumber, credential_id: credentialId }).exec();
            }
            catch (error) {
                console.error('Erreur lors de la récupération de la conversation par numéro de téléphone et credential_id:', error);
                throw error;
            }
        });
    }
}
exports.conversationRepository = new ConversationRepository();
