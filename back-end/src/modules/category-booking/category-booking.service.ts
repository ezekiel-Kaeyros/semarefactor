import { Types } from "mongoose";
import CategoryBooking from "../../core/database/schemas/category-booking.schema";
import { CategoryBookingDoc, CategoryBookingModel } from "../../core/modeles/category-booking.model";
import { HelperMethod } from "../../core/utiles/helper-method";
import { categoryBookingRepository } from "./category-booking.repository";

class CategoryBookingService{

    async create(categoryData: CategoryBookingModel): Promise<{status: number, message: CategoryBookingDoc | null}> {
        try {

            let slug = HelperMethod.stringToSlug(categoryData.name);
            let isDublicate = true, i=1
            console.log('slug : ', slug);            

            do{
                const slugExist = await categoryBookingRepository.find(slug)
                if(slugExist.length){
                    slug +=i
                }
                else isDublicate = false
                i++

            }while(isDublicate)

            const categoryBooking =  await categoryBookingRepository.create(categoryData.name, slug, categoryData.company_id)
            return { status: 201, message: categoryBooking}
        } catch (error) {
            console.error(`Erreur lors de la création d'une nouvelle category de booking:`, error);
            throw error;
        }
    }

    // Méthode pour modify une category de booking
    async update(categoryId: Types.ObjectId, categoryData: CategoryBookingModel): Promise<{status: number, message: CategoryBookingDoc | null}> {
        try {
            const category = await categoryBookingRepository.update(categoryId,categoryData);
            return { status: 200, message: category}
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }

    // Méthode pour recuperer les category de booking d'une company
    async findByCompany(company_id: Types.ObjectId): Promise<{status: number, message: CategoryBookingDoc[] | null}> {
        try {
            const category = await categoryBookingRepository.findByCompany(company_id);
            return { status: 200, message: category}
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }
}

export const categoryBookingService = new CategoryBookingService();