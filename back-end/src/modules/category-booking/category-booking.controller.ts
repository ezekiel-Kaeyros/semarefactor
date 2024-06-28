import { NextFunction, Request, Response } from "express";
import { Controller } from "../../core/decorators/controller";
import { Route } from "../../core/decorators/route";
import { MongoGetAll } from "../../core/decorators/mongoose/getAll";
import CategoryBooking from "../../core/database/schemas/category-booking.schema";
import { MongoGet } from "../../core/decorators/mongoose/get";
import { MongoCreate } from "../../core/decorators/mongoose/create";
import { MongoUpdate } from "../../core/decorators/mongoose/update";
import { MongoDelete } from "../../core/decorators/mongoose/delete";
import { categoryBookingRepository } from "./category-booking.repository";
import { Types } from "mongoose";
import { categoryBookingService } from "./category-booking.service";

@Controller('/category-booking')
class CategoryBookingController{

    @Route('get', '/')
    @MongoGetAll(CategoryBooking)
    getAll(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGetAll)
    }

    @Route('get', '/:id')
    @MongoGet(CategoryBooking)
    get(req: Request, res: Response, next: NextFunction){
        return res.status(200).send(req.mongoGet)
    }

    @Route('get', '/company/:id')
    // @MongoGet(CategoryBooking)
    async getByCompany(req: Request, res: Response, next: NextFunction){
        const id = req.params.id as unknown as Types.ObjectId
        const category = await categoryBookingService.findByCompany(id)
        res.status(category.status).json(category.message)
    }

    @Route('post', '/create')
    async create(req: Request, res: Response, next: NextFunction){
        const data = req.body
        console.log(data);
        const category = await categoryBookingService.create(data)
        res.status(category.status).json(category.message)
    }

    @Route('patch', '/update/:id')
    async update(req: Request, res: Response, next: NextFunction){
        const data = req.body
        const id = req.params.id as unknown as Types.ObjectId
        const category = await categoryBookingService.update(id, data)
        res.status(category.status).json(category.message)
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(CategoryBooking)
    remove(req: Request, res: Response, next: NextFunction){
        return res.status(200).send({msg: 'Deleted'})
    }
}

export default CategoryBookingController;