import mongoose, { Schema, Document } from 'mongoose';

export type SessionModel = {
  current_scenario_item_id: mongoose.Types.ObjectId;
  conversation_id: mongoose.Types.ObjectId;
  is_active: boolean;
  chat_flow?: {to_display?: boolean, chatId: mongoose.Types.ObjectId, origin: string}[]
};
  
  // Interface Mongoose pour le modèle de Users
export interface SessionDoc extends SessionModel, Document {
    createdAt: Date;
    updatedAt: Date;
}