export function MyDecorator(metadata: string) {
    return function (target: any, propertyKey: string) {
        console.log('je cible', target, propertyKey);

        Reflect.defineMetadata('my-decorator', metadata, target, propertyKey);
    };
}
