"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRoutes = void 0;
/**
 * Defines routes for a list of controllers using the Express application.
 * It loops through each controller, retrieves the route handlers metadata,
 * and registers the routes with the Express application.
 *
 * @param {any[]} controllers - An array of controller constructors.
 * @param {Express} application - The Express application to register routes with.
 */
function defineRoutes(controllers, application) {
    // Loop through each controller
    for (let i = 0; i < controllers.length; i++) {
        // Create a new instance of the controller
        const controller = new controllers[i]();
        // Retrieve the metadata for route handlers
        const routeHandlers = Reflect.getMetadata('routeHandlers', controller);
        // Retrieve the base route for the controller
        const controllerPath = Reflect.getMetadata('baseRoute', controller.constructor);
        // Get an array of the methods from the route handlers metadata
        const methods = Array.from(routeHandlers.keys());
        logging.log('====== all routes for ======>', controllerPath);
        // Loop through each method
        for (let j = 0; j < methods.length; j++) {
            const method = methods[j];
            // Get the routes for the method
            const routes = routeHandlers.get(method);
            // If there are routes for the method
            if (routes) {
                // Get an array of the route names
                const routeNames = Array.from(routes.keys());
                // Loop through each route name
                for (let k = 0; k < routeNames.length; k++) {
                    // Get the handlers for the route
                    const handlers = routes.get(routeNames[k]);
                    // If there are handlers for the route
                    if (handlers) {
                        // Register the route with the Express application
                        application[method](controllerPath + routeNames[k], handlers);
                        // Log the route that was registered
                        logging.log('Loading route:', method, controllerPath + routeNames[k]);
                    }
                }
            }
        }
        // Log that all routes have been loaded
        logging.log('====== all routes loaded for ======', controllerPath);
    }
}
exports.defineRoutes = defineRoutes;
