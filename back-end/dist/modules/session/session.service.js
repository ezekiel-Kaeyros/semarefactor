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
exports.sessionService = void 0;
const session_repository_1 = require("./session.repository");
const scenario_enum_1 = require("../../core/enums/scenario.enum");
const scenario_item_repository_1 = require("../scenario-item/scenario-item.repository");
const helper_method_1 = require("../../core/utiles/helper-method");
const message_enum_1 = require("../../core/enums/message.enum");
class SessionService {
    closeSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedSession = yield session_repository_1.sessionRepository.updateSession(sessionId, { is_active: false });
                return updatedSession;
            }
            catch (error) {
                console.error('Erreur lors de la fermeture de la session:', error);
                throw error;
            }
        });
    }
    syncronize(session, whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (whatsappRequestData.type) {
                    case scenario_enum_1.TypeWhatsappMessage.TEXT:
                    case scenario_enum_1.TypeWhatsappMessage.IMAGE:
                        console.log("old session", session);
                        const scenarioItem = yield scenario_item_repository_1.scenarioItemRepository.findChildByIdParent(session.current_scenario_item_id);
                        console.log("child scenarioItem", scenarioItem);
                        session.current_scenario_item_id = scenarioItem === null || scenarioItem === void 0 ? void 0 : scenarioItem.id;
                        break;
                    case scenario_enum_1.TypeWhatsappMessage.INTERACTIVE:
                        if (whatsappRequestData.data.interactive.type === 'button_reply') {
                            session.current_scenario_item_id = whatsappRequestData.data.interactive.button_reply.id;
                        }
                        else {
                            session.current_scenario_item_id = whatsappRequestData.data.interactive.list_reply.id;
                        }
                        break;
                    default:
                        break;
                }
                session = (yield session_repository_1.sessionRepository.updateSession(session.id, session));
                return session;
            }
            catch (error) {
                console.error('Erreur lors de la syncronize de la session:', error);
                throw error;
            }
        });
    }
    sessionIsValid(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield session_repository_1.sessionRepository.getMostRecentActiveSession(conversationId);
                if (!session) {
                    return false;
                }
                if (helper_method_1.HelperMethod.getDifferenceInMinutes(new Date(session.updatedAt)) > message_enum_1.TimeValidSession.WHATSAPP_VALIDITY_MINUTE) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log('error sessionIsValid', error);
                throw error;
            }
        });
    }
}
exports.sessionService = new SessionService();
