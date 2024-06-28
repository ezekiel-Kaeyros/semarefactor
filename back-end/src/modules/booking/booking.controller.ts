import { NextFunction, Request, Response } from "express";
import { Route } from "../../core/decorators/route";
import { MongoGet } from "../../core/decorators/mongoose/get";
import { MongoGetAll } from "../../core/decorators/mongoose/getAll";
import Booking from "../../core/database/schemas/booking.schema";
import { Controller } from "../../core/decorators/controller";
import { MongoDelete } from "../../core/decorators/mongoose/delete";
import { MongoUpdate } from "../../core/decorators/mongoose/update";
import { MongoCreate } from "../../core/decorators/mongoose/create";
import { bookingRepository } from "./booking.repository";
import { bookingService } from "./booking.service";
import { Types } from "mongoose";

@Controller('/booking')
class BookingController{

    @Route('get', '/')
    @MongoGetAll(Booking)
    getAll(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoGetAll)
    }

    @Route('get', '/id/:id')
    @MongoGet(Booking)
    get(req: Request, res: Response, next: NextFunction){
        return res.status(200).json(req.mongoGet)
    }

    @Route('get', '/company/:id')
    // @MongoGet(Booking)
    async getBookingByCompany(req: Request, res: Response, next: NextFunction){
        const { id } = req.body
        const { date } = req.params
        const booking = await bookingService.bookingCompany(id, date)
        res.status(booking.status).send(booking.message)
    }

    @Route('post', '/create')
    async create(req: Request, res: Response, next: NextFunction){
        const data= req.body;
        const booking = await bookingService.create(data)
        res.status(booking.status).send(booking.message)
    }

    @Route('patch', '/update/:id')
    async update(req: Request, res: Response, next: NextFunction){
      const data = req.body
      const bookingId = req.params.id as unknown as Types.ObjectId
      const booking = await bookingService.update(bookingId, data)

      return res.status(booking.status).send(booking.message)
    }

    @Route('delete', '/delete/:id')
    @MongoDelete(Booking)
    remove(req: Request, res: Response, next: NextFunction){
        return res.status(200).json({ message: 'Deleted'})
    }
}

export default BookingController;