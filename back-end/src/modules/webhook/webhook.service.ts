// webhookService.ts
import { ChatOrigin, StandardKeyWord, StandardMessageEnum, TimeValidSession } from '../../core/enums/message.enum';
import { TypeWhatsappMessage } from '../../core/enums/scenario.enum';
import { CredentialsDoc } from '../../core/modeles/credential.model';
import { ScenarioItemsDoc } from '../../core/modeles/scenario-item.model';
import { ScenarioDoc } from '../../core/modeles/scenario.model';
import { SessionDoc } from '../../core/modeles/session.model';
import { IWhatsappRequestData, SendWAMessageModel, SendWATextModel, WARecipient } from '../../core/modeles/whatsapp.model';
import HttpService from '../../core/utiles/http.service';
import { downloadWhatsappFile, getUrlWhatsappFile } from '../../core/utiles/upload-file-from-webhook';
import { WhatsappHelperMethode } from '../../core/utiles/whatsapp-helper-method';
import { credentialsRepository } from '../credential/credential.repository';
import { scenarioRepository } from '../scenario/scenario.repository';
import { sessionRepository } from '../session/session.repository';
import { sessionService } from '../session/session.service';
import { FacebookWebService } from '../../core/enums/facebook-webservice';
import { conversationRepository } from '../conversation/conversation.repository';
import { ConversationDoc, ConversationModel } from '../../core/modeles/conversation.model';
import { webhookUtils } from './webhook.utils';
import { chatRepository } from '../chat/chat.repository';
import { HelperMethod } from '../../core/utiles/helper-method';

class WebhookService {
    
    public async init(phoneNumberId: string, phoneNumber: string) {
      try {
        const credential = await credentialsRepository.getCredentailByPhoneNumberId(phoneNumberId);
        const conversation = await webhookUtils.initConversation(phoneNumber, credential.id);
        const session = await sessionRepository.getMostRecentActiveSession(conversation.id);
        return {credential, conversation, session}
      } catch (error) {
        throw error
      }  
    }
  
    public async verifyToken(mode: string, verifyToken: string, challenge: string): Promise<{ status: number, message?: string }> {
      const credentials = await credentialsRepository.getByVerifyToken(verifyToken);
  
      if (mode && verifyToken && credentials) {
        if (mode === "subscribe" && verifyToken === credentials.verify_token) {
          return { status: 200, message: challenge };
        } else {
          return { status: 403 };
        }
      }
      return { status: 403 };
    }

    async killSessionWithKeyword(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc): Promise<boolean> {
      try {
        // Vérification du type de message
        if (whatsappRequestData.type !== TypeWhatsappMessage.TEXT) {
          return false;
        }

        // Vérification du contenu du message
        if (whatsappRequestData.data.text.body.toLocaleLowerCase().trim() !== StandardKeyWord.KILL_SESSION.toLocaleLowerCase()) {
          return false;
        }

        // Vérification de la session
        if (!session) {
          return false;
        }

        // Mise à jour de la session
        await sessionRepository.updateSession(session.id, { is_active: false });

        // Construction du corps du message
        const body = WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          message: StandardMessageEnum.END_SESSION,
          recipientPhone: whatsappRequestData.phone_number
        });

        // Envoi du message via HTTP Service
        await HttpService.post<any>(
            FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                                            .replace(':token', credential.token),
            body
        );

        return true;
    } catch (error) {
        console.error('Error in killSessionWithKeyword:', error);
        throw error;
    }
  }
  

    async botIsNotActive(whatsappRequestData: IWhatsappRequestData, credential: CredentialsDoc): Promise<boolean> {
      try {
        const lastChat = await chatRepository.getLastAdminOfConversation(whatsappRequestData.phone_number, credential.id);
        if (!lastChat) {
          return false;
        }
        
        const difference = HelperMethod.getDifferenceInMinutes(new Date(lastChat?.updatedAt!));
        if (difference > TimeValidSession.TIME_STOP_BOT) {
          console.log('difference > TimeValidSession.TIME_STOP_BOT');
          return false;
        }
        console.log('botIsNotActive ', difference);
        return true;
      } catch (error) {
        console.log('botIsNotActive == ',error);
        throw error
      }
        
    }
  
    public async handleChatbotProcess(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc, conversation: ConversationDoc): Promise<void> {
      try {
        
        const {message, imageUrl} = await this.handleMessage(whatsappRequestData, session, credential, conversation);
        
        await HttpService.post<any>(
          FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                                         .replace(':token', credential.token),
                                         message
        );

        //recuperer les valeurs à jours de credential, session, conversatoin
        const conversationData = await conversationRepository.getById(conversation.id);
        if (!conversationData) {
          throw new Error('conversation not found Exception')
        }
        conversation = conversationData;
        credential = await credentialsRepository.getCredentailByPhoneNumberId(whatsappRequestData.phone_number_id);
        session = await sessionRepository.getMostRecentSession(conversation.id) as SessionDoc;
        if (!session) {
          throw new Error('session not found Exception')
        }

        // Sauvegarde du message utilisateur dans la base de données
        const contentChat = WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
        if (whatsappRequestData.type === TypeWhatsappMessage.IMAGE && imageUrl) {
          conversation = await webhookUtils.addChatInConversation(conversation, ChatOrigin.USER, undefined, imageUrl,  session);
        }

        if (whatsappRequestData.type !== TypeWhatsappMessage.IMAGE && contentChat) {
          conversation = await webhookUtils.addChatInConversation(conversation, ChatOrigin.USER, contentChat, undefined,  session);
        }

       // Sauvegarde du message bot dans la base de données
        const contentMessage = WhatsappHelperMethode.getContentWhasappSendMessage(message);
        const contentText2 = message.type === TypeWhatsappMessage.IMAGE ? undefined : contentMessage;
        const contentUrl2 = whatsappRequestData.type === TypeWhatsappMessage.IMAGE ? contentMessage : undefined;
        await webhookUtils.addChatInConversation(conversation, ChatOrigin.BOT, contentText2, contentUrl2, session);
        
      } catch (error) {
        throw error;
      }
    }
  
    private async handleMessage(whatsappRequestData: IWhatsappRequestData,
      session: SessionDoc | null,
      credential: CredentialsDoc,
      conversation: ConversationDoc):  Promise<{ message: SendWAMessageModel, imageUrl?: string }> {

      try {
        switch (whatsappRequestData.type) {
          case TypeWhatsappMessage.TEXT:
            return { message: await this.handleTextMessage(whatsappRequestData, session, credential, conversation) };
          case TypeWhatsappMessage.INTERACTIVE:
            return { message: await this.handleInteractiveMessage(whatsappRequestData, session, credential, conversation) };
          case TypeWhatsappMessage.IMAGE:
            return await this.handleImageMessage(whatsappRequestData, session, credential, conversation);
          case TypeWhatsappMessage.BUTTON_TEMPLATE:
            return { message: await this.handleButtonTemplateMessage(whatsappRequestData, session, credential, conversation) };
          default:
            return {
              message: WhatsappHelperMethode.bodyBotMessage({
                type: 'text',
                recipientPhone: whatsappRequestData.phone_number,
                message: StandardMessageEnum.INCORECT_KEYWORD
              })
            };
        }
      } catch (error) {
        throw error;
      }
    }
  
    private async handleTextMessage(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc, conversation: ConversationDoc): Promise<SendWAMessageModel> {
      try {
        if (!session) {
          return this.handleInitialUserMessage(whatsappRequestData, credential, conversation);
        }
        
        session = await sessionService.syncronize(session, whatsappRequestData);
        const scenarioItem = await scenarioRepository.findScenarioItemBySession(session);
        return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number, session, credential);
      } catch (error) {
        throw error;
      }
    
    }
  
    private async handleImageMessage(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc, conversation: ConversationDoc): Promise<{ message: SendWAMessageModel, imageUrl?: string }> {
      try {
        if (!session) {
          return {
            message: WhatsappHelperMethode.bodyBotMessage({
              type: 'text',
              recipientPhone: whatsappRequestData.phone_number,
              message: StandardMessageEnum.INCORECT_KEYWORD 
            })
          };
        }
    
        const resUrl = await getUrlWhatsappFile(whatsappRequestData.data.image.id, credential.token);
        const url = await downloadWhatsappFile(resUrl.url,credential.token!, resUrl.mime_type);
        const imageUrl = url;
  
        session = await sessionService.syncronize(session, whatsappRequestData);
        const scenarioItem = await scenarioRepository.findScenarioItemBySession(session);
        const message = await this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number, session, credential);
        return { message, imageUrl };
      } catch (error) {
        throw error;
      }
    }
  
    private async handleInteractiveMessage(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc, conversation: ConversationDoc): Promise<SendWAMessageModel> {
      try {
        if (!session) {
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: whatsappRequestData.phone_number,
            message: StandardMessageEnum.INCORECT_KEYWORD
          });
        }
    
        session = await sessionService.syncronize(session, whatsappRequestData);
        
        const scenarioItem = await scenarioRepository.findScenarioItemBySession(session);
        return await this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number, session, credential);
      } catch (error) {
        throw error;
      }
      
    }
  
    private async handleButtonTemplateMessage(whatsappRequestData: IWhatsappRequestData, session: SessionDoc | null, credential: CredentialsDoc, conversation: ConversationDoc): Promise<SendWAMessageModel> {
      try {
        return WhatsappHelperMethode.bodyBotMessage({type: 'text', message: 'scenario template process. Comming soon...', recipientPhone: whatsappRequestData.phone_number})
      } catch (error) {
        throw error;
      }
      
    }
  
    private async getBodyBotMessageByScenarioItem(scenarioItem: ScenarioItemsDoc | null, phoneNumber: string, session: SessionDoc | null, credential: CredentialsDoc): Promise<SendWAMessageModel> {
      try {
        if (!scenarioItem) {
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: phoneNumber,
            message: StandardMessageEnum.INCOMPLTE_SCENARIO
          });
        }
 
        if (scenarioItem.children.length === 0 && session) {
          session = await sessionRepository.updateSession(session.id, { is_active: false });
          const rapport = await WhatsappHelperMethode.formatRapport(session, credential);
  
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: phoneNumber,
            message: StandardMessageEnum.END_SCENARIO + rapport
          });
        }

        if (scenarioItem.children.length === 0) {
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: phoneNumber,
            message: StandardMessageEnum.END_SCENARIO
          });
        }
    
        const updatedScenarioItem = await scenarioRepository.findScenarioItemWithChildren(scenarioItem);
        const bodyRequest = WhatsappHelperMethode.bodyBotMessageByScenarioItem(updatedScenarioItem, phoneNumber);
        
        if (!bodyRequest) {
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: phoneNumber,
            message: StandardMessageEnum.INCOMPLTE_SCENARIO
          });
        }
    
        return bodyRequest;
      } catch (error) {
        throw error;
      }
    }
  
    private async handleInitialUserMessage(whatsappRequestData: IWhatsappRequestData, credential: CredentialsDoc, conversation: ConversationDoc): Promise<SendWAMessageModel> {
      try {
        const messageContent = WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
        const scenario = await scenarioRepository.findScenarioByKeywordAndPhoneNumberId(messageContent, whatsappRequestData.phone_number_id);
        
        if (!scenario) {
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: whatsappRequestData.phone_number,
            message: StandardMessageEnum.INCORECT_KEYWORD
          });
        } else {
          const scenarioItem = await scenarioRepository.findScenarioItemWithEmptyParents(scenario.id);
          const bodyRequest = await this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number, null, credential);
    
          if (scenarioItem) {
            const session = await sessionRepository.createSession({
              conversation_id: conversation.id,
              current_scenario_item_id: scenarioItem.id,
              is_active: true
            });
          }
    
          return bodyRequest;
        }
      } catch (error) {
        throw error
      }
    
    }
}  

export const webhookService = new WebhookService();
