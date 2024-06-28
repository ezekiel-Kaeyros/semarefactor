import { getUserCookies } from '@/cookies/cookies';
import DataService from '../dataService';
import {
  categorieType,
  dateAvailableType,
  prestationType,
} from './calendarService.d';
import axios from 'axios';
interface ClientNumber {
  numberId: number;
  email: string;
}

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_CHATBOT_URL;

export class CalendarService extends DataService {
  //   constructor() {
  //     super();
  //     this.client = axios.create({
  //       baseURL: BASE_URL,
  //       timeout: 30000,
  //       timeoutErrorMessage: 'Time out!',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });
  //   }

  CreateReservation = (data: {
    name: string;
    total_price: number;
    description: null;
    startAt: string;
    service_booking_id: string[];
    conversation_id: string;
  }): Promise<{
    status: number;
    data: {
      name: string;
      total_price: number;
      description: null;
      startAt: string;
      service_booking_id: string[];
      conversation_id: string;
      status: string;
      endAt: string;
      updatedAt: string;
    };
  }> => {
    return this.post(`/booking/create`, data);
   
  };

  getPrestation = (id: string): Promise<prestationType> => {
    return this.get(`/service-booking/company/${id}`);
   
  };

  getCategory = (id: string): Promise<categorieType> => {
    
   return  this.get(`/category-booking/company/${id}`);
  };

  getDate = (id: string, days: string): Promise<dateAvailableType> => {
    return this.get(
      `/company-creneau/availableDays/${id}?nb_days=${days}`
    );
   
  };

  getHour = (id: string, date: string): Promise< {status:number , data: string[]}> => {
  return this.get(`/company-creneau/available/${id}?date=${date}&typeFormat=1`);
     
  };
}
