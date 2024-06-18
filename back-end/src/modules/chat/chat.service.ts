import { FacebookWebService } from "../../core/enums/facebook-webservice";
import { ChatOrigin, StandardMessageEnum } from "../../core/enums/message.enum";
import { ChatModel } from "../../core/modeles/chat.model";
import { SendWAMessageModel } from "../../core/modeles/whatsapp.model";
import HttpService from "../../core/utiles/http.service";
import { WhatsappHelperMethode } from "../../core/utiles/whatsapp-helper-method";
import { sessionService } from "../session/session.service";
import { chatRepository } from "./chat.repository";

class ChatService {

    public async createChatInSession(chatData: ChatModel, phoneNumber: string) {
        try {
            const isSessionValid = await sessionService.sessionIsValid(chatData.conversation_id.toString());
    
            if (!isSessionValid) {
                const body = WhatsappHelperMethode.bodyBotMessage({type: "text", message: StandardMessageEnum.INACTIVE_SESSION, recipientPhone: phoneNumber });
                await chatRepository.create({
                    conversation_id: chatData.conversation_id,
                    origin: ChatOrigin.BOT,
                    text: StandardMessageEnum.INACTIVE_SESSION,
                    is_read: true
                });
                return body ;
            }

            const body = WhatsappHelperMethode.bodyBotMessage({type: "text", message: chatData.text!, recipientPhone: phoneNumber });
            await chatRepository.create(chatData);
            return body ;
        } catch (error) {
            console.error('Error creating chat in session:', error);
            throw new Error('Unable to create chat in session');
        }
    }

    async sendWhatsappMessage(body: SendWAMessageModel, phone_number_id: string, token: string): Promise<void> {
        try {
            await HttpService.post<any>(
                FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', phone_number_id)
                                               .replace(':token', token),
                body
            )
        } catch (error) {
            console.log('error send message admin', error); 
            throw error;
        }
        
    }
    
}

export const chatService = new ChatService()