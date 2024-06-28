export type MainModel = {
  label: string;
  responses?: MainModel[];
  questions?: MainModel[];
  responseType?: 'text' | 'button' | 'list' | 'catalog' | 'template' | 'image';
  id?: string;
};

export type ScenarioInput = {
  _id?: string;

  title: string;

  phone_number_id: string;

  company: string;

  description: MainModel[];
  interactive_labels?: any;
  times?: number;
  keywords?: string[];
  company_id?: string;
  report_into?: string;
  last_message?: string;
};

export type UserSenario = {
  phone_number: string;
  username: string;
  times: number;
};

export type GetSenario = {
  _id: string;
  title: string;
  type: string;
  keywords: string[];
  credential_id: string;
  active: true;
  scenario_items_id: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
