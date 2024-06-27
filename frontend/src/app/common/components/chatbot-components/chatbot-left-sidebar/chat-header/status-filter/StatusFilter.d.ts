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

/* eslint-disable no-unused-vars */
export type StatusFitlerProps = {
  options: Array<{
    id: number;
    status: string;
    numberOfChats: string;
    color: string;
  }>;
  handleSelect?: (id: string | number) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  conversation: {
    _id: string;
    phone_number: string;
    status: string;
    chat_ids: string[];
    credential_id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }[];
  realTimeStatusArr: any;
};

export const options = [
  {
    id: 0,
    status: 'All',
    numberOfChats: '',
    color: '',
  },
  {
    id: 1,
    status: 'start',
    numberOfChats: '10',
    color: '#157A3F',
  },
  {
    id: 2,
    status: 'open',
    numberOfChats: '4',
    color: '#182881',
  },
  {
    id: 3,
    status: 'pending',
    numberOfChats: '2',
    color: '#915103',
  },
  {
    id: 4,
    status: 'expired',
    numberOfChats: '5',
    color: '#B00020',
  },
];
