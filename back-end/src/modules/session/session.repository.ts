import { Types } from 'mongoose';
import Credentials from '../../core/database/schemas/credential.schema';
import Session from '../../core/database/schemas/session.schema';
import { SessionDoc, SessionModel } from '../../core/modeles/session.model';

class SessionRepository {
    async getMostRecentActiveSession(conversationId: string): Promise<SessionDoc | null> {
        try {
            
            const session = await Session.findOne({
                conversation_id: conversationId,
                is_active: true
            }).sort({ createdAt: -1 }).exec();

            return session;
        } catch (error) {
            console.error('Error retrieving the most recent active session:', error);
            throw error;
        }
    }

    async createSession(sessionData: Omit<SessionModel, 'createdAt' | 'updatedAt'>): Promise<SessionDoc> {
        try {
            const session = new Session(sessionData);
            await session.save();
            return session;
        } catch (error) {
            console.error('Erreur lors de la création de la session:', error);
            throw error;
        }
    }
    
    async updateSession(sessionId: Types.ObjectId, updateData: Partial<SessionModel>): Promise<SessionDoc | null> {
        try {
            const session = await Session.findByIdAndUpdate(
                sessionId,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            
            return session;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la session:', error);
            throw error;
        }
    }

}

export const sessionRepository = new SessionRepository();
