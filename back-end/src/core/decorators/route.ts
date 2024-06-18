import { Express, RequestHandler } from 'express';
import { RouteHandler } from '../utiles/routes';

/**
 * A decorator that defines a route for a controller.
 *
 * @param method - The HTTP method of the route.
 * @param path - The path of the route. Default is an empty string.
 * @param middleware - Middleware functions to be applied to the route.
 * @returns A decorator function that modifies the target object.
 */
export function Route(method: keyof Express, path: string = '', ...middleware: RequestHandler[]) {
    /**
     * A decorator function that modifies the target object by adding the route definition to its metadata.
     *
     * @param target - The controller object that the route is defined for.
     * @param key - The name of the method that the route is defined for.
     * @param descriptor - The property descriptor of the method that the route is defined for.
     */
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        // Define the route path
        const routePath = `${path}`;
        // Get the route handlers metadata from the target object or create a new Map if it doesn't exist
        const routeHandlers: RouteHandler = Reflect.getMetadata('routeHandlers', target) || new Map();

        // If there is no route handler for the given HTTP method, create a new Map for it
        if (!routeHandlers.has(method)) {
            routeHandlers.set(method, new Map());
        }

        // Get the route handler for the given HTTP method and path and add the middleware and method to it
        routeHandlers.get(method)?.set(routePath, [...middleware, descriptor.value]);

        // Define the route handlers metadata for the target object
        Reflect.defineMetadata('routeHandlers', routeHandlers, target);
    };
}
