export type UserModel = {
  name: string;
  phone_number: string;
  scenario_not_allowed: string[];
};
  
  // Interface Mongoose pour le modèle de Users
export interface UserDoc extends Document, UserModel {
  createdAt: Date;
  updatedAt: Date;
}