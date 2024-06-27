'use client';
import {
  ConversationsType,
  ChatsByCompanyReturnType,
  ChatConversationType,
} from '@/redux/features/types';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ChatbotTopSectionProps } from '../common/components/chatbot-components/chatbot-inner-content/chat-ui/chatbot-top-section/ChatbotTopSection';
export const useChatBot = () => {
  const conversations: ConversationsType[] = useSelector(
    (state: RootState) => state.ChatBotSlice.conversations
  );
 const conversation: {
   _id: string;
   phone_number: string;
   status: string;
   chat_ids: string[];
   credential_id: string;
   createdAt: string;
   updatedAt: string;
   __v: 0;
 }[] = useSelector((state: RootState) => state.ChatBotSlice.conversation);

 const allConversation: {
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
 }[] = useSelector((state: RootState) => state.ChatBotSlice.allconversation);

 const selectedConversation: number = useSelector(
   (state: RootState) => state.ChatBotSlice.selectedConversation
 );

 const selectedConversationObj: ConversationsType = useSelector(
   (state: RootState) => state.ChatBotSlice.selectedConversationObj
 );

 const clearTimerInterval = useSelector(
   (state: RootState) => state.ChatBotSlice.clearTimerInterval
 );

 const firstTime = useSelector(
   (state: RootState) => state.ChatBotSlice.firstTime
 );

 const displayClientInfoInChatToggle: boolean = useSelector(
   (state: RootState) => state.ChatBotSlice.displayClientInfoInChatToggle
 );
 const message: ChatConversationType = useSelector(
   (state: RootState) => state.ChatBotSlice.message
 );
 const chatsCompany: ChatsByCompanyReturnType = useSelector(
   (state: RootState) => state.ChatBotSlice.companychats
 );
 const chatsConversation: ChatConversationType[] = useSelector(
   (state: RootState) => state.ChatBotSlice.chatsConversation
 );

 const filterStatus: string = useSelector(
   (state: RootState) => state.ChatBotSlice.filterStatus
 );
 const dispatch = useDispatch<AppDispatch>();
 const status: string = useSelector(
   (state: RootState) => state.ChatBotSlice.selectedStatus
 );
 return {
   firstTime,
   conversations,
   clearTimerInterval,
   selectedConversation,
   selectedConversationObj,
   displayClientInfoInChatToggle,
   dispatch,
   chatsCompany,
   chatsConversation,
   message,
   filterStatus,
   conversation,
   allConversation,
   status,
 };
};
