import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoUploadFile(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                // const document = new model({
                //     _id: new mongoose.Types.ObjectId(),
                //     ...req.body
                // });

                // await document.save();
                const file = req.file;
                
                if (!file) {
                   return res.status(400).send('No file uploaded.');
                }
                const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

                req.mongoUPloadFileRes = {fileUrl};
            } catch (error) {
                // logging.error(error);

                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
