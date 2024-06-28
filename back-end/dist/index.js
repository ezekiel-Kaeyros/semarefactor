"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("./core/config/logging");
require("reflect-metadata");
const connection_1 = __importDefault(require("./core/database/connection"));
// import routes from './routes';
const route_1 = require("./core/routes/route");
const errorHandler_1 = __importDefault(require("./core/middlewares/errorHandler"));
const declareHandler_1 = require("./core/middlewares/declareHandler");
const credential_controller_1 = __importDefault(require("./modules/credential/credential.controller"));
const webhook_controller_1 = __importDefault(require("./modules/webhook/webhook.controller"));
const scenario_controller_1 = __importDefault(require("./modules/scenario/scenario.controller"));
const conversation_controller_1 = __importDefault(require("./modules/conversation/conversation.controller"));
const usersema_controller_1 = __importDefault(require("./modules/usersema/usersema.controller"));
const scenario_item_controller_1 = __importDefault(require("./modules/scenario-item/scenario-item.controller"));
const template_scenario_contoller_1 = __importDefault(require("./modules/template-scenario/template-scenario.contoller"));
const chat_controller_1 = __importDefault(require("./modules/chat/chat.controller"));
const user_controller_1 = __importDefault(require("./modules/user/user.controller"));
const booking_controller_1 = __importDefault(require("./modules/booking/booking.controller"));
const category_booking_controller_1 = __importDefault(require("./modules/category-booking/category-booking.controller"));
const service_booking_controller_1 = __importDefault(require("./modules/service-booking/service-booking.controller"));
const company_hour_service_controller_1 = __importDefault(require("./modules/company-hour-service/company-hour-service.controller"));
const company_creneau_controller_1 = __importDefault(require("./modules/company-creneau/company-creneau.controller"));
dotenv_1.default.config();
console.log(process.env.DATABASE_URL_DEV);
(0, connection_1.default)();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
const httpServer = (0, http_1.createServer)(exports.app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// Vérifier et créer le dossier uploads s'il n'existe pas
const uploadDir = path_1.default.join(__dirname, '..', 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
exports.app.get('/', (req, res) => { console.log('App start xx'); return res.send('App startx'); });
exports.app.use('/uploads', express_1.default.static(uploadDir));
exports.app.use(declareHandler_1.declareHandler);
// app.use('/', routes);
(0, route_1.defineRoutes)([
    webhook_controller_1.default,
    credential_controller_1.default,
    scenario_controller_1.default,
    scenario_item_controller_1.default,
    conversation_controller_1.default,
    usersema_controller_1.default,
    template_scenario_contoller_1.default,
    chat_controller_1.default,
    user_controller_1.default,
    booking_controller_1.default,
    category_booking_controller_1.default,
    service_booking_controller_1.default,
    company_hour_service_controller_1.default,
    company_creneau_controller_1.default
], exports.app);
exports.app.use(errorHandler_1.default);
exports.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const Shutdown = (callback) => httpServer && httpServer.close(callback);
exports.Shutdown = Shutdown;
