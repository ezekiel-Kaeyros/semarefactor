import { NextFunction, Request, Response } from "express"
import { Controller } from "../../core/decorators/controller"
import { Route } from "../../core/decorators/route"
import { MongoGetAll } from "../../core/decorators/mongoose/getAll"
import { MongoGet } from "../../core/decorators/mongoose/get"
import { MongoCreate } from "../../core/decorators/mongoose/create"
import { MongoUpdate } from "../../core/decorators/mongoose/update"
import { MongoDelete } from "../../core/decorators/mongoose/delete"
import ServiceBooking from "../../core/database/schemas/service-booking.schema"
import { serviceBookingService } from "./service-booking.service"
import { Types } from "mongoose"

@Controller('/service-booking')
class ServiceBookingController{

    @Route('get', '/')
    @MongoGetAll(ServiceBooking)
    getAll(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGetAll)
    }

    @Route('get', '/company/:id')
    async getByCompany(req: Request, res: Response, next: NextFunction){
        const companyHourServiceId = req.params.id as unknown as Types.ObjectId
        const serviceBooking = await serviceBookingService.findByCompany(companyHourServiceId)
        res.status(serviceBooking.status).send(serviceBooking.message)
    }

    @Route('get', '/:id')
    @MongoGet(ServiceBooking)
    get(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGet)
    }

    @Route('post', '/create')
    // @MongoCreate(ServiceBooking)
    async create(req: Request, res: Response, next: NextFunction){
        const data = req.body
        const service = await serviceBookingService.create(data)
        return res.status(service.status).send(service.message)
    }

    @Route('patch', '/update/:id')
    // @MongoUpdate(ServiceBooking)
    async update(req: Request, res: Response, next: NextFunction){
        const data = req.body
        const { id } = req.params 
        const service = await serviceBookingService.update(id as unknown as Types.ObjectId, data)
        return res.status(service.status).send(service.message)
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(ServiceBooking)
    remove(req: Request, res: Response, next: NextFunction){
        return res.status(200).send({msg: 'Deleted'})
    }
}

export default ServiceBookingController;