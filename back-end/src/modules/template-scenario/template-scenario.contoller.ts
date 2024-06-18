import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import TemplateScenarios from '../../core/database/schemas/template-scenario.schema';

@Controller('/template-scenario')
class TemplateScenariosController {
   @Route('get', '/')
   @MongoGetAll(TemplateScenarios)
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(TemplateScenarios)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(TemplateScenarios)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(TemplateScenarios)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(TemplateScenarios)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(TemplateScenarios)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }

 

    // Ajoutez d'autres méthodes de contrôleur ici
}

export default TemplateScenariosController;