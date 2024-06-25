import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoCreate(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                if (Array.isArray(req.body)) {
                    let arr: any= []
                    for await (const element of req.body) {
                        console.log(element);
                        let res= await model.create(element)
                       console.log(res);
                       
                       arr.push(res)
                      }
                    
                    req.mongoCreate = arr;
                    
                }else{
                    const document = new model({
                        _id: new mongoose.Types.ObjectId(),
                        ...req.body
                    });
    
                    await document.save();
                    req.mongoCreate = document;
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
