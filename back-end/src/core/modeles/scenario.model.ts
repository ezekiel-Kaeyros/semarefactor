import mongoose, { Schema, Document } from 'mongoose';
import { ScenarioItemsDoc } from './scenario-item.model';

export type ScenarioModel = {
    title: string;
    type: string;
    keywords: string[];
    credential_id?: mongoose.Types.ObjectId;
    active?: boolean;
    scenario_items_id: mongoose.Types.ObjectId[] | ScenarioItemsDoc[];
    repeat_count?: number;
};

export interface ScenarioDoc extends ScenarioModel, Document {
    createdAt: Date;
    updatedAt: Date;
}