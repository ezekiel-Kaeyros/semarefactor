import { Types } from "mongoose";
import CompanyCreneau from "../../core/database/schemas/company-creneau.schema";
import { CompanyCreneauModel } from "../../core/modeles/company-creneau.model";
import { HelperMethod } from "../../core/utiles/helper-method";
import CompanyHourService from "../../core/database/schemas/company-hour-service.schema";


class CompanyCreneauService{

    async create(CompanyCreneauData: CompanyCreneauModel): Promise<{status: number, message: string| null| CompanyCreneauModel}>{
        try {

            const existCompanyCreneau = await CompanyCreneau.findOne({company_id: CompanyCreneauData.company_id})
            if(existCompanyCreneau){
                return { status: 400, message: `Il existe deja un creneau pour cette company` }
            }
            
            const companyCreneau = new CompanyCreneau({
                duration: CompanyCreneauData.duration,
                company_id: CompanyCreneauData.company_id
            });

            const companyCreneauService = await companyCreneau.save();
            return { status: 201, message: companyCreneauService }
        } catch (error) {
            console.error('Erreur lors de la creation du creneau de la company:', error);
            throw error;
        }
    }

    async getAvailalable(date: string, companyId: Types.ObjectId, typeFormat: number = 1): Promise<{status: number, message: string| null| Array<String>}>{
            try {

                //on verifie si une date est renseigner
                if(!date){
                    return {status: 400, message: "Veuillez renseigner la date!"}
                }
    
                //on verifie si la date est valide
                if(!HelperMethod.isValidDate(date)){
                    return {status: 400, message: "Veuillez renseigner une date valide"}
                }

                const dateInput = new Date(date);
                dateInput.setHours(0, 0, 0, 0)
                let dateNow = new Date();
                dateNow.setHours(0, 0, 0, 0)

                const existCompanyCreneau = await CompanyCreneau.findOne({company_id: companyId})

                //duree par defaut s'il ne l'a pas fait depuis le dashboard
                let duration = 60

                if(existCompanyCreneau){
                    duration = existCompanyCreneau.get('duration')
                }

                const dayOfWeek = HelperMethod.getDayOfWeek(date)
                const existCompanyHour = await CompanyHourService.findOne({day: dayOfWeek, company_id: companyId})
                if(!existCompanyHour){
                    return { status: 200, message: [] }
                }

                let openingTime = existCompanyHour.get('openingTime')
                const closeTime = existCompanyHour.get('closeTime')

                console.log('Time 1 : ', dateInput.getTime())
                console.log('Time 2 : ', dateNow.getTime())
                console.log(dateNow.getTime() == dateInput.getTime());
                
                if(dateInput.getTime() == dateNow.getTime()){
                    let [debutHeure, debutMinute] = openingTime.split(':').map(Number);
                    const newDate = new Date()
                    
                    if(newDate.getHours()>= debutHeure){
                        openingTime = `${newDate.getHours()+1}:00`
                    }
                    
                }

                //on recupere la liste des creneaux en fonction de la date du jour
                let availableSlots = HelperMethod.genererPlagesHoraires(date, openingTime, closeTime, duration, typeFormat);                
                
                return { status: 200, message: availableSlots}
            } catch (error) {
                console.error('Erreur lors de la creation du creneau de la company:', error);
                throw error;
            }
    }

    async getPeriodeDays(companyId: Types.ObjectId, nb_days: number = 7): Promise<{status: number, message: string | null | Array<{date: string, isOpen: boolean}>}>
    {

        try{

            const existCompanyHour = await CompanyHourService.find({company_id: companyId})
            if(existCompanyHour.length == 0){
                return { status: 400, message: `Cette company n'a pas de jour de travail` }
            }

            const days = existCompanyHour.map(item => item.get('day'))

            console.log(days)

            const periodDays = HelperMethod.genererPlageDeDates(new Date().toString(), nb_days, days)

            return { status: 200, message: periodDays}

        } catch (error) {
            console.error('Erreur lors de la creation du creneau de la company:', error);
            throw error;
        }

    }
}

export const companyCreneauService = new CompanyCreneauService();