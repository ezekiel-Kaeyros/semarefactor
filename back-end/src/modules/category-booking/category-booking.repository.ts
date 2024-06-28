import { Types } from "mongoose";
import CategoryBooking from "../../core/database/schemas/category-booking.schema";
import { CategoryBookingDoc, CategoryBookingModel } from "../../core/modeles/category-booking.model";
import { HelperMethod } from "../../core/utiles/helper-method";


class CategoryBookingRepository{


    async find(slug: string): Promise<CategoryBookingDoc[]> {
        try {

            return await CategoryBooking.find({slug: slug})
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }

    // Méthode pour créer une nouvelle category de booking
    async create(name: string, slug: string, company_id: Types.ObjectId): Promise<CategoryBookingDoc | null> {
        try {

            const data = {
                name: name,
                slug: slug,
                company_id: company_id
            }

            const category = new CategoryBooking(data);
            return await category.save();
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }

    // Méthode pour modify une category de booking
    async update(categoryId: Types.ObjectId, categoryData: CategoryBookingModel): Promise<CategoryBookingDoc | null> {
        try {
            const category = await CategoryBooking.findByIdAndUpdate(categoryId,categoryData, {new: true}).exec();
            return  category;
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }

    // Méthode pour modify une category de booking
    async findByCompany(company_id: Types.ObjectId): Promise<CategoryBookingDoc[] | null> {
        try {
            const category = await CategoryBooking.find({company_id: company_id});
            return category;
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }
}

export const categoryBookingRepository = new CategoryBookingRepository();
