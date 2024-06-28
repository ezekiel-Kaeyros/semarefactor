import { Types } from "mongoose";
import { CompanyHourServiceDoc } from "../../core/modeles/company-hour-service.model";
import CompanyHourService from "../../core/database/schemas/company-hour-service.schema";

class CompanyHourServiceRepository{

    async findByDayOfWeek(day: string, company_id: Types.ObjectId): Promise<CompanyHourServiceDoc| null>{
        try {
            return await CompanyHourService.findOne({day: day, company_id: company_id})
        } catch (error) {
            console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    async findOne(day: string, company_id: Types.ObjectId, hour_service_id: Types.ObjectId): Promise<CompanyHourServiceDoc| null>{
        try {
            return await CompanyHourService.findOne({day: day, company_id: company_id, _id: { $ne: hour_service_id } })
        } catch (error) {
            console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    async create(day: string, openingTime: string, closeTime: string , company_id: Types.ObjectId): Promise<CompanyHourServiceDoc| null>{
        try {

            const companyhourservice = new CompanyHourService({
                day: day,
                openingTime: openingTime,
                closeTime: closeTime,
                company_id: company_id
            });

            const companyHourService = await companyhourservice.save();

            return companyHourService;
        } catch (error) {
            console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    async update(day: string, openingTime: string, closeTime: string , hour_service_id: Types.ObjectId): Promise<CompanyHourServiceDoc| null>{
        try {
            const companyHourService =  await CompanyHourService.findByIdAndUpdate(hour_service_id, {
                day: day,
                openingTime: openingTime,
                closeTime: closeTime,
            }, {new: true}).exec();

            return companyHourService;
        } catch (error) {
            console.error('Erreur lors de recuperer l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    // Méthode pour ressortir les booking d'une company
    async findByCompany(company_id: Types.ObjectId): Promise<CompanyHourServiceDoc[] | null> {
        try {
            const companyHourService = await CompanyHourService.find({company_id: company_id});
            return companyHourService;
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }
}

export const companyHourServiceRepository = new CompanyHourServiceRepository();