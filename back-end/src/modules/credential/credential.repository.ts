import { Types } from "mongoose";
import Conversation from "../../core/database/schemas/conversation.schema";
import Credentials from "../../core/database/schemas/credential.schema";
import { CredentialsDoc } from "../../core/modeles/credential.model";
import { conversationRepository } from "../conversation/conversation.repository";

class CredentialsRepository {
    async getByVerifyToken(verify_token: string): Promise<CredentialsDoc | null> {
        const credentials = await Credentials.findOne({verify_token});
        return credentials;
    }

    async getCredentailByPhoneNumberId(phone_number_id: string): Promise<CredentialsDoc | boolean> {
        try {
            const credentials = await Credentials.findOne({phone_number_id});

            if (!credentials) {
                console.log('credential not found');
                return false;
            }

            return credentials;
        } catch (error) {
            console.error('Error retrieving the credential by phone_number_id:', error);
            return false;
        }
        
    }
}

export const credentialsRepository = new CredentialsRepository();