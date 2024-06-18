export interface IWhatsappRequestData {
    phone_number_id: string;
    phone_number: string;
    name: string;
    type: string;
    data: any;
    id: string;
}

type ProductItem = {
    product_retailer_id: string;
};

type Section = {
    title: string;
    product_items: ProductItem[];
};

export type TemplateAction = {
    thumbnail_product_retailer_id: string;
    sections: Section[];
};

export type ButtonContent = {
    id: string;
    title: string;
    description?: string;
};

export type WAText = {
    type: 'text',
    recipientPhone: string;
    message: string;
};

export type WAButtons = {
    type: 'button',
    recipientPhone: string;
    message: string;
    listOfButtons: ButtonContent[];
};

export type WAList = {
    type: 'list',
    recipientPhone: string;
    message: string;
    listOfSections: ButtonContent[]
};

export type WAImage = {
    type: 'image',
    recipientPhone: string;
    link: string;
};

export type WATemplate = {
    type: 'template',
    recipientPhone: string;
    name: string;
    action: TemplateAction;
};

export type WACatalog = {
    type: 'catalog',
    recipientPhone: string;
    message: string;
    catalog_name: string;
}

export type WARecipient = WACatalog | WATemplate | WAImage | WAList | WAButtons | WAText

export type SendWATextModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "text",
    text: {
        body: string
    }
    recipient_type?: string,
};

export type SendWAMessageModel = SendWATextModel | SendWAButtonModel | SendWAListModel | SendWAProductsTemplateModel | SendWAImageModel | SendWATemplateModel | SendWACatalogModel;

type actionButtonsModel = {
    type: "reply",
    reply: ButtonContent
};

export type SendWAButtonModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "interactive",
    interactive: {
        type: "button",
        body: {
            text: string
        },
        action: {
            buttons: actionButtonsModel[]
        }
    }
};

export type SendWAListModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "interactive",
    interactive: {
        type: "list",
        body: {
            text: string
        },
        action: {
            button: "Votre choix",
            sections: [
                {
                    title: "Title section",
                    rows: ButtonContent[]
                }
            ]
        }
    }
};

export type SendWAImageModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "image",
    image: {
        link : string
    }
};

export type SendWAProductsTemplateModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "template",
    template: {
        name: string,
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
                        action: TemplateAction
                    }
                ]
            }
        ]
    }
};

export type SendWATemplateModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "template",
    template: {
        name: string,
        language: {
            code: "fr"
        },
        components: [
            {
                type: string,
                sub_type?: "mpm",
                index?: number,
                parameters: any[]
            }
        ]
    }
};

export type SendWACatalogModel = {
    messaging_product: "whatsapp",
    to: string,
    type: "interactive",
    interactive: {
        type: "catalog_message",
        body: {
            text: string
        },
        action: {
            name: string,
            
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
