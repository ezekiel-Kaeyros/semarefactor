export type ResponseModel = {
  label: string;
  questions?: QuestionModel[];
  id?: string;
};

export type MainModel = {
  label: string;
  responses?: MainModel[];
  questions?: MainModel[];
  responseType?: 'text' | 'button' | 'list' | 'catalog' | 'template' | 'image';
  id?: string;
  link?: string;
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
