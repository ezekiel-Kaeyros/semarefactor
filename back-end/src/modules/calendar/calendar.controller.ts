import { NextFunction, Request, Response } from "express";
import { Controller } from "../../core/decorators/controller";
import { Route } from "../../core/decorators/route";
import { google } from "googleapis";
import { calendarService } from "./calendar.service";
import { readFileSync } from "fs";
import { MongoGet } from "../../core/decorators/mongoose/get";
import Booking from "../../core/database/schemas/booking.schema";

@Controller('/calendar')
class CalendarController{

    @Route('get', '/')
    getAll(req: Request, res: Response, next: NextFunction){
        return res.send(`Bienvenu dans l'espace de reservation.`)
    }

    @Route('get', '/auth')
    get(req: Request, res: Response, next: NextFunction){
        const url = calendarService.createUrlAuth()
        return res.redirect(url)
    }

    @Route('get', '/redirect')
    getRedirect(req: Request, res: Response, next: NextFunction){
        const code  = req.query.code+'';
        const tokens = calendarService.oauth2Callback(code)
        return res.send(`Successfull redirect! ${tokens}`)
    }

    @Route('get', '/list')
    getCalendars(req: Request, res: Response, next: NextFunction){
        const oAuth2Client = calendarService.getInstance();
        const tokens = JSON.parse(readFileSync('token.json').toString())
        oAuth2Client.setCredentials(tokens)

        const calendar = google.calendar({version: 'v3', auth: oAuth2Client})


        calendar.calendarList.list({}, (err, response) =>{
            if(err){
                console.error('error fetching calendars', err);
                res.status(200).json([])
                return;
            }
            const calendars = response?.data.items
            console.log(calendars)
            res.status(200).json(calendars)

        })
        
    }

    @Route('get', '/events')
    getEvents(req: Request, res: Response, next: NextFunction){
        const calendarId  = req.query.calendar_id+'';

        const oAuth2Client = calendarService.getInstance();
        const tokens = JSON.parse(readFileSync('token.json').toString())
        oAuth2Client.setCredentials(tokens)

        const calendar = google.calendar({version: 'v3', auth: oAuth2Client})


        calendar.events.list({
            calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: 15,
            singleEvents: true,
            orderBy: 'startTime'
        }, (err, response) =>{
            if(err){
                console.error('error fetching events', err)
                res.status(404).json(`Error event for id : ${calendarId}`)
                return;
            }
            const events = response?.data.items
            res.status(200).json(events)
            return;
        })
    }

    @Route('post', '/booking')
    async create(req: Request, res: Response, next: NextFunction){
        const data = req.body;

        console.log(data)

        const event = calendarService.booking(data)

        return res.status(200).json(event)
    }

}

export default CalendarController;