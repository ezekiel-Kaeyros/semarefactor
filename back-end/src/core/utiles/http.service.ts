import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

class HttpService {
  private static getAxiosConfig(token?: string, contentType: string = 'application/json'): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': contentType,
      },
    };

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  static async get<T>(
    url: string,
    params?: Record<string, any>,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const config = this.getAxiosConfig(token);
    config.params = params;
    return axios.get<T>(url, config);
  }

  static async post<T>(
    url: string,
    data: Record<string, any>,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const config = this.getAxiosConfig(token);
    try {
      return await axios.post<T>(url, data, config);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw 'error http post';
    }
  }

  static async put<T>(
    url: string,
    data: Record<string, any>,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const config = this.getAxiosConfig(token);
    return axios.put<T>(url, data, config);
  }

  static async patch<T>(
    url: string,
    data: Record<string, any>,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const config = this.getAxiosConfig(token);
    return axios.patch<T>(url, data, config);
  }

  static async delete<T>(
    url: string,
    params?: Record<string, any>,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const config = this.getAxiosConfig(token);
    config.params = params;
    return axios.delete<T>(url, config);
  }

  static async uploadFile<T>(
    url: string,
    filePath: string,
    token?: string
  ): Promise<AxiosResponse<T>> {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const config = this.getAxiosConfig(token, 'multipart/form-data');
    config.headers = { ...config.headers, ...form.getHeaders() };

    return axios.post<T>(url, form, config);
  }

  static async downloadFile(
    url: string,
    savePath: string,
    params?: Record<string, any>,
    token?: string
  ): Promise<void> {
    const config = this.getAxiosConfig(token);
    config.params = params;
    config.responseType = 'stream';

    const response = await axios.get(url, config);
    response.data.pipe(fs.createWriteStream(savePath));
  }
}

export default HttpService;
