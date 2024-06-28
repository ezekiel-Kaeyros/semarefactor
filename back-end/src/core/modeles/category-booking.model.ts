import mongoose, { Schema, Document, Types } from 'mongoose';

export type CategoryBookingModel = {
    name: string;
    slug: string;
    company_id: Types.ObjectId
};

export interface CategoryBookingDoc extends CategoryBookingModel, Document {
    createdAt: Date;
    updatedAt: Date;
}