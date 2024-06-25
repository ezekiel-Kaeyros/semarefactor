"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})");
const authSignup = joi_1.default.object().keys({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(PASSWORD_REGEX).min(8).required(),
});
const authSignin = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const credentialsValidator = joi_1.default.object().keys({
    company: joi_1.default.string().required(),
    phone_number_id: joi_1.default.string().required(),
    verify_token: joi_1.default.string().required(),
    token: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
exports.default = {
    "/auth/signin": authSignin,
    "/auth/signup": authSignup,
    "/credentials": credentialsValidator
};
