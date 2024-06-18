import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            mongoGet: Document | undefined;
            mongoGetAll: Document[];
            mongoGetAlls: Document[];
            mongoCreate: Document | undefined;
            mongoUpdate: Document | undefined;
            mongoQuery: Document[];
            mongoAuthRes: any;
            mongoUPloadFileRes: any;
        }
    }
}

export function declareHandler(req: Request, res: Response, next: NextFunction) {
    req.mongoGet = undefined;
    req.mongoGetAll = [];
    req.mongoGetAlls = [];
    req.mongoCreate = undefined;
    req.mongoUpdate = undefined;
    req.mongoQuery = [];
    req.mongoAuthRes = undefined;
    req.mongoUPloadFileRes=undefined;

    next();
}
