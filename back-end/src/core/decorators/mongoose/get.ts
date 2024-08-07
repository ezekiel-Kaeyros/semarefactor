import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoGet(model: Model<any>, populate?: string[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                console.log('populate==========>', populate);
                
                const document = await model
                .findById(req.params.id)
                .populate(populate || [])

                if (document) {
                    req.mongoGet = document;
                } else {
                    return res.status(400).json({ error: 'Not found' });
                }
            } catch (error) {
                // logging.error(error);

                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
