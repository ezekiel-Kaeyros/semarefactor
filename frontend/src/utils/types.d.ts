export type chatType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date: string;
};

export type conversationType = {
  phone_number: string;
  chat_messages: chatType[]
};

export type allConersationType ={
  _id: string;
  phone_number_id: string;
  conversations: conversation[];
}
