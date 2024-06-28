import { getUserCookies } from '@/cookies/cookies';
import DataService from '../dataService';
import { GetSenario, ScenarioInput } from './senarioService.d';
import axios, { AxiosInstance } from 'axios';
interface ClientNumber {
  numberId: number;
  email: string;
}
type ScenarioCreationType = {
  title: string;
  type: string;
  keywords: string[];
  credential_id: string;
};
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class SenarioService extends DataService {
  client: AxiosInstance;
  constructor() {
    super();
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  create = async (
    data: ScenarioInput
  ): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.post(BASE_URL + '/create', data);
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  initialCreateScenario = async (
    data: ScenarioCreationType
  ): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.post(
        BASE_URL + '/scenario/create',
        data
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  // TODO: FIX A TOKEN FOR PHONE NUMBER
  getAllSenarioOfPhoneId = async (): Promise<{
    data: GetSenario[];
    status: number;
  }> => {
    try {
      const credentials_id = getUserCookies().credentials._id;
      const response = await this.client.get(
        BASE_URL + '/scenario/credentialId/' + credentials_id
      );
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  delete = async (
    id: string
  ): Promise<{ data: GetSenario[]; status: number }> => {
    try {
      const response = await this.client.delete(
        BASE_URL + '/scenario/delete/' + id
      );
      if (response.status === 201) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  getSenarioById = async (
    id: string | undefined
  ): Promise<{ data: GetSenario; status: number }> => {
    try {
      const response = await this.client.get(BASE_URL + '/scenario/' + id);
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
  // /edit/65fd662053521da88340a726
  edit = async (params: {
    token?: string;
    email: string;
    data: any;
    id: string;
  }): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.put(
        BASE_URL + '/edit/' + params.id,
        params.data
      );
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };

  editMainScenario = async (params: {
    data: any;
    id: string;
  }): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.patch(
        BASE_URL + '/scenario/update/' + params.id,
        params.data
      );
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };

  createScenarioItem = async (params: {
    scenario_items: any[];
  }): Promise<{ data: any; status: number }> => {
    try {
      const response = await this.client.post(
        BASE_URL + '/scenario-item/create',
        params.scenario_items
      );
      if (response.status === 201) {
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      return error;
    }
  };
}
