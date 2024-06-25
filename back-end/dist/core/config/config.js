"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.mongo = exports.SERVER_PORT = exports.SERVER_HOSTNAME = exports.MONGO_OPTIONS = exports.MONGO_TABLE = exports.MONGO_URL = exports.MONGO_PASSWORD = exports.MONGO_USER = exports.TEST = exports.DEVELOPMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
exports.MONGO_USER = process.env.MONGO_USER || '';
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
exports.MONGO_URL = process.env.MONGO_URL || '';
exports.MONGO_TABLE = process.env.MONGO_TABLE || '';
exports.MONGO_OPTIONS = { retryWrites: true, w: 'majority' };
exports.SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
exports.SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 12345;
exports.mongo = {
    MONGO_USER: exports.MONGO_USER,
    MONGO_PASSWORD: exports.MONGO_PASSWORD,
    MONGO_URL: exports.MONGO_URL,
    MONGO_TABLE: exports.MONGO_TABLE,
    MONGO_OPTIONS: exports.MONGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${exports.MONGO_USER}:${exports.MONGO_PASSWORD}@${exports.MONGO_URL}/${exports.MONGO_TABLE}`
};
exports.server = {
    SERVER_HOSTNAME: exports.SERVER_HOSTNAME,
    SERVER_PORT: exports.SERVER_PORT
};
