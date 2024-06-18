import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import {promises as fsPromises} from "fs"
import path from 'path';
import { Request, Response } from 'express';

const logEvents = async (message: string, logName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logRequest = (request: Request) => {
    const { method, headers, url } = request;
    const logMessage = `${method}\t${headers.origin}\t${url}`;
    logEvents(logMessage, 'reqLog.txt');
};

const logger = (request: Request, _: Response, next: any) => {
    console.log(`${request.method} ${request.path}`);
    logRequest(request);
    next();
};

export { logger, logEvents };