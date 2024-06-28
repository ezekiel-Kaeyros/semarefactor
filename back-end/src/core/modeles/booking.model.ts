import mongoose, { Schema, Document, Types } from 'mongoose';

export type BookingModel = {
    name?: string;
    total_price: number;
    status: 'open' | 'close' | 'finish';
    description?: string;
    startAt: Date;
    endAt: Date;
    service_booking_id: Array<Types.ObjectId>;
    conversation_id: Types.ObjectId
};

export interface BookingDoc extends BookingModel, Document {
    createdAt: Date;
    updatedAt: Date;
}