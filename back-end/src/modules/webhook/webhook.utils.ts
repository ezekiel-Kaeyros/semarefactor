import { Types } from "mongoose";
import { ChatOrigin } from "../../core/enums/message.enum";
import { ConversationDoc } from "../../core/modeles/conversation.model";
import { chatRepository } from "../chat/chat.repository";
import { conversationRepository } from "../conversation/conversation.repository";
import { SessionDoc } from "../../core/modeles/session.model";
import { sessionRepository } from "../session/session.repository";

class WebhookUtils {
    public async initConversation(phoneNumber: string, credentialId: string): Promise<ConversationDoc> {
        try {
            const conversation = await conversationRepository.getByPhoneNumberAndCredentialId(phoneNumber, credentialId);
            if (!conversation) {
                const newConversation = await conversationRepository.create({credential_id: credentialId, phone_number: phoneNumber});
                return newConversation;
            }

            return conversation;
        } catch (error) {
            console.log("init conversation", error);
            throw new Error('init conversation')
        }
        
    }

    public async addChatInConversation(conversation: ConversationDoc, origin: ChatOrigin, text: string = '', url: string = '', session: SessionDoc): Promise<ConversationDoc> {
        try {
            const chat = await chatRepository.create({conversation_id: conversation.id, origin: origin, text, url});
            session.chat_flow?.push({chatId: chat.id, origin });
            await sessionRepository.updateSession(session.id, session);
            return await conversationRepository.update(conversation.id, {chat_ids: [...(conversation.chat_ids ?? []), chat.id]}) as ConversationDoc;
        } catch (error) {
            throw error
        }
    }
}

export const webhookUtils = new WebhookUtils()