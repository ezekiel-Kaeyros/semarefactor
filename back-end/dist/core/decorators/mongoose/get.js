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
exports.MongoGet = void 0;
function MongoGet(model, populate) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log('populate==========>', populate);
                    const document = yield model
                        .findById(req.params.id)
                        .populate(populate || []);
                    if (document) {
                        req.mongoGet = document;
                    }
                    else {
                        return res.status(400).json({ error: 'Not found' });
                    }
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
exports.MongoGet = MongoGet;
