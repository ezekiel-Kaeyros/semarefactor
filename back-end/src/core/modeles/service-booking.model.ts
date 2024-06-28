import mongoose, { Schema, Document, Types } from 'mongoose';

export type ServiceBookingModel = {
    name: string;
    price: number;
    duration: number;
    category_id: Types.ObjectId;
    company_id: Types.ObjectId;    
};

export interface ServiceBookingDoc extends ServiceBookingModel, Document {
    createdAt: Date;
    updatedAt: Date;
}