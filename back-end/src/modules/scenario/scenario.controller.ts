import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import Scenario from '../../core/database/schemas/scenario.schema';
import { getByCredential } from '../../core/decorators/mongoose/getByCredential';

@Controller('/scenario')
class ScenarioController {
   @Route('get', '/')
   @MongoGetAll(Scenario)
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(Scenario, ['scenario_items_id'])
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }

    @Route('get', 'credentialId/:id')
    @getByCredential(Scenario, ['scenario_items_id'])
    getByUserCredential(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Scenario)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(Scenario)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(Scenario)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Scenario)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }

 

    // Ajoutez d'autres méthodes de contrôleur ici
}

export default ScenarioController;