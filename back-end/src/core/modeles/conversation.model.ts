import mongoose, { Schema, Document } from 'mongoose';

export type ConversationModel = {
    phone_number: string;
    status?: string;
    chat_ids?: Schema.Types.ObjectId[];
    credential_id: string;
};

export interface ConversationDoc extends ConversationModel, Document {
    createdAt: Date;
    updatedAt: Date;
}