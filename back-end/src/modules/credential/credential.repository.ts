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

    async getCredentailByPhoneNumberId(phone_number_id: string): Promise<CredentialsDoc> {
        try {
            const credentials = await Credentials.findOne({phone_number_id});

            if (!credentials) {
                // throw new Error('Credential not found');
                console.log('Credential not found');
            }

            return credentials;
        } catch (error) {
            console.error('Error retrieving the credential by phone_number_id:', error);
            
        }
        
    }
}

export const credentialsRepository = new CredentialsRepository();