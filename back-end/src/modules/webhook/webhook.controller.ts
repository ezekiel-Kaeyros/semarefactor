import { NextFunction, Request, Response } from 'express';
import { Controller } from '../../core/decorators/controller';
import { Route } from '../../core/decorators/route';
import { webhookService } from './webhook.service';
import { IWhatsappRequestData } from '../../core/modeles/whatsapp.model';
import { WhatsappHelperMethode } from '../../core/utiles/whatsapp-helper-method';

@Controller('/webhook')
class WebhookController {
    @Route('get', '')
    async verifyToken(req: Request, res: Response, next: NextFunction) {
        
        try {
            const queryParams = req.query;
            console.log(" queryParams ======", queryParams);
            
            const mode = queryParams["hub.mode"] as string;
            const verify_token = queryParams["hub.verify_token"] as string;
            const challenge = queryParams["hub.challenge"] as string;

            const result = await webhookService.verifyToken(mode, verify_token, challenge);

            if (result.message) {
                return res.status(result.status).send(result.message);
            } else {
                return res.status(result.status).send();
            }
        } catch (error) {
            next(error);
        }
    }

    @Route('post', '')
    async chatbot(req: Request, res: Response, next: NextFunction) {
       
        try {
            const body = req.body;

            // console.log(`\u{1F7EA} Received webhook:`);
            // console.dir(body, { depth: null });
            
            // Validate the request body format
            if (!WhatsappHelperMethode.contentMessageIsValid(body)) {
                return res.status(200).send({});
            }
        
            // Format the request data
            const whatsappRequestData: IWhatsappRequestData = WhatsappHelperMethode.formatWhatsappMessage(body);
            
            // Init service
            const {credential, conversation, session} = await webhookService.init(whatsappRequestData.phone_number_id, whatsappRequestData.phone_number);

            // Check if bot is not active
            if (await webhookService.botIsNotActive(whatsappRequestData, credential)) {
                return res.status(200).send({});
            }
            
            // Handle kill session
            if (await webhookService.killSessionWithKeyword(whatsappRequestData, session, credential)) {
                return res.status(200).send({});
            }

            // Handle the chatbot process
            await webhookService.handleChatbotProcess(whatsappRequestData, session, credential, conversation);

            return res.status(200).send({});
        } catch (error) {
            console.log('execption in controller: ', error);
            
            return res.status(200).send({});
        }
    }
}

export default WebhookController;