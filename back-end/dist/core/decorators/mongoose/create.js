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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCreate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function MongoCreate(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, e_1, _b, _c;
                try {
                    if (Array.isArray(req.body)) {
                        let arr = [];
                        try {
                            for (var _d = true, _e = __asyncValues(req.body), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                                _c = _f.value;
                                _d = false;
                                const element = _c;
                                console.log(element);
                                let res = yield model.create(element);
                                console.log(res);
                                arr.push(res);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        req.mongoCreate = arr;
                    }
                    else {
                        const document = new model(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, req.body));
                        yield document.save();
                        req.mongoCreate = document;
                    }
                }
                catch (error) {
                    // logging.error(error);
                    return res.status(400).json(error);
                }
                return originalMethod.call(this, req, res, next);
            });
        };
        return descriptor;
    };
}
exports.MongoCreate = MongoCreate;
