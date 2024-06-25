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
exports.credentialsRepository = void 0;
const credential_schema_1 = __importDefault(require("../../core/database/schemas/credential.schema"));
class CredentialsRepository {
    getByVerifyToken(verify_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield credential_schema_1.default.findOne({ verify_token });
            return credentials;
        });
    }
    getCredentailByPhoneNumberId(phone_number_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = yield credential_schema_1.default.findOne({ phone_number_id });
                if (!credentials) {
                    throw new Error('Credential not found');
                }
                return credentials;
            }
            catch (error) {
                console.error('Error retrieving the credential by phone_number_id:', error);
                throw error;
            }
        });
    }
}
exports.credentialsRepository = new CredentialsRepository();
