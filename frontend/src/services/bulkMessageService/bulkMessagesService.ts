import { getUserCookies } from '@/cookies/cookies';
import { dataServiceBulkmessage } from '../dataServiceBulkMessage';

interface ClientNumber {
  numberId: number;
  email: string;
}
// const clientPhonenumber: ClientNumber[] = [
//   {
//     numberId: 299462959914851,
//     email: 'ketourah@mail.com',
//   },
// ];
export class BulkMessagesService extends dataServiceBulkmessage {
  sendBulkMessages = async (data: {
    template_name: string;
    recipients_phone_numbers: string[];
  }) => {
    try {
      const hisEmail = getUserCookies().email;
      const phone_number_id = getUserCookies().credentials.phone_number_id;
      const response = await this.post(
        'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast/' +
          phone_number_id,
        data
      );
      alert('stop');

      return response.data;
    } catch (error) {
      alert('stop');
    }
    // // ;
  };

  sendBulkMessages2 = (data: {
    template_name: string;
    recipients_phone_numbers: string[];
  }): Promise<{ data: any; status: any }> => {
    const hisEmail = getUserCookies().email;
    const phone_number_id = getUserCookies().credentials.phone_number_id;
    return this.post('/broadcast/' + phone_number_id, data);
  };

  deleteTemplete = (
    name_templete: string
  ): Promise<{
    data: {
      message: string;
      data: {
        success: boolean;
      };
    };
    status: any;
  }> => {
    const hisEmail = getUserCookies().email;
    // const phone_number_id = getUserCookies().credentials.phone_number_id;
    const phone_number_id = getUserCookies().credentials.phone_number_id;
    return this.delete('/template/' + phone_number_id + '/' + name_templete);
  };

  getTemplateByClient = async () => {
    console.log(getUserCookies(),"11111111111111");
    
    const hisEmail = getUserCookies().email;
    // const phone_number_id = getUserCookies().phone_number_id;
    const phone_number_id = getUserCookies().credentials.phone_number_id;

    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/template/' +
        phone_number_id
    );
    return response.data;
  };

  getTemplateSession = async () => {
    const hisEmail = getUserCookies().email;
    const phone_number_id = getUserCookies().credentials.phone_number_id;
    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/' +
        phone_number_id
    );
    return response.data;
  };
  getDetailTemplateSession2 = (
    id: string
  ): Promise<{
    data: {
      message: string;
      data: {
        id?: string;
        template_name?: string;
        template_id?: string;
        company_name?: string;
        phone_number_id?: string;
        broadcasts: {
          id?: number;
          session_id?: number;
          phone?: string;
          template_id?: number;
          response_id?: string;
          status?: string;
          template_name?: string;
          message_status?: string;
          phone_number_id?: string;
          success?: boolean;
          created_at?: Date;
        }[];
      };
    };

    // data:any
    status: any;
  }> => {
    const hisEmail = getUserCookies().email;
    const phone_number_id = getUserCookies().credentials.phone_number_id;
    return this.get('/broadcast-session/' + phone_number_id + id);
  };
  getDetailTemplateSession = async (id: string) => {
    const hisEmail = getUserCookies().email;

    const phone_number_id = getUserCookies().credentials.phone_number_id;

    const response = await this.get(
      'https://7ws8gmoso5.execute-api.eu-central-1.amazonaws.com/prod/broadcast-session/' +
        phone_number_id +
        '/' +
        id
    );
    return response.data;
  };
}
