import axios from 'axios';
import { BACKEND_CHATBOT_API_URL } from './backendUrls';

export const loadChatsByCompany = async ({ token }: { token: string }) => {
  const response = await axios.get(BACKEND_CHATBOT_API_URL + token);
  if (response.status === 200) {
    // ;

    return response.data;
  } else {
    return new Error('Failed to fetch data');
  }
};
