"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declareHandler = void 0;
function declareHandler(req, res, next) {
    req.mongoGet = undefined;
    req.mongoGetAll = [];
    req.mongoGetAlls = [];
    req.mongoCreate = undefined;
    req.mongoUpdate = undefined;
    req.mongoQuery = [];
    req.mongoAuthRes = undefined;
    req.mongoUPloadFileRes = undefined;
    next();
}
exports.declareHandler = declareHandler;
