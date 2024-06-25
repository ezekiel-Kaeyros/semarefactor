"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
/**
 * A decorator that defines a route for a controller.
 *
 * @param method - The HTTP method of the route.
 * @param path - The path of the route. Default is an empty string.
 * @param middleware - Middleware functions to be applied to the route.
 * @returns A decorator function that modifies the target object.
 */
function Route(method, path = '', ...middleware) {
    /**
     * A decorator function that modifies the target object by adding the route definition to its metadata.
     *
     * @param target - The controller object that the route is defined for.
     * @param key - The name of the method that the route is defined for.
     * @param descriptor - The property descriptor of the method that the route is defined for.
     */
    return (target, key, descriptor) => {
        var _a;
        // Define the route path
        const routePath = `${path}`;
        // Get the route handlers metadata from the target object or create a new Map if it doesn't exist
        const routeHandlers = Reflect.getMetadata('routeHandlers', target) || new Map();
        // If there is no route handler for the given HTTP method, create a new Map for it
        if (!routeHandlers.has(method)) {
            routeHandlers.set(method, new Map());
        }
        // Get the route handler for the given HTTP method and path and add the middleware and method to it
        (_a = routeHandlers.get(method)) === null || _a === void 0 ? void 0 : _a.set(routePath, [...middleware, descriptor.value]);
        // Define the route handlers metadata for the target object
        Reflect.defineMetadata('routeHandlers', routeHandlers, target);
    };
}
exports.Route = Route;
