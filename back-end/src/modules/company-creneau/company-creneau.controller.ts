import { NextFunction, Request, Response } from "express";
import { Controller } from "../../core/decorators/controller";
import { Route } from "../../core/decorators/route";
import { MongoGetAll } from "../../core/decorators/mongoose/getAll";
import CompanyCreneau from "../../core/database/schemas/company-creneau.schema";
import { MongoCreate } from "../../core/decorators/mongoose/create";
import { MongoUpdate } from "../../core/decorators/mongoose/update";
import { MongoDelete } from "../../core/decorators/mongoose/delete";
import { companyCreneauService } from "./company-creneau.service";
import { Types } from "mongoose";

@Controller('/company-creneau')
class CompanyCreneauController{

    @Route('get', '/')
    @MongoGetAll(CompanyCreneau)
    getAll(req: Request, res: Response, next: NextFunction){
        res.status(200).json(req.mongoGetAll)
    }

    @Route('get', '/:id')
    @MongoGetAll(CompanyCreneau)
    get(req: Request, res: Response, next: NextFunction){
        res.status(200).json(req.mongoGet)
    }

    @Route('get', '/available/:companyId')
    async getAvailable(req: Request, res: Response, next: NextFunction){
        const { companyId } = req.params
        const { date, typeFormat } = req.query
        const availableList = await companyCreneauService.getAvailalable(
            date as unknown as string,
            companyId as unknown as Types.ObjectId,
            typeFormat as unknown as number
        );
        res.status(availableList.status).json(availableList.message)
    }

    @Route('get', '/availableDays/:companyId')
    async getAvailableDays(req: Request, res: Response, next: NextFunction){
        const { companyId } = req.params
        const { nb_days } = req.query
        const availableList = await companyCreneauService.getPeriodeDays(
            companyId as unknown as Types.ObjectId,
            nb_days as unknown as number
        );
        res.status(availableList.status).json(availableList.message)
    }

    @Route('post', '/create')
    // @MongoCreate(CompanyCreneau)
    async create(req: Request, res: Response, next: NextFunction){
        const data = req.body
        const companyCreneau = await companyCreneauService.create(data);
        res.status(companyCreneau.status).json(companyCreneau.message)
    }

    @Route('patch', '/update/:id')
    @MongoUpdate(CompanyCreneau)
    update(req: Request, res: Response, next: NextFunction){
        res.status(200).json(req.mongoUpdate)
    }

    @Route('patch', '/delete/:id')
    @MongoDelete(CompanyCreneau)
    remove(req: Request, res: Response, next: NextFunction){
        res.status(200).json({msg: "Deleted"})
    }
}

export default CompanyCreneauController;