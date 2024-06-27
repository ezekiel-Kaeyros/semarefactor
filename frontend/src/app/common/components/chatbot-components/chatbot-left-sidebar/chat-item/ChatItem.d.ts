/* eslint-disable no-unused-vars */
export type ChatItemProps = {
  id: string | number | any;
  picture?: string;
  number?: string;
  // status: 'pending' | 'expired' | 'closed' | 'open';
  status: string | any;
  message?: string;
  date?: string | undefined;
  handleSelected: (item: any) => void;
  color?: string;
  unread_msg?: number;
  selectedChatStatus?: string | any;
};
