export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
  chat_status: string;
  scenario_name?: string;
};

export type ChatConversationType = {
  chat_messages: ChatMessageType[];
  phone_number: string;
  unread_msg: number;
  color?: string | any;
  label?: string | any;
};

export type ChatByConversationType = {
  status: number;
  data: {
    _id: string;
    is_read: boolean;
    text: string;
    origin: string;
    converastion_id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }[];
};
export type ConversationByCompanyReturnType = {
  status: number;
  data: {
    _id: string;
    phone_number: string;
    status: string;
    chat_ids: string[];
    credential_id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }[];
};

// export type ChatsByCompanyReturnType = {
//   status: number;
//   data: {
//     message: string;
//     // data: {
//     //   _id: string;
//     //   phone_number_id: string;
//     //   company?: string;
//     //   conversations: ChatConversationType[];
//     // };
//     _id: string;
//     phone_number_id: string;
//     company?: string;
//     conversations: ChatConversationType[];
//   };
// };

export type ChatsByNumberReturnType = {
  status: number;
  data: {
    // message: string;
    // data: {
    _id: string;
    phone_number_id: string;
    conversations: ChatConversationType[];
    // };
  };
};

export type ImageReturnType = {
  message: string;
  fileUrl: string;
  phoneNumberID: string;
};
