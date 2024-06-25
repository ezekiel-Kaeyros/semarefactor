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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserAuth = void 0;
const auth_1 = require("../../utiles/auth");
const credential_schema_1 = __importDefault(require("../../database/schemas/credential.schema"));
function MongoUserAuth(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email, password } = req.body;
                    const user = yield model.findOne({ email });
                    if (user && (yield user.comparePassword(password))) {
                        let token = (0, auth_1.generateToken)(res, user._id);
                        let credentials = yield credential_schema_1.default.findOne({ email: user.email });
                        let document = {
                            _id: user._id,
                            email: user.email,
                            token,
                            credentials: credentials
                        };
                        // res.status(200).json(document);
                        req.mongoAuthRes = document;
                    }
                    else {
                        res.status(400).json({ message: "An error occurred in creating the user" });
                    }
                }
                catch (error) {
                    // logging.error(error);
                    console.log(error);
                    return res.status(400).json(error);
                }
                return originalMethod.call(this, req, res, next);
            });
        };
        return descriptor;
    };
}
exports.MongoUserAuth = MongoUserAuth;
