"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardKeyWord = exports.TimeValidSession = exports.ChatOrigin = exports.StandardMessageEnum = void 0;
var StandardMessageEnum;
(function (StandardMessageEnum) {
    StandardMessageEnum["INCORECT_KEYWORD"] = "Mot cl\u00E9 incorrect, vous ne disposez pas du bon mot cl\u00E9 pour participer \u00E0 cette campagne.";
    StandardMessageEnum["INCOMPLTE_SCENARIO"] = "Ce sc\u00E9nario est incomplet";
    StandardMessageEnum["END_SCENARIO"] = "Merci pour cette echange, ci dessous le resum\u00E9 de notre echange.\n Coming soon...";
    StandardMessageEnum["INACTIVE_SESSION"] = "Cette session n'est plus en cours.";
    StandardMessageEnum["END_SESSION"] = "Session termin\u00E9.";
})(StandardMessageEnum || (exports.StandardMessageEnum = StandardMessageEnum = {}));
var ChatOrigin;
(function (ChatOrigin) {
    ChatOrigin["BOT"] = "bot";
    ChatOrigin["ADMIN"] = "admin";
    ChatOrigin["USER"] = "user";
})(ChatOrigin || (exports.ChatOrigin = ChatOrigin = {}));
var TimeValidSession;
(function (TimeValidSession) {
    TimeValidSession[TimeValidSession["WHATSAPP_VALIDITY_MINUTE"] = 1440] = "WHATSAPP_VALIDITY_MINUTE";
    TimeValidSession[TimeValidSession["TIME_STOP_BOT"] = 10] = "TIME_STOP_BOT";
})(TimeValidSession || (exports.TimeValidSession = TimeValidSession = {}));
var StandardKeyWord;
(function (StandardKeyWord) {
    StandardKeyWord["KILL_SESSION"] = "Kill";
})(StandardKeyWord || (exports.StandardKeyWord = StandardKeyWord = {}));
