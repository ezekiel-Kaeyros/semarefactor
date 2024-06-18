import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import Conversation from '../../core/database/schemas/scenario.schema';

@Controller('/conversation')
class ConversationController {
   @Route('get', '/')
   @MongoGetAll(Conversation)
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(Conversation)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Conversation)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(Conversation)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(Conversation)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Conversation)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }

 

    // Ajoutez d'autres méthodes de contrôleur ici
}

export default ConversationController;