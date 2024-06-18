import mongoose, { Schema, Document } from 'mongoose';

export type SessionModel = {
    current_scenario_item_id: mongoose.Types.ObjectId;
    conversation_id: mongoose.Types.ObjectId;
    is_active: boolean;
};
  
  // Interface Mongoose pour le modèle de Users
export interface SessionDoc extends SessionModel, Document {
    createdAt: Date;
    updatedAt: Date;
}