import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { generateToken } from '../../utiles/auth';
import Credentials from '../../database/schemas/credential.schema';


export function MongoUserAuth(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { email, password } = req.body;
                const user = await model.findOne({ email });
                if (user && (await user.comparePassword(password))) {
                   let token=  generateToken(res, user._id);
                   let credentials = await Credentials.findOne({email: user.email})
                   let document= {
                        _id: user._id,
                        email: user.email,
                        token,
                        credentials: credentials
                    }
                    // res.status(200).json(document);
                    req.mongoAuthRes = document;

                }else {
                    res.status(400).json({ message: "An error occurred in creating the user" });
                  }
               
            } catch (error) {
                // logging.error(error);
               console.log(error);
               
                return res.status(400).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
