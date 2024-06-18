import { Types } from "mongoose";
import Chat from "../../core/database/schemas/chat.schema";
import { ChatDoc, ChatModel } from "../../core/modeles/chat.model";
import { conversationRepository } from "../conversation/conversation.repository";

class ChatRepository {
    // Méthode pour créer un nouveau chat
    async create(chatData: ChatModel): Promise<ChatDoc> {
        try {
            const chat = new Chat(chatData);
            return await chat.save();
        } catch (error) {
            console.error('Erreur lors de la création du chat:', error);
            throw error;
        }
    }

    // Méthode pour récupérer un chat par ID
    async getById(chatId: Types.ObjectId): Promise<ChatDoc | null> {
        try {
            return await Chat.findById(chatId).exec();
        } catch (error) {
            console.error('Erreur lors de la récupération du chat par ID:', error);
            throw error;
        }
    }

    // Méthode pour récupérer tous les chats (possibilité de filtrer ou paginer)
    async getAll(filter: Partial<ChatModel> = {}, limit: number = 10, skip: number = 0): Promise<ChatDoc[]> {
        try {
            return await Chat.find(filter).limit(limit).skip(skip).exec();
        } catch (error) {
            console.error('Erreur lors de la récupération des chats:', error);
            throw error;
        }
    }

    // Méthode pour mettre à jour un chat par ID
    async update(chatId: Types.ObjectId, updateData: Partial<ChatModel>): Promise<ChatDoc | null> {
        try {
            return await Chat.findByIdAndUpdate(chatId, { $set: updateData }, { new: true, runValidators: true }).exec();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du chat:', error);
            throw error;
        }
    }

    // Méthode pour supprimer un chat par ID
    async delete(chatId: Types.ObjectId): Promise<ChatDoc | null> {
        try {
            return await Chat.findByIdAndDelete(chatId).exec();
        } catch (error) {
            console.error('Erreur lors de la suppression du chat:', error);
            throw error;
        }
    }

    async getLastAdminOfConversation(phoneNumber: string, credentialId: string) {
        const conversation = await conversationRepository.getByPhoneNumberAndCredentialId(phoneNumber, credentialId);
        if (!conversation || !conversation?.chat_ids) {
            return null;
        }
        const idLastChat = conversation.chat_ids[conversation.chat_ids.length - 1];
        const chat = await Chat.findOne({_id: idLastChat, origin: 'admin'});
        return chat;
    }
}

export const chatRepository = new ChatRepository();
