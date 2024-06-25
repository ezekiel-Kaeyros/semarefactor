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
    private credential?: CredentialsDoc;
    private session?: SessionDoc | null;
    private conversation?: ConversationDoc | null;
    private imageUrl?: string;
  
    public async init(phoneNumberId: string, phoneNumber: string): Promise<void> {
      this.credential = await credentialsRepository.getCredentailByPhoneNumberId(phoneNumberId);
      this.conversation = await webhookUtils.initConversation(phoneNumber, this.credential.id);
      this.session = await sessionRepository.getMostRecentActiveSession(this.conversation.id);
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

    async killSessionWithKeyword(whatsappRequestData: IWhatsappRequestData): Promise<boolean> {
        if (whatsappRequestData.type !== TypeWhatsappMessage.TEXT) {
            return false;
        }

        if (whatsappRequestData.data.text.body.toLocaleLowerCase().trim() !== StandardKeyWord.KILL_SESSION.toLocaleLowerCase()) {
            return false;
        }

        await sessionRepository.updateSession(this.session?.id!, { is_active: false });
        const body = WhatsappHelperMethode.bodyBotMessage({type: 'text', message: StandardMessageEnum.END_SESSION, recipientPhone: whatsappRequestData.phone_number});
        try {
            await HttpService.post<any>(
                FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                                               .replace(':token', this.credential?.token!),
                body
            );
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    async botIsNotActive(whatsappRequestData: IWhatsappRequestData): Promise<boolean> {
        const lastChat = await chatRepository.getLastAdminOfConversation(whatsappRequestData.phone_number, this.credential?.id);
        if (!lastChat) {
            return false;
        }

        const difference = HelperMethod.getDifferenceInMinutes(new Date(lastChat?.updatedAt!));
        if (difference > TimeValidSession.TIME_STOP_BOT) {
            return false;
        }

        return true;
    }
  
    public async handleChatbotProcess(whatsappRequestData: IWhatsappRequestData): Promise<void> {
      const body: SendWAMessageModel = await this.handleMessage(whatsappRequestData);
      
      try {
        await HttpService.post<any>(
          FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                                         .replace(':token', this.credential?.token!),
          body
        );

        // save user message in db
        const contentChat = WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
        if (whatsappRequestData.type === TypeWhatsappMessage.IMAGE && this.imageUrl) {
          this.conversation = await webhookUtils.addChatInConversation(this.conversation!, ChatOrigin.USER, undefined, this.imageUrl,  this.session!);
        }

        if (whatsappRequestData.type !== TypeWhatsappMessage.IMAGE && contentChat) {
          this.conversation = await webhookUtils.addChatInConversation(this.conversation!, ChatOrigin.USER, contentChat, undefined,  this.session!);
        }

        // save bot message in db
        const contentMessage = WhatsappHelperMethode.getContentWhasappSendMessage(body);
        const contentText2 = body.type === TypeWhatsappMessage.IMAGE ? undefined : contentMessage;
        const contentUrl2 = whatsappRequestData.type === TypeWhatsappMessage.IMAGE ? contentMessage : undefined;
        await webhookUtils.addChatInConversation(this.conversation!, ChatOrigin.BOT, contentText2, contentUrl2, this.session!);
        
      } catch (error) {
        throw error;
      }
    }
  
    private async handleMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      switch (whatsappRequestData.type) {
        case TypeWhatsappMessage.TEXT:
          return this.handleTextMessage(whatsappRequestData);
        case TypeWhatsappMessage.INTERACTIVE:
          return this.handleInteractiveMessage(whatsappRequestData);
        case TypeWhatsappMessage.IMAGE:
          return this.handleImageMessage(whatsappRequestData);
        case TypeWhatsappMessage.BUTTON_TEMPLATE:
          return this.handleButtonTemplateMessage(whatsappRequestData);
        default:
          return WhatsappHelperMethode.bodyBotMessage({
            type: 'text',
            recipientPhone: whatsappRequestData.phone_number,
            message: StandardMessageEnum.INCORECT_KEYWORD
          });
      }
    }
  
    private async handleTextMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      if (!this.session) {
        return this.handleInitialUserMessage(whatsappRequestData);
      }
      this.session = await sessionService.syncronize(this.session, whatsappRequestData);
      const scenarioItem = await scenarioRepository.findScenarioItemBySession(this.session);
      return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
    }
  
    private async handleImageMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      if (!this.session) {
        return WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          recipientPhone: whatsappRequestData.phone_number,
          message: StandardMessageEnum.INCORECT_KEYWORD 
        });
      }
  
      const resUrl = await getUrlWhatsappFile(whatsappRequestData.data.image.id, this.credential?.token!);
      const url = await downloadWhatsappFile(resUrl.url, this.credential?.token!, resUrl.mime_type);
      this.imageUrl = url;

      this.session = await sessionService.syncronize(this.session, whatsappRequestData);
      const scenarioItem = await scenarioRepository.findScenarioItemBySession(this.session);
      return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
    }
  
    private async handleInteractiveMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      
      if (!this.session) {
        return WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          recipientPhone: whatsappRequestData.phone_number,
          message: StandardMessageEnum.INCORECT_KEYWORD
        });
      }
  
      this.session = await sessionService.syncronize(this.session, whatsappRequestData);
      
      const scenarioItem = await scenarioRepository.findScenarioItemBySession(this.session);
      return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
    }
  
    private async handleButtonTemplateMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      return this.handleInitialUserMessage(whatsappRequestData);
    }
  
    private async getBodyBotMessageByScenarioItem(scenarioItem: ScenarioItemsDoc | null, phoneNumber: string): Promise<SendWAMessageModel> {
      if (!scenarioItem) {
        return WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          recipientPhone: phoneNumber,
          message: StandardMessageEnum.INCOMPLTE_SCENARIO
        });
      }
      
      if (scenarioItem.children.length === 0) {
        this.session = await sessionRepository.updateSession(this.session?.id!, { is_active: false });
        const rapport = await WhatsappHelperMethode.formatRapport(this.session!, this.credential!);

        return WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          recipientPhone: phoneNumber,
          message: StandardMessageEnum.END_SCENARIO + rapport
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
    }
  
    private async handleInitialUserMessage(whatsappRequestData: IWhatsappRequestData): Promise<SendWAMessageModel> {
      const messageContent = WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
      const scenario = await scenarioRepository.findScenarioByKeywordAndPhoneNumberId(messageContent, whatsappRequestData.phone_number_id);
      
      if (!scenario) {
        return WhatsappHelperMethode.bodyBotMessage({
          type: 'text',
          recipientPhone: whatsappRequestData.phone_number,
          message: StandardMessageEnum.INCORECT_KEYWORD
        });
      } else {
        const scenarioItem = await scenarioRepository.findScenarioItemWithEmptyParents(scenario.id!);
        const bodyRequest = await this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
  
        if (scenarioItem) {
          this.session = await sessionRepository.createSession({
            conversation_id: this.conversation?.id!,
            current_scenario_item_id: scenarioItem.id,
            is_active: true
          });
        }
  
        return bodyRequest;
      }
    }
  
    // Method to destroy the instance
    public destroy(): void {
      this.credential = undefined;
      this.session = null;
      this.conversation = null;
      this.imageUrl = undefined;
    }
}  

export const webhookService = new WebhookService();
