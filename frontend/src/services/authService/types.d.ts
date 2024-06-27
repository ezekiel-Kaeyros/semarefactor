export type CredetialChatBotType = {
  company: string;
  phone_number_id: string;
  verify_token: string;
  email: string;
  token: string;
};

export type ResponseCredetialChatBotType = {
  status: number;
  response?: any;
  data?: CredetialChatBotType & {
    id: string;
  };
};
