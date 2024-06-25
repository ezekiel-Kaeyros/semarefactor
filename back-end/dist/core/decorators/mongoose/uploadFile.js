"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUploadFile = void 0;
function MongoUploadFile(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
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
                    req.mongoUPloadFileRes = { fileUrl };
                }
                catch (error) {
                    // logging.error(error);
                    return res.status(400).json(error);
                }
                return originalMethod.call(this, req, res, next);
            });
        };
        return descriptor;
    };
}
exports.MongoUploadFile = MongoUploadFile;
