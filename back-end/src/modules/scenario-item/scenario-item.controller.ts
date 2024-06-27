import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import ScenarioItems from '../../core/database/schemas/scenario-item.schema';
import upload from '../../core/utiles/multer-config';
import { MongoUploadFile } from '../../core/decorators/mongoose/uploadFile';
import Scenario from '../../core/database/schemas/scenario.schema';

@Controller('/scenario-item')
class ScenarioItemController {
   @Route('get', '/')
   @MongoGetAll(ScenarioItems,['scenario_id'])
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(ScenarioItems,['scenario_id'])
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(ScenarioItems)
    async create(req: Request, res: Response, next: NextFunction) {
        
        if (Array.isArray(req.mongoCreate)) {
            for await (const elt of req.mongoCreate) {
               Scenario.findByIdAndUpdate(req.body[0].scenario_id, { $push: { 'scenario_items_id': elt._id } }).exec();
               
            }

        }else{
          Scenario.findByIdAndUpdate(req.body.scenario_id, { $push: { 'scenario_items_id': req.mongoCreate?._id } }).exec();
         
        }
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(ScenarioItems)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }

    @Route('post', '/upload-file', upload.single('file'))
    @MongoUploadFile(ScenarioItems)
    uploadFile(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUPloadFileRes);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(ScenarioItems)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(ScenarioItems)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }
}

export default ScenarioItemController;