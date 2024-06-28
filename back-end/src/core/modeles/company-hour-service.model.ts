import mongoose, { Schema, Document, Types } from 'mongoose';

export type CompanyHourServiceModel = {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    openingTime: string;
    closeTime: string;
    company_id: Types.ObjectId;
};

export interface CompanyHourServiceDoc extends CompanyHourServiceModel, Document {
    createdAt: Date;
    updatedAt: Date;
}