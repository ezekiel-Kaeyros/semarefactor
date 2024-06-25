"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
/**
 * Decorator to mark a class as a controller.
 *
 * @param {string} [baseRoute=''] - The base route for the controller.
 * @returns {(target: any) => void} - A decorator function.
 */
function Controller(baseRoute = '') {
    /**
     * Decorator function to mark a class as a controller.
     *
     * @param {any} target - The class to be decorated.
     * @returns {void} - Nothing is returned.
     */
    return (target) => {
        // Set the base route for the controller as metadata
        Reflect.defineMetadata('baseRoute', baseRoute, target);
    };
}
exports.Controller = Controller;
