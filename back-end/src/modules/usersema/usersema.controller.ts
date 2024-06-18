import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import UserSema from '../../core/database/schemas/userSema.schema';
import { MongoUserRegister } from '../../core/decorators/mongoose/register';
import { MongoUserAuth } from '../../core/decorators/mongoose/auth';

@Controller('/usersema')
class UserSemaController {
   @Route('get', '/')
   @MongoGetAll(UserSema)
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(UserSema)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoUserRegister(UserSema)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/auth')
    @MongoUserAuth(UserSema)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoAuthRes);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(UserSema)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(UserSema)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }
}

export default UserSemaController;