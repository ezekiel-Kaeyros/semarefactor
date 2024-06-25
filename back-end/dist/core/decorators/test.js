"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDecorator = void 0;
function MyDecorator(metadata) {
    return function (target, propertyKey) {
        console.log('je cible', target, propertyKey);
        Reflect.defineMetadata('my-decorator', metadata, target, propertyKey);
    };
}
exports.MyDecorator = MyDecorator;
