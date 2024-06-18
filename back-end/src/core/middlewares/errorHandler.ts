import { logEvents } from './logEvents';

const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.log(err.stack)
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    res.status(500).send(err.message);
}

export default errorHandler;