import { Edge, Node } from 'reactflow';
export interface ConversationsType {
  _id: string;
  id: number;
  status: string;
  client: boolean;
  time?: any;
  selected: false;
  deadline?: any;
  hours?: number;
  minutes?: number;
  seconds?: number;
  timer?: any;
  messageDateTime: string;
  online: boolean;
  name: string;
  messages: MessageType[];
}
export type ChatMessageType = {
  text: string;
  is_bot: boolean;
  is_admin: boolean;
  date?: string;
  is_read?: boolean;
  chat_status: string;
  scenario_name: string;
};

export type ChatConversationType = {
  // _id?: string;
  phone_number: string;
  chat_messages: ChatMessageType[];
  unread_msg?: number;
};

export type ChatsByCompanyReturnType = {
  data?: any;
  status?: number;

  _id: string;
  phone_number_id: string;
  company?: string;
  conversations: ChatConversationType[];
};

export interface MessageType {
  id: number;
  message: string;
  messageTime: string;
  client: boolean;
  name: string;
}

interface ChildLabel {
  parent: string;
  child?: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface ParentLabel {
  parent: string;
  child: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface Props {
  interactive_labels: ParentLabel[];
}

export interface ModalSliceType {
  openModalToggle: boolean;
  closeModalToggle: boolean;
  modalTogle: boolean;
  interactive_labels: {
    parent: string;
    child: ChildLabel[];
    uuid: string;
    selected: boolean;
  }[];
}

export type TypeItemTableSaveTemplete = {
  body_text: string;
  category: string;
  company_name: string;
  footer_text: string;
  id: string;
  image_handle: string;
  image_url: string;
  language: string;
  name: string;
  phone_number_id: string;
  status: string;
  template_id: string;
};
export type TypeNewConversation={
    _id: string;
    phone_number: string;
    status: string;
    chat_ids: string[];
    credential_id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }
export interface ChatBotType {
  sideBarToggle: boolean;
  displayChatUiToggle: boolean;
  displayClientInfoInChatToggle: boolean;
  selectedConversation: number;
  selectedConversationObj: ConversationsType;
  conversations: ConversationsType[];
  chats: MessageType[];
  clearTimerInterval?: boolean;
  firstTime?: boolean;
  companychats: ChatsByCompanyReturnType;
  chatsConversation: ChatConversationType[];
  message: ChatConversationType;
  filterStatus: string;
  conversationStatus: string | any;
  currentChatStatus: string;
  arrayStatus: {
    id: string;
    status: string;
    color: string;
  }[];
  selectedStatus: string;
  companyId: string;
  loadingStatus: boolean;
  conversation: TypeNewConversation[];
  chatConversation: {
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
  allconversation: {
    id: string;
    chats: {
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
  }[];
}

export interface BulkMessageTabSilceType {
  sendMessageToggle: boolean;
  savedTemplateToggle: boolean;
  historyToggle: boolean;
  bulkMessageTabs?: BulkMessageTabTypeI[];

  tableTemplete: TypeItemTableSaveTemplete[];
  itemTableTemplete: TypeItemTableSaveTemplete;
  isRefresh: boolean;
  isActive:string
}

export interface TombolaServiceTabSilceType {
  // sendMessageToggle: boolean;
  // savedTemplateToggle: boolean;
  // historyToggle: boolean;
  tombolaServiceTabs?: BulkMessageTabTypeI[];
}

export type BulkMessageTabTypeI = {
  id: number;
  label: string;
  selected: boolean;
  // func?: any;
  // tabData?: any;
};

export type PricingTypeI = {
  id: string;

  // func?: any;
  // tabData?: any;
};
export type TombolaServiceTabTypeI = {
  id: number;
  label: string;
  selected: boolean;
  func?: any;
  tabData?: any;
};

export type BulkMessageAllTabsTypeI = BulkMessageTabTypeI[];

export interface BulkMessageTabSilceType {
  sendMessageToggle: boolean;
  savedTemplateToggle: boolean;
  historyToggle: boolean;
}

export interface ForSingleElementForm {
  message: string;
}
export type NodeDataType = {
  id: string;
  value: any;
  type?: 'response' | 'question';
};
export type SenarioType = {
  nodesData: NodeDataType[];
  edgesData: NodeDataType[];
};
export type senarioCreateAction = {
  setAddNodesData?: (nds: NodeDataType) => void;
  setNodesData?: (nds: NodeDataType[]) => void;
  setEdgesData?: (nds: Edge[]) => void;
  reset?: () => void;
};

export interface FilterActionsProps {
  scenario: string;
  id: number;
  scenarioCases: [
    {
      label: string;
      id: number;
      data: [{ label: string; id: number }];
    },
  ];
}
