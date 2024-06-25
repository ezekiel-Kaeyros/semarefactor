import path from "path";
import fs from 'fs-extra';
import { extensionMapping } from "./extension-file-mapping";
import HttpService from "./http.service";
import axios from "axios";

export const getUrlWhatsappFile = async (mediaId: string, whatsapp_token: string) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}/`, {
            headers: {
                'Authorization': `Bearer ${whatsapp_token}`
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(`Error fetching data: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error');
        }
    }
}

export const downloadWhatsappFile = async (url: string, whatsapp_token: string, mime_type: string) => {
    try {
        // Utilisation de HttpService.get pour télécharger le fichier avec le token Bearer
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${whatsapp_token}`,
            },
            responseType: 'arraybuffer'
        });

        // Répertoire de téléchargement des fichiers
        const uploadDir = path.join(__dirname, '../../..', 'uploads');
        await fs.ensureDir(uploadDir);

        // Nom du fichier à enregistrer avec une extension basée sur le type MIME
        const fileName = `image-${Date.now()}${path.extname(url)}${extensionMapping[mime_type]}`;
        const filePath = path.join(uploadDir, fileName);

        // Écriture du fichier téléchargé sur le disque
        await fs.writeFile(filePath, Buffer.from(response.data));

        // URL complète du fichier téléchargé à retourner
        const fileUrl = `${process.env.BASE_URL || 'http://localhost:' + process.env.PORT}/uploads/${fileName}`;

        return fileUrl;
    } catch (error) {
        // Gestion des erreurs
        console.error('Unexpected error downloadWhatsappFile:', error);
        throw new Error('Unexpected error, downloadWhatsappFile');
    }
};