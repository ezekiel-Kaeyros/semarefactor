/**
 * Decorator to mark a class as a controller.
 *
 * @param {string} [baseRoute=''] - The base route for the controller.
 * @returns {(target: any) => void} - A decorator function.
 */
export function Controller(baseRoute: string = '') {
    /**
     * Decorator function to mark a class as a controller.
     *
     * @param {any} target - The class to be decorated.
     * @returns {void} - Nothing is returned.
     */
    return (target: any) => {
        // Set the base route for the controller as metadata
        Reflect.defineMetadata('baseRoute', baseRoute, target);
    };
}
