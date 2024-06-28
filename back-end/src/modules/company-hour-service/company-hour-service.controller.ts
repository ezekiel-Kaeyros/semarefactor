import { NextFunction, Request, Response } from "express"
import { Controller } from "../../core/decorators/controller"
import { MongoGet } from "../../core/decorators/mongoose/get"
import { MongoGetAll } from "../../core/decorators/mongoose/getAll"
import { Route } from "../../core/decorators/route"
import CompanyHourService from "../../core/database/schemas/company-hour-service.schema"
import { MongoCreate } from "../../core/decorators/mongoose/create"
import { MongoUpdate } from "../../core/decorators/mongoose/update"
import { MongoDelete } from "../../core/decorators/mongoose/delete"
import { companyHourServiceService } from "./company-hour-service.service"
import { Types } from "mongoose"

@Controller('/company-hour-service')
class CompanyHourServiceController{

    @Route('get', '/')
    @MongoGetAll(CompanyHourService)
    getAll(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGetAll)
    }

    @Route('get', '/:id')
    @MongoGet(CompanyHourService)
    get(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGet)
    }

    @Route('get', '/company/:id')
    // @MongoGet(CompanyHourService)
    async getByCompany(req: Request, res: Response, next: NextFunction){
        const companyHourServiceId = req.params.id as unknown as Types.ObjectId
        const hourservice = await companyHourServiceService.findByCompany(companyHourServiceId)
        res.status(hourservice.status).send(hourservice.message)
        // return res.status(200).send(req.mongoGet)
    }

    @Route('post', '/create')
    async create(req: Request, res: Response, next: NextFunction){
        const {day, openingTime, closeTime, company_id} = req.body
        const hourservice = await companyHourServiceService.create(day, openingTime, closeTime, company_id)
        res.status(hourservice.status).send(hourservice.message)
    }

    @Route('patch', '/update/:id')
    async update(req: Request, res: Response, next: NextFunction){
        const {day, openingTime, closeTime, company_id} = req.body
        const companyHourServiceId = req.params.id as unknown as Types.ObjectId
        const hourservice = await companyHourServiceService.update(companyHourServiceId, day, openingTime, closeTime, company_id)
        res.status(hourservice.status).send(hourservice.message)
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(CompanyHourService)
    remove(req: Request, res: Response, next: NextFunction){
        return res.status(200).send({msg: 'Deleted'})
    }
}

export default CompanyHourServiceController;