export type ResponseModel = {
  label: string;
  questions?: QuestionModel[];
  id?: string;
};

export type QuestionModel = {
  label: string;
  responses?: ResponseModel[];
  responseType?: 'text' | 'button' | 'list';
  id?: string;
};

export type ScenarioInput ={
  _id?: string;

  
  title: string;

 
  phone_number_id: string;


  company: string;

  description: QuestionModel[];
}
