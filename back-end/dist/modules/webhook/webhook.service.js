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
exports.webhookService = void 0;
// webhookService.ts
const message_enum_1 = require("../../core/enums/message.enum");
const scenario_enum_1 = require("../../core/enums/scenario.enum");
const http_service_1 = __importDefault(require("../../core/utiles/http.service"));
const upload_file_from_webhook_1 = require("../../core/utiles/upload-file-from-webhook");
const whatsapp_helper_method_1 = require("../../core/utiles/whatsapp-helper-method");
const credential_repository_1 = require("../credential/credential.repository");
const scenario_repository_1 = require("../scenario/scenario.repository");
const session_repository_1 = require("../session/session.repository");
const session_service_1 = require("../session/session.service");
const facebook_webservice_1 = require("../../core/enums/facebook-webservice");
const webhook_utils_1 = require("./webhook.utils");
const chat_repository_1 = require("../chat/chat.repository");
const helper_method_1 = require("../../core/utiles/helper-method");
class WebhookService {
    init(phoneNumberId, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.credential = yield credential_repository_1.credentialsRepository.getCredentailByPhoneNumberId(phoneNumberId);
            this.conversation = yield webhook_utils_1.webhookUtils.initConversation(phoneNumber, this.credential.id);
            this.session = yield session_repository_1.sessionRepository.getMostRecentActiveSession(this.conversation.id);
        });
    }
    verifyToken(mode, verifyToken, challenge) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield credential_repository_1.credentialsRepository.getByVerifyToken(verifyToken);
            if (mode && verifyToken && credentials) {
                if (mode === "subscribe" && verifyToken === credentials.verify_token) {
                    return { status: 200, message: challenge };
                }
                else {
                    return { status: 403 };
                }
            }
            return { status: 403 };
        });
    }
    killSessionWithKeyword(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (whatsappRequestData.type !== scenario_enum_1.TypeWhatsappMessage.TEXT) {
                return false;
            }
            if (whatsappRequestData.data.text.body.toLocaleLowerCase().trim() !== message_enum_1.StandardKeyWord.KILL_SESSION.toLocaleLowerCase()) {
                return false;
            }
            yield session_repository_1.sessionRepository.updateSession((_a = this.session) === null || _a === void 0 ? void 0 : _a.id, { is_active: false });
            const body = whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({ type: 'text', message: message_enum_1.StandardMessageEnum.END_SESSION, recipientPhone: whatsappRequestData.phone_number });
            try {
                yield http_service_1.default.post(facebook_webservice_1.FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                    .replace(':token', (_b = this.credential) === null || _b === void 0 ? void 0 : _b.token), body);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    botIsNotActive(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const lastChat = yield chat_repository_1.chatRepository.getLastAdminOfConversation(whatsappRequestData.phone_number, (_a = this.credential) === null || _a === void 0 ? void 0 : _a.id);
            if (!lastChat) {
                return false;
            }
            const difference = helper_method_1.HelperMethod.getDifferenceInMinutes(new Date(lastChat === null || lastChat === void 0 ? void 0 : lastChat.updatedAt));
            if (difference > message_enum_1.TimeValidSession.TIME_STOP_BOT) {
                return false;
            }
            return true;
        });
    }
    handleChatbotProcess(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = yield this.handleMessage(whatsappRequestData);
            try {
                yield http_service_1.default.post(facebook_webservice_1.FacebookWebService.SEND_MESSAGE.replace(':phone_number_id', whatsappRequestData.phone_number_id)
                    .replace(':token', (_a = this.credential) === null || _a === void 0 ? void 0 : _a.token), body);
                // save user message in db
                const contentChat = whatsapp_helper_method_1.WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
                if (whatsappRequestData.type === scenario_enum_1.TypeWhatsappMessage.IMAGE && this.imageUrl) {
                    this.conversation = yield webhook_utils_1.webhookUtils.addChatInConversation(this.conversation, message_enum_1.ChatOrigin.USER, undefined, this.imageUrl);
                }
                if (whatsappRequestData.type !== scenario_enum_1.TypeWhatsappMessage.IMAGE && contentChat) {
                    this.conversation = yield webhook_utils_1.webhookUtils.addChatInConversation(this.conversation, message_enum_1.ChatOrigin.USER, contentChat, undefined);
                }
                // save bot message in db
                const contentMessage = whatsapp_helper_method_1.WhatsappHelperMethode.getContentWhasappSendMessage(body);
                const contentText2 = body.type === scenario_enum_1.TypeWhatsappMessage.IMAGE ? undefined : contentMessage;
                const contentUrl2 = whatsappRequestData.type === scenario_enum_1.TypeWhatsappMessage.IMAGE ? contentMessage : undefined;
                yield webhook_utils_1.webhookUtils.addChatInConversation(this.conversation, message_enum_1.ChatOrigin.BOT, contentText2, contentUrl2);
            }
            catch (error) {
                throw error;
            }
        });
    }
    handleMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (whatsappRequestData.type) {
                case scenario_enum_1.TypeWhatsappMessage.TEXT:
                    return this.handleTextMessage(whatsappRequestData);
                case scenario_enum_1.TypeWhatsappMessage.INTERACTIVE:
                    return this.handleInteractiveMessage(whatsappRequestData);
                case scenario_enum_1.TypeWhatsappMessage.IMAGE:
                    return this.handleImageMessage(whatsappRequestData);
                case scenario_enum_1.TypeWhatsappMessage.BUTTON_TEMPLATE:
                    return this.handleButtonTemplateMessage(whatsappRequestData);
                default:
                    return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                        type: 'text',
                        recipientPhone: whatsappRequestData.phone_number,
                        message: message_enum_1.StandardMessageEnum.INCORECT_KEYWORD
                    });
            }
        });
    }
    handleTextMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.session) {
                return this.handleInitialUserMessage(whatsappRequestData);
            }
            this.session = yield session_service_1.sessionService.syncronize(this.session, whatsappRequestData);
            const scenarioItem = yield scenario_repository_1.scenarioRepository.findScenarioItemBySession(this.session);
            return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
        });
    }
    handleImageMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.session) {
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: whatsappRequestData.phone_number,
                    message: message_enum_1.StandardMessageEnum.INCORECT_KEYWORD
                });
            }
            const resUrl = yield (0, upload_file_from_webhook_1.getUrlWhatsappFile)(whatsappRequestData.data.image.id, (_a = this.credential) === null || _a === void 0 ? void 0 : _a.token);
            const url = yield (0, upload_file_from_webhook_1.downloadWhatsappFile)(resUrl.url, (_b = this.credential) === null || _b === void 0 ? void 0 : _b.token, resUrl.mime_type);
            this.imageUrl = url;
            this.session = yield session_service_1.sessionService.syncronize(this.session, whatsappRequestData);
            const scenarioItem = yield scenario_repository_1.scenarioRepository.findScenarioItemBySession(this.session);
            return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
        });
    }
    handleInteractiveMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.session) {
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: whatsappRequestData.phone_number,
                    message: message_enum_1.StandardMessageEnum.INCORECT_KEYWORD
                });
            }
            this.session = yield session_service_1.sessionService.syncronize(this.session, whatsappRequestData);
            const scenarioItem = yield scenario_repository_1.scenarioRepository.findScenarioItemBySession(this.session);
            return this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
        });
    }
    handleButtonTemplateMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleInitialUserMessage(whatsappRequestData);
        });
    }
    getBodyBotMessageByScenarioItem(scenarioItem, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!scenarioItem) {
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: phoneNumber,
                    message: message_enum_1.StandardMessageEnum.INCOMPLTE_SCENARIO
                });
            }
            if (scenarioItem.children.length === 0) {
                yield session_repository_1.sessionRepository.updateSession((_a = this.session) === null || _a === void 0 ? void 0 : _a.id, { is_active: false });
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: phoneNumber,
                    message: message_enum_1.StandardMessageEnum.END_SCENARIO
                });
            }
            const updatedScenarioItem = yield scenario_repository_1.scenarioRepository.findScenarioItemWithChildren(scenarioItem);
            const bodyRequest = whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessageByScenarioItem(updatedScenarioItem, phoneNumber);
            if (!bodyRequest) {
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: phoneNumber,
                    message: message_enum_1.StandardMessageEnum.INCOMPLTE_SCENARIO
                });
            }
            return bodyRequest;
        });
    }
    handleInitialUserMessage(whatsappRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const messageContent = whatsapp_helper_method_1.WhatsappHelperMethode.getContentMessageData(whatsappRequestData);
            const scenario = yield scenario_repository_1.scenarioRepository.findScenarioByKeywordAndPhoneNumberId(messageContent, whatsappRequestData.phone_number_id);
            if (!scenario) {
                return whatsapp_helper_method_1.WhatsappHelperMethode.bodyBotMessage({
                    type: 'text',
                    recipientPhone: whatsappRequestData.phone_number,
                    message: message_enum_1.StandardMessageEnum.INCORECT_KEYWORD
                });
            }
            else {
                const scenarioItem = yield scenario_repository_1.scenarioRepository.findScenarioItemWithEmptyParents(scenario.id);
                const bodyRequest = yield this.getBodyBotMessageByScenarioItem(scenarioItem, whatsappRequestData.phone_number);
                if (scenarioItem) {
                    this.session = yield session_repository_1.sessionRepository.createSession({
                        conversation_id: (_a = this.conversation) === null || _a === void 0 ? void 0 : _a.id,
                        current_scenario_item_id: scenarioItem.id,
                        is_active: true
                    });
                }
                return bodyRequest;
            }
        });
    }
    // Method to destroy the instance
    destroy() {
        this.credential = undefined;
        this.session = null;
        this.conversation = null;
        this.imageUrl = undefined;
    }
}
exports.webhookService = new WebhookService();
