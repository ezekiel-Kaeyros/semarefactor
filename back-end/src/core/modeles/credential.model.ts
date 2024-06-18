import mongoose, { Schema, Document } from 'mongoose';

export type CredentialsModel  = {
    company: string;
    phone_number_id: string;
    verify_token: string;
    token: string;
    email: string;
};

export interface CredentialsDoc extends CredentialsModel, Document {
    createdAt: Date;
    updatedAt: Date;
}