import { Types } from "mongoose";
import { SessionDoc, SessionModel } from "../../core/modeles/session.model";
import { sessionRepository } from "./session.repository";
import { TypeWhatsappMessage } from "../../core/enums/scenario.enum";
import { IWhatsappRequestData } from "../../core/modeles/whatsapp.model";
import { scenarioItemRepository } from "../scenario-item/scenario-item.repository";
import { ScenarioItemsDoc } from "../../core/modeles/scenario-item.model";
import { HelperMethod } from "../../core/utiles/helper-method";
import { TimeValidSession } from "../../core/enums/message.enum";

class SessionService {
    async closeSession(sessionId: Types.ObjectId) {
        try {
            const updatedSession = await sessionRepository.updateSession(sessionId, { is_active: false });
            return updatedSession;
        } catch (error) {
            console.error('Erreur lors de la fermeture de la session:', error);
            throw error;
        } 
    }

    async syncronize(session: SessionDoc, whatsappRequestData: IWhatsappRequestData) : Promise<SessionDoc> {
        try {
            switch (whatsappRequestData.type) {
                case TypeWhatsappMessage.TEXT:
                case TypeWhatsappMessage.IMAGE:
                    const scenarioItem = await scenarioItemRepository.findChildByUuid(session.current_scenario_item_id);
                    session.current_scenario_item_id = scenarioItem?.id;
                    break;
                case TypeWhatsappMessage.INTERACTIVE:
                    if (whatsappRequestData.data.interactive.type === 'button_reply') {
                        session.current_scenario_item_id = whatsappRequestData.data.interactive.button_reply.id;
                    } else {
                        session.current_scenario_item_id = whatsappRequestData.data.interactive.list_reply.id;
                    }
                    break;
                default:
                    break;
            }
            
            session = await sessionRepository.updateSession(session.id, session) as SessionDoc
            return session;
        } catch (error) {
            console.error('Erreur lors de la syncronize de la session:', error);
            throw error;
        }
    }

    public async sessionIsValid(conversationId: string): Promise<boolean> {
        const session = await sessionRepository.getMostRecentActiveSession(conversationId);
        if (!session) {
            return false;
        }

        if (HelperMethod.getDifferenceInMinutes(new Date(session.updatedAt)) > TimeValidSession.WHATSAPP_VALIDITY_MINUTE) {
            return false;
        }

        return true;
    }
}

export const sessionService = new SessionService()