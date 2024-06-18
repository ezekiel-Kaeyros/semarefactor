import { Types } from "mongoose";
import Conversation from "../../core/database/schemas/conversation.schema";
import { ConversationDoc, ConversationModel } from "../../core/modeles/conversation.model";

class ConversationRepository {

    // Méthode pour créer une nouvelle conversation
    async create(conversationData: ConversationModel): Promise<ConversationDoc> {
        try {
            const conversation = new Conversation(conversationData);
            return await conversation.save();
        } catch (error) {
            console.error('Erreur lors de la création de la conversation:', error);
            throw error;
        }
    }

    // Méthode pour récupérer une conversation par ID
    async getById(conversationId: Types.ObjectId): Promise<ConversationDoc | null> {
        try {
            return await Conversation.findById(conversationId).exec();
        } catch (error) {
            console.error('Erreur lors de la récupération de la conversation par ID:', error);
            throw error;
        }
    }

    // Méthode pour récupérer toutes les conversations (possibilité de filtrer ou paginer)
    async getAll(filter: Partial<ConversationModel> = {}, limit: number = 10, skip: number = 0): Promise<ConversationDoc[]> {
        try {
            return await Conversation.find(filter).limit(limit).skip(skip).exec();
        } catch (error) {
            console.error('Erreur lors de la récupération des conversations:', error);
            throw error;
        }
    }

    // Méthode pour mettre à jour une conversation par ID
    async update(conversationId: Types.ObjectId, updateData: Partial<ConversationModel>): Promise<ConversationDoc | null> {
        try {
            return await Conversation.findByIdAndUpdate(conversationId, { $set: updateData }, { new: true, runValidators: true }).exec();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la conversation:', error);
            throw error;
        }
    }

    // Méthode pour supprimer une conversation par ID
    async delete(conversationId: Types.ObjectId): Promise<ConversationDoc | null> {
        try {
            return await Conversation.findByIdAndDelete(conversationId).exec();
        } catch (error) {
            console.error('Erreur lors de la suppression de la conversation:', error);
            throw error;
        }
    }

    // Méthode pour récupérer une conversation par numéro de téléphone et credential_id
    async getByPhoneNumberAndCredentialId(phoneNumber: string, credentialId: string): Promise<ConversationDoc | null> {
        try {
            return await Conversation.findOne({ phone_number: phoneNumber, credential_id: credentialId }).exec();
        } catch (error) {
            console.error('Erreur lors de la récupération de la conversation par numéro de téléphone et credential_id:', error);
            throw error;
        }
    }
}

export const conversationRepository = new ConversationRepository();
