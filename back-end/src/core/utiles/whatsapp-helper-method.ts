import { title } from "process";
import { ScenarioItemsDoc } from "../modeles/scenario-item.model";
import { ButtonContent, IWhatsappRequestData, SendWAButtonModel, SendWACatalogModel, SendWAImageModel, SendWAListModel, SendWAMessageModel, SendWAProductsTemplateModel, SendWATextModel, WAButtons, WACatalog, WAImage, WAList, WARecipient, WATemplate, WAText } from "../modeles/whatsapp.model";
import { TypeSendWhatsappMessage, TypeWhatsappMessage } from "../enums/scenario.enum";
import { SessionDoc } from "../modeles/session.model";
import { chatRepository } from "../../modules/chat/chat.repository";
import { ChatOrigin } from "../enums/message.enum";
import { CredentialsDoc } from "../modeles/credential.model";
import { StandardMessageEnum } from "../enums/message.enum";

export class WhatsappHelperMethode {

    static formatWhatsappMessage(data: any): IWhatsappRequestData {
        const whatsappRequestData: IWhatsappRequestData = {
            phone_number_id: data.entry[0].changes[0].value.metadata.phone_number_id,
            phone_number: data.entry[0].changes[0].value.messages[0].from,
            name: data.entry[0].changes[0].value.contacts[0].profile.name,
            type: data.entry[0].changes[0].value.messages[0].type,
            data: data.entry[0].changes[0].value.messages[0],
            id: data.entry[0].changes[0].value.messages[0].id
        };
        return whatsappRequestData;
    }

    static contentMessageIsValid(data: any): boolean {
        return ( data.entry &&
            data.entry[0].changes &&
            data.entry[0].changes[0] &&
            data.entry[0].changes[0].value.messages &&
            data.entry[0].changes[0].value.messages[0]);
    }

    /** 
     * Format le body du message envoyé par le bot a partir du scenario_item
     */
    static bodyBotMessageByScenarioItem(scenarioItem: ScenarioItemsDoc, phone_number: string): SendWAMessageModel | undefined {
        try {
            let recipient: WARecipient | undefined;
            if (!scenarioItem.childrenDetails) {
                return WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: phone_number,
                    message: StandardMessageEnum.INCOMPLTE_SCENARIO
                });
            }

            switch (scenarioItem.type) {
                case 'text':
                    recipient = {type: 'text', message: scenarioItem.childrenDetails[0].label!, recipientPhone: phone_number}
                    break;
                case 'button':
                    recipient = {type: 'button', message: scenarioItem.label!, recipientPhone: phone_number, listOfButtons: scenarioItem.childrenDetails?.map(item => (
                        {id: item._id, title: item.label!} as ButtonContent
                    )) ?? []}
                    break;
                case 'list':
                    recipient = {type: 'list', message: scenarioItem.label!, recipientPhone: phone_number, listOfSections: scenarioItem.childrenDetails?.map(item => (
                        {id: item._id, title: item.label!} as ButtonContent
                    )) ?? []}
                    break;
                case 'image':
                    recipient = {type: 'image', link: scenarioItem.childrenDetails[0].url!, recipientPhone: phone_number}
                    break;
                default:
                    throw new Error('type message not found');
            }
           
            return this.bodyBotMessage(recipient);
           
        } catch (error) {
            throw error
        }
        
    }

    /**
     * Format le body qui sera envoyé par le bot comme message
     * @param data 
     */
    static bodyBotMessage(data: WARecipient): SendWAMessageModel {
        switch (data.type) {
            case 'text':
                return this.textMessage(data)
            case 'button':
                return this.buttonsMessage(data)
            case 'catalog':
                return this.catalogMessage(data)
            case 'list':
                return this.listMessage(data)
            case 'image':
                return this.imageMessage(data)
            case 'template':
                return this.productsTemplateMessage(data)
            default:
                throw new Error ('Type not found');
        }
    }


    /**
     * debut des methodes de formatage du body des messages qui seront envoyé par le bot
    */
    static textMessage(data: WAText): SendWATextModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "text",
            text: {
                body: data.message
            },
        };
    };
    
    static imageMessage(data: WAImage): SendWAImageModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "image",
            image: {
                link : data.link
            }
        };
    };
    
    static buttonsMessage(data: WAButtons): SendWAButtonModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: data.message
                },
                action: {
                    buttons: data.listOfButtons.map(button => {
                        return {
                            type: "reply",
                            reply: {
                                id: button.id,
                                title: button.title
                            }
                        };
                    })
                }
            }
        };
    };
    
    static listMessage(data: WAList): SendWAListModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "interactive",
            interactive: {
                type: "list",
                body: {
                    text: data.message
                },
                action: {
                    button: "Votre choix",
                    sections: [
                        {
                            title: "Title section",
                            rows: data.listOfSections
                        }
                    ]
                }
            }
        };
    };
    
    static productsTemplateMessage(data: WATemplate): SendWAProductsTemplateModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "template",
            template: {
                name: data.name,
                language: {
                    code: "fr"
                },
                components: [
                    {
                        type: "button",
                        sub_type: "mpm",
                        index: 0,
                        parameters: [
                            {
                                type: "action",
                                action: data.action
                            }
                        ]
                    }
                ]
            }
        };
    };
    
    static catalogMessage(data: WACatalog): SendWACatalogModel {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "interactive",
            interactive: {
                type: "catalog_message",
                body: {
                    text: data.message
                },
                action: {
                    name: data.catalog_name,
                    
                    /* Parameters object is optional */
                    parameters: {
                    thumbnail_product_retailer_id: "wctwvujzeg"
                    }
                },
            
                /* Footer object is optional */
                footer: {
                    text: "Best grocery deals on WhatsApp!"
                }
            }
        };
    };

    /**
     * fin des methodes de formatage du body des messages qui seront envoyé par le bot
    */


    static getContentMessageData(waResponse: IWhatsappRequestData): string {
        let message = '';
        if (waResponse.type === "text") {
            message = waResponse.data.text.body.trim();
        } else if (waResponse.type === "button") {
            message = waResponse.data.button.text.trim();
        } else if (waResponse.type === "interactive" && waResponse.data.interactive.type === "button_reply") {
            message = waResponse.data.interactive.button_reply.title;
        } else if (waResponse.type === "interactive" && waResponse.data.interactive.type === "list_reply") {
            message = waResponse.data.interactive.list_reply.title;
        }
        return message
    }

    static getContentWhasappSendMessage(sendWAMessageModel: SendWAMessageModel): string {
        switch (sendWAMessageModel.type) {
            case TypeSendWhatsappMessage.TEXT:
                return sendWAMessageModel.text?.body || '';

            case TypeSendWhatsappMessage.IMAGE:
                return sendWAMessageModel.image?.link || '';

            case TypeSendWhatsappMessage.INTERACTIVE:
                return this.interactiveMessage(sendWAMessageModel);

            default:
                return '';
        }
    }

    private static interactiveMessage(sendWAMessageModel: SendWAButtonModel | SendWAListModel | SendWACatalogModel): string {
        const interactive = sendWAMessageModel.interactive;

        if (!interactive) {
            return '';
        }

        switch (interactive.type) {
            case TypeSendWhatsappMessage.BUTTON:
                return this.formatButtonMessage(interactive);

            case TypeSendWhatsappMessage.LIST:
                return this.formatListMessage(interactive);

            default:
                return '';
        }
    }

    private static formatButtonMessage(interactive: any): string {
        const buttons = interactive.action.buttons || [];
        const text = interactive.body.text;
        const formattedButtons = buttons.map((button: any) => `- ${button.reply.title}\n`).join('');
        return `${text}\nVotre choix:\n${formattedButtons}`;
    }

    private static formatListMessage(interactive: any): string {
        const sections = interactive.action.sections || [];
        const text = interactive.body.text;
        const button = interactive.action.button;

        const formattedSections = sections.map((section: any) => {
            const rows = section.rows.map((row: any) => `- ${row.title}\n`).join('');
            return `${section.title}\n  ${rows}`;
        }).join('');

        return `${text}\n${button}:\n${formattedSections}`;
    }

    public static async formatRapport(session: SessionDoc, credential: CredentialsDoc): Promise<string> {
        try {
            const chatFlows = session.chat_flow ?? [];
            const messages: string[] = [];
        
            for (const chatFlow of chatFlows) {
                if (chatFlow.to_display) {
                    try {
                        const chat = await chatRepository.getById(chatFlow.chatId);
                        if (chat) {
                            const sender = chat.origin === ChatOrigin.USER ? 'Moi: ' : `${credential.company}: `;
                            const text = chat.text ?? '';
                            const url = chat.url ?? '';
                            messages.push(`${sender}${text}\n${url}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching chat with ID ${chatFlow.chatId}:`, error);
                    }
                }
            }
        
            return messages.join('\n');
        } catch (error) {
            throw error
        }
       
    }
}