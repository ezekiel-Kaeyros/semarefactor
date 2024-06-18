import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoUserRegister(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { email} = req.body;
                const userExists = await model.findOne({ email });
                if (userExists) {
                    res.status(400).json({ message: "The user already exists" });
                  }
                const document = new model({
                    _id: new mongoose.Types.ObjectId(),
                    ...req.body
                });

                await document.save();

                req.mongoCreate = document;
            } catch (error) {
                // logging.error(error);

                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
