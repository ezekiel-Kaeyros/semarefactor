import { google } from "googleapis"
import { CalendarCredentials, CalendarTimeZone, CalendarUrl } from "../../core/utiles/calendar-config";
import { readFileSync, writeFileSync } from "fs";

class CalendarService {
    oAuth2Client: any;

    constructor(){
        const { clientId, clientSecret, redirectUrl } = CalendarCredentials;
        this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
    }

    getInstance(){
        if(!this.oAuth2Client){
            return new CalendarService()
        }
        return this.oAuth2Client;
    }

    //obternons l'url pour l'authentification avec google
    createUrlAuth() {

        const oAuth2Client = this.getInstance()

        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [CalendarUrl.authScope]
        });

        return authUrl;

    }

    //call back pour l'authentification
    async oauth2Callback(code: string) {
        const { clientId, clientSecret, redirectUrl } = CalendarCredentials;

        const oAuth2Client = this.getInstance()
        let tokens;

        await oAuth2Client.getToken(code, (err: any, tokensJson: any) =>{
            if(err){
                console.error('Couldn\'t get token', err);
                return;                
            }
            oAuth2Client.setCredentials(tokensJson!);
            // writeFileSync('token.json', JSON.stringify(tokensJson));
            tokens = JSON.stringify(tokensJson);
        });


        return tokens;
    }


    async booking(data: {summary: string, location : string, description: string, start: string, end: string}) {
        const { clientId, clientSecret, redirectUrl } = CalendarCredentials;

        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
        const tokens = JSON.parse(readFileSync('token.json').toString());
        oAuth2Client.setCredentials(tokens);

        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

        const { summary, location, description, start, end } = data;

        const event = {
            summary,
            location,
            description,
            start: {
                dateTime: start,
                timeZone: CalendarTimeZone.time,
            },
            end: {
                dateTime: end,
                timeZone: CalendarTimeZone.time,
            },
        };

        console.log(event);
        

        let eventResponse;

        try {
                eventResponse = await calendar.events.insert({
                calendarId: 'primary',
                auth: oAuth2Client,
                requestBody: event
            });
            console.log(eventResponse)
            // res.send(`Événement créé : ${eventResponse.data.htmlLink}`);
        } catch (error) {
            console.log('Erreur lors de la création de l\'événement :', error);
            // res.status(500).send('Erreur lors de la création de l\'événement.');
        }

        return eventResponse;
    }
}

export const calendarService = new CalendarService()