export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
  chat_status: string;
};

export type ChatConversationType = {
  chat_messages: ChatMessageType[];
  phone_number: string;
  unread_msg: number;
  _id?: string;
  color?: string | any;
  label?: string | any;
};

export type ChatbotTopSectionProps = {
  selectedChat: ChatConversationType;
};
