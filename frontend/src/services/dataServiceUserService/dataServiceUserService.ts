import axios from 'axios';

// const API_URL = 'https://backrefa.sem-a.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class DataServiceUserService {
  client: any;
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  post = (url: string, data: any) => {
    return this.client.post(url, data);
  };

  get = (url: string) => {
    return this.client.get(url);
  };

  put = (url: string, data: any) => {
    return this.client.put(url, data);
  };

  delete = (url: string) => {
    return this.client.delete(url);
  };
}
