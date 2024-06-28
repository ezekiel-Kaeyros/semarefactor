import mongoose, { Schema, Document, Types } from 'mongoose';

export type CompanyCreneauModel = {
    duration: number,
    company_id: Types.ObjectId
};

export interface CompanyCreneauDoc extends CompanyCreneauModel, Document {
    createdAt: Date;
    updatedAt: Date;
}