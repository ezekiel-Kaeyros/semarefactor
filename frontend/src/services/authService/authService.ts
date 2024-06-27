import { CredetialChatBotType, ResponseCredetialChatBotType } from '..';
import { DataServiceUserService } from '../dataServiceUserService';
const URL_CHAT_BOT = 'https://back.chatbot.sem-a.com';

export class AuthService extends DataServiceUserService {
  login = (data: {
    email: string;

    password: string;
  }): Promise<{ data: any; status: any }> => {
    console.log("data",data);
    
    return this.post('/usersema/auth', data);
  };

  register = (data: {
    email: string;

    password: string;
    phone: string;
    company: string;
  }): Promise<{ data: any; status: any }> => {
    return this.post('/signup', data);
  };

  register2 = async (data: {
    email: string;
    phone: string;
    password: string;

    company: string;
  }) => {
    const response = await this.post(
      'https://tmil8s59c9.execute-api.eu-central-1.amazonaws.com/signup',
      data
    );

    // ;

    alert('stoppa');

    return response?.data?.data;
  };

  forgottenPassword = (data: any) => {
    return this.post('/auth/forgottenPassword', data);
  };

  retrievePosts = async () => {
    const response = await this.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return response.data;
  };

  /**
   * Registers a chatbot credential.
   *
   * @param data - The chatbot credential data.
   * @returns The response from the server.
   */
  async registerCredentialChatBot(
    data: CredetialChatBotType
  ): Promise<ResponseCredetialChatBotType> {
    try {
      const response = await this.post(`${URL_CHAT_BOT}/credentials`, data);
      return response;
    } catch (error) {
      console.error('Error registering chatbot credential:', error);
      throw error;
    }
  }

  /**
   * get a phone id on table Credential on chatbot
   *
   * @param email
   * @returns
   */
  async getPhoneNumberId(email: string) {
    try {
      const response = await this.get(
        `${URL_CHAT_BOT}/credentials/user/email/?email=${email}`
      );
      return response;
    } catch (error) {
      console.error('Error registering chatbot credential:', error);
      throw error;
    }
  }
}
