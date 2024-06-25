"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSendWhatsappMessage = exports.TypeWhatsappMessage = void 0;
var TypeWhatsappMessage;
(function (TypeWhatsappMessage) {
    TypeWhatsappMessage["BUTTON_REPLY"] = "button_reply";
    TypeWhatsappMessage["TEXT"] = "text";
    TypeWhatsappMessage["LIST_REPLY"] = "list_reply";
    TypeWhatsappMessage["INTERACTIVE"] = "interactive";
    TypeWhatsappMessage["IMAGE"] = "image";
    TypeWhatsappMessage["BUTTON_TEMPLATE"] = "button";
})(TypeWhatsappMessage || (exports.TypeWhatsappMessage = TypeWhatsappMessage = {}));
var TypeSendWhatsappMessage;
(function (TypeSendWhatsappMessage) {
    TypeSendWhatsappMessage["BUTTON"] = "button";
    TypeSendWhatsappMessage["TEXT"] = "text";
    TypeSendWhatsappMessage["LIST"] = "list";
    TypeSendWhatsappMessage["INTERACTIVE"] = "interactive";
    TypeSendWhatsappMessage["IMAGE"] = "image";
    TypeSendWhatsappMessage["CATALOGUE"] = "catalog_message";
})(TypeSendWhatsappMessage || (exports.TypeSendWhatsappMessage = TypeSendWhatsappMessage = {}));
