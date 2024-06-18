import mongoose, { Document, Types } from 'mongoose';

export type ScenarioItemsModel = {
    uuid: string;
    label?: string;
    url?: string;
    template_scenario_id?: string[];
    type: string;
    parents: string[];
    children: string[];
    childrenDetails?: ScenarioItemsDoc[]
    scenario_id?: mongoose.Types.ObjectId;
};

export interface ScenarioItemsDoc extends ScenarioItemsModel, Document {
    createdAt: Date;
    updatedAt: Date;
}