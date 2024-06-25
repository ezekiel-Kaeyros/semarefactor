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
exports.downloadWhatsappFile = exports.getUrlWhatsappFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const extension_file_mapping_1 = require("./extension-file-mapping");
const axios_1 = __importDefault(require("axios"));
const getUrlWhatsappFile = (mediaId, whatsapp_token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const response = yield axios_1.default.get(`https://graph.facebook.com/v20.0/${mediaId}/`, {
            headers: {
                'Authorization': `Bearer ${whatsapp_token}`
            }
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Axios error:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw new Error(`Error fetching data: ${(_b = error.response) === null || _b === void 0 ? void 0 : _b.status} ${(_c = error.response) === null || _c === void 0 ? void 0 : _c.statusText}`);
        }
        else {
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error');
        }
    }
});
exports.getUrlWhatsappFile = getUrlWhatsappFile;
const downloadWhatsappFile = (url, whatsapp_token, mime_type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utilisation de HttpService.get pour télécharger le fichier avec le token Bearer
        const response = yield axios_1.default.get(url, {
            headers: {
                'Authorization': `Bearer ${whatsapp_token}`,
            },
            responseType: 'arraybuffer'
        });
        // Répertoire de téléchargement des fichiers
        const uploadDir = path_1.default.join(__dirname, '../../..', 'uploads');
        yield fs_extra_1.default.ensureDir(uploadDir);
        // Nom du fichier à enregistrer avec une extension basée sur le type MIME
        const fileName = `image-${Date.now()}${path_1.default.extname(url)}${extension_file_mapping_1.extensionMapping[mime_type]}`;
        const filePath = path_1.default.join(uploadDir, fileName);
        // Écriture du fichier téléchargé sur le disque
        yield fs_extra_1.default.writeFile(filePath, Buffer.from(response.data));
        // URL complète du fichier téléchargé à retourner
        const fileUrl = `${process.env.BASE_URL || 'http://localhost:' + process.env.PORT}/uploads/${fileName}`;
        return fileUrl;
    }
    catch (error) {
        // Gestion des erreurs
        console.error('Unexpected error downloadWhatsappFile:', error);
        throw new Error('Unexpected error, downloadWhatsappFile');
    }
});
exports.downloadWhatsappFile = downloadWhatsappFile;
