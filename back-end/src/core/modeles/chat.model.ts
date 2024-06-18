import mongoose, { Schema, Document, Types } from 'mongoose';

export type ChatModel = {
    is_read?: boolean;
    text?: string;
    origin: 'bot' | 'admin' | 'user';
    url?: string;
    conversation_id: Types.ObjectId
};

export interface ChatDoc extends ChatModel, Document {
    createdAt: Date;
    updatedAt: Date;
}