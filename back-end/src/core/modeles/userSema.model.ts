export type UserSemaModel = {
    company: string;
    phone: string;
    email: string;
    password: string;
    userType: "OWNER" | "TEAM_MEMBER" | "BUSINESS_MANAGER";
    roles?: string[];
    verified?: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    credentials?: string;
    // address?: AddressModel[];
};
  
  // Interface Mongoose pour le modèle de Users
export interface UserSemaDoc extends Document, UserSemaModel {
    createdAt: Date;
    updatedAt: Date;
}