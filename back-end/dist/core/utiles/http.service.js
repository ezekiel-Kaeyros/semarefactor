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
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
class HttpService {
    static getAxiosConfig(token, contentType = 'application/json') {
        const config = {
            headers: {
                'Content-Type': contentType,
            },
        };
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
    static get(url, params, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getAxiosConfig(token);
            config.params = params;
            console.log('http get request to ', url);
            return axios_1.default.get(url, config);
        });
    }
    static post(url, data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const config = this.getAxiosConfig(token);
            try {
                console.log('http post request to ', url);
                return yield axios_1.default.post(url, data, config);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.error('Axios error:', {
                        message: error.message,
                        code: error.code,
                        status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                        data: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data,
                    });
                }
                else {
                    console.error('Unexpected error:', error);
                }
                throw 'error http post';
            }
        });
    }
    static put(url, data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getAxiosConfig(token);
            return axios_1.default.put(url, data, config);
        });
    }
    static patch(url, data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getAxiosConfig(token);
            return axios_1.default.patch(url, data, config);
        });
    }
    static delete(url, params, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getAxiosConfig(token);
            config.params = params;
            return axios_1.default.delete(url, config);
        });
    }
    static uploadFile(url, filePath, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = new form_data_1.default();
            form.append('file', fs_1.default.createReadStream(filePath));
            const config = this.getAxiosConfig(token, 'multipart/form-data');
            config.headers = Object.assign(Object.assign({}, config.headers), form.getHeaders());
            return axios_1.default.post(url, form, config);
        });
    }
    static downloadFile(url, savePath, params, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getAxiosConfig(token);
            config.params = params;
            config.responseType = 'stream';
            const response = yield axios_1.default.get(url, config);
            response.data.pipe(fs_1.default.createWriteStream(savePath));
        });
    }
}
exports.default = HttpService;
