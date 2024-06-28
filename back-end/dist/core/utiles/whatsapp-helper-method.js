"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappHelperMethode = void 0;
const scenario_enum_1 = require("../enums/scenario.enum");
const message_enum_1 = require("../enums/message.enum");
class WhatsappHelperMethode {
    static formatWhatsappMessage(data) {
        const whatsappRequestData = {
            phone_number_id: data.entry[0].changes[0].value.metadata.phone_number_id,
            phone_number: data.entry[0].changes[0].value.messages[0].from,
            name: data.entry[0].changes[0].value.contacts[0].profile.name,
            type: data.entry[0].changes[0].value.messages[0].type,
            data: data.entry[0].changes[0].value.messages[0],
            id: data.entry[0].changes[0].value.messages[0].id
        };
        return whatsappRequestData;
    }
    static contentMessageIsValid(data) {
        return (data.entry &&
            data.entry[0].changes &&
            data.entry[0].changes[0] &&
            data.entry[0].changes[0].value.messages &&
            data.entry[0].changes[0].value.messages[0]);
    }
    /**
     * Format le body du message envoyé par le bot a partir du scenario_item
     */
    static bodyBotMessageByScenarioItem(scenarioItem, phone_number) {
        var _a, _b, _c, _d;
        let recipient;
        if (!scenarioItem.childrenDetails) {
            return WhatsappHelperMethode.bodyBotMessage({
                type: 'text',
                recipientPhone: phone_number,
                message: message_enum_1.StandardMessageEnum.INCOMPLTE_SCENARIO
            });
        }
        switch (scenarioItem.type) {
            case 'text':
                recipient = { type: 'text', message: scenarioItem.childrenDetails[0].label, recipientPhone: phone_number };
                break;
            case 'button':
                recipient = { type: 'button', message: scenarioItem.label, recipientPhone: phone_number, listOfButtons: (_b = (_a = scenarioItem.childrenDetails) === null || _a === void 0 ? void 0 : _a.map(item => ({ id: item._id, title: item.label }))) !== null && _b !== void 0 ? _b : [] };
                break;
            case 'list':
                recipient = { type: 'list', message: scenarioItem.label, recipientPhone: phone_number, listOfSections: (_d = (_c = scenarioItem.childrenDetails) === null || _c === void 0 ? void 0 : _c.map(item => ({ id: item._id, title: item.label }))) !== null && _d !== void 0 ? _d : [] };
                break;
            case 'image':
                recipient = { type: 'image', link: scenarioItem.childrenDetails[0].url, recipientPhone: phone_number };
                break;
            default:
                break;
        }
        if (recipient) {
            return this.bodyBotMessage(recipient);
        }
        else {
            return undefined;
        }
    }
    /**
     * Format le body qui sera envoyé par le bot comme message
     * @param data
     */
    static bodyBotMessage(data) {
        switch (data.type) {
            case 'text':
                return this.textMessage(data);
            case 'button':
                return this.buttonsMessage(data);
            case 'catalog':
                return this.catalogMessage(data);
            case 'list':
                return this.listMessage(data);
            case 'image':
                return this.imageMessage(data);
            case 'template':
                return this.productsTemplateMessage(data);
            default:
                return this.textMessage(data);
        }
    }
    /**
     * debut des methodes de formatage du body des messages qui seront envoyé par le bot
    */
    static textMessage(data) {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "text",
            text: {
                body: data.message
            },
        };
    }
    ;
    static imageMessage(data) {
        return {
            messaging_product: "whatsapp",
            to: data.recipientPhone,
            type: "image",
            image: {
                link: data.link
            }
        };
    }
    ;
    static buttonsMessage(data) {
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
    }
    ;
    static listMessage(data) {
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
    }
    ;
    static productsTemplateMessage(data) {
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
    }
    ;
    static catalogMessage(data) {
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
    }
    ;
    /**
     * fin des methodes de formatage du body des messages qui seront envoyé par le bot
    */
    static getContentMessageData(waResponse) {
        let message = '';
        if (waResponse.type === "text") {
            message = waResponse.data.text.body.trim();
        }
        else if (waResponse.type === "button") {
            message = waResponse.data.button.text.trim();
        }
        else if (waResponse.type === "interactive" && waResponse.data.interactive.type === "button_reply") {
            message = waResponse.data.interactive.button_reply.title;
        }
        else if (waResponse.type === "interactive" && waResponse.data.interactive.type === "list_reply") {
            message = waResponse.data.interactive.list_reply.title;
        }
        return message;
    }
    static getContentWhasappSendMessage(sendWAMessageModel) {
        var _a, _b;
        switch (sendWAMessageModel.type) {
            case scenario_enum_1.TypeSendWhatsappMessage.TEXT:
                return ((_a = sendWAMessageModel.text) === null || _a === void 0 ? void 0 : _a.body) || '';
            case scenario_enum_1.TypeSendWhatsappMessage.IMAGE:
                return ((_b = sendWAMessageModel.image) === null || _b === void 0 ? void 0 : _b.link) || '';
            case scenario_enum_1.TypeSendWhatsappMessage.INTERACTIVE:
                return this.interactiveMessage(sendWAMessageModel);
            default:
                return '';
        }
    }
    static interactiveMessage(sendWAMessageModel) {
        const interactive = sendWAMessageModel.interactive;
        if (!interactive) {
            return '';
        }
        switch (interactive.type) {
            case scenario_enum_1.TypeSendWhatsappMessage.BUTTON:
                return this.formatButtonMessage(interactive);
            case scenario_enum_1.TypeSendWhatsappMessage.LIST:
                return this.formatListMessage(interactive);
            default:
                return '';
        }
    }
    static formatButtonMessage(interactive) {
        const buttons = interactive.action.buttons || [];
        const text = interactive.body.text;
        const formattedButtons = buttons.map((button) => `- ${button.reply.title}\n`).join('');
        return `${text}\nVotre choix:\n${formattedButtons}`;
    }
    static formatListMessage(interactive) {
        const sections = interactive.action.sections || [];
        const text = interactive.body.text;
        const button = interactive.action.button;
        const formattedSections = sections.map((section) => {
            const rows = section.rows.map((row) => `- ${row.title}\n`).join('');
            return `${section.title}\n  ${rows}`;
        }).join('');
        return `${text}\n${button}:\n${formattedSections}`;
    }
}
exports.WhatsappHelperMethode = WhatsappHelperMethode;
