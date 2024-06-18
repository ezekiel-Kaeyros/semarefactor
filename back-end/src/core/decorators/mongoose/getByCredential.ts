import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function getByCredential(model: Model<any>, populate?: string[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const documents = await model.find({credential_id: req.params.id}).populate(populate || [])
                req.mongoQuery = documents;
            } catch (error) {
                // logging.error(error);

                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
