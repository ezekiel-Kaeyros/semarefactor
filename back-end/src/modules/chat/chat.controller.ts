import { NextFunction, Request, Response } from 'express';
import { MongoGetAll } from '../../core/decorators/mongoose/getAll';
import { MongoGet } from '../../core/decorators/mongoose/get';
import { MongoCreate } from '../../core/decorators/mongoose/create';
import { MongoQuery } from '../../core/decorators/mongoose/query';
import { MongoUpdate } from '../../core/decorators/mongoose/update';
import { MongoDelete } from '../../core/decorators/mongoose/delete';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import Chat from '../../core/database/schemas/chat.schema';
import { sessionService } from '../session/session.service';
import { chatService } from './chat.service';
import { ChatOrigin } from '../../core/enums/message.enum';

@Controller('/chat')
class ChatController {
   @Route('get', '/')
   @MongoGetAll(Chat)
   getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }

    @Route('get', '/:id')
    @MongoGet(Chat)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Chat)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(Chat)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(Chat)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Chat)
    remove(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: 'Deleted' });
    }

    

    // Ajoutez d'autres méthodes de contrôleur ici


    @Route('post', '/admin-create')
    async adminCreate(req: Request, res: Response, next: NextFunction) {
        try {
            const { conversation_id, text, phone_number_id, phone_number, token } = req.body;
    
            const result = await chatService.createChatInSession(
                { conversation_id, text, origin: ChatOrigin.ADMIN, is_read: true }, phone_number
            );
            
            await chatService.sendWhatsappMessage(result, phone_number_id, token);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    
}

export default ChatController;