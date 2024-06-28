import { Types } from "mongoose";
import CompanyHourService from "../../core/database/schemas/company-hour-service.schema";
import { CompanyHourServiceDoc } from "../../core/modeles/company-hour-service.model";
import { HelperMethod } from "../../core/utiles/helper-method";
import { companyHourServiceRepository } from "./company-hour-service.repository";


class CompanyHourServiceService{

    async create(day: string, openingTime: string, closeTime: string, company_id: Types.ObjectId): 
    Promise<{status: number, message: string| CompanyHourServiceDoc| null}>{
        try {

            const openingTimeInMinutes =HelperMethod.timeStringToMinutes(openingTime);
            const closeTimeInMinutes = HelperMethod.timeStringToMinutes(closeTime);

            if (openingTimeInMinutes > closeTimeInMinutes) {
                return { status: 403, message: `L'heure de debut ne doit pas etre superieur a l'heure de fin` }
            } else if (openingTimeInMinutes == closeTimeInMinutes) {
                return { status: 403, message: `L'heure de debut ne doit pas etre egale a l'heure de fin` }
            }

            const existCompanyHourService = await companyHourServiceRepository.findByDayOfWeek(day, company_id)
            if(existCompanyHourService){
                return { status: 403, message: `ce jour a ete deja ete enregistrer dans la base de donnee pour cette company` }
            }
            
            const companyHourService = await companyHourServiceRepository.create(day, openingTime, closeTime, company_id)
            return { status: 200, message: companyHourService }
        } catch (error) {
            console.error('Erreur lors de la creation l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    async update(hour_service_id: Types.ObjectId, day: string, openingTime: string, closeTime: string, company_id: Types.ObjectId)
    : Promise<{status: number, message: string| CompanyHourServiceDoc| null}>{
        
        try {

            const openingTimeInMinutes =HelperMethod.timeStringToMinutes(openingTime);
            const closeTimeInMinutes = HelperMethod.timeStringToMinutes(closeTime);

            if (openingTimeInMinutes > closeTimeInMinutes) {
                return { status: 403, message: `L'heure de debut ne doit pas etre superieur a l'heure de fin` }
            } else if (openingTimeInMinutes == closeTimeInMinutes) {
                return { status: 403, message: `L'heure de debut ne doit pas etre egale a l'heure de fin` }
            }

            const existCompanyHourService = await companyHourServiceRepository.findOne(day, company_id, hour_service_id)
            if(existCompanyHourService){
                return { status: 403, message: `Ce jour a ete deja ete enregistrer dans la base de donnee pour cette company` }
            }

            const companyHourService = await companyHourServiceRepository.update(day, openingTime, closeTime, hour_service_id)

            return { status: 200, message: companyHourService }
            
        } catch (error) {
            console.error('Erreur lors de la creation l\'heure du service de la company:', error);
            throw error;
        }
        
    }

    // Méthode pour recuperer les horaires de booking d'une company
    async findByCompany(company_id: Types.ObjectId): Promise<{status: number, message: CompanyHourServiceDoc[] | null}> {
        try {
            const companyHourService = await companyHourServiceRepository.findByCompany(company_id);
            return { status: 200, message: companyHourService}
        } catch (error) {
            console.error(`Erreur lors de la mise a jour de la category de booking:`, error);
            throw error;
        }
    }
}

export const companyHourServiceService = new CompanyHourServiceService();