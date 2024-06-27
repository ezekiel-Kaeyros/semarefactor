'use client';
import React, { useEffect, useState } from 'react';
import ChatbotBottomSection from './chatbot-bottom-section/chatbotBottomSection';
import ChatbotTopSection from './chatbot-top-section/chatbotTopSection';
import ChatbotMainSection from './chatbot-main-section/ChatbotMainSection';
import { useChatBot } from '@/app/hooks/useChatBot';
import { ChatbotService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { addAllonversation } from '@/redux/features/chat-bot-slice';

const ChatUI = ({ id }: { id: string | number }) => {
  const { conversation, allConversation, dispatch } = useChatBot();
  const { push } = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [chat, setChat] = useState<
    | {
        _id: string;
        is_read: boolean;
        text: string;
        origin: string;
        converastion_id: string;
        url: string;
        createdAt: string;
        updatedAt: string;
        __v: 0;
      }[]
    | undefined
  >();
  const [selectChat, setSelectChat] = useState<
    | {
        _id: string;
        phone_number: string;
        status: string;
        chat_ids: string[];
        credential_id: string;
        createdAt: string;
        updatedAt: string;
        __v: 0;
      }
    | undefined
  >();

  // ;

  const selectedChat = conversation?.find(
    (chat) => chat.phone_number.toString() === id.toString()
  );
  console.log('selectedChat',selectedChat);
  

  const loadChatsByCompany = async (data?: { conversation_id :string}) => {
    try {
      const response = await new ChatbotService().loadChatsConversation(data ? data : {
        conversation_id: selectedChat ? selectedChat._id : '',
      });
      setRefresh(false);
         dispatch(addAllonversation({ id: id.toString(), chats: response.data }));

      return response.data;
      // dispatch(setConversationChats(response.data));
    } catch (error) {
      setRefresh(false);
      console.log('error-----------', error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['chatsByCompany', ''],
    queryFn: () => loadChatsByCompany(),
  });

  useEffect(() => {
    if (conversation.length > 0 && allConversation.filter((item)=>item.id==id.toString()).length==0) {
      setSelectChat(
        conversation?.find(
          (chat) => chat.phone_number.toString() === id.toString()
        )
      );

      if ((!data && !isLoading) || refresh) {
        console.log('refresh');

        loadChatsByCompany().then((result) => {
          console.log(result, 'chattt');
          setChat(result);

        });
      }
      if (data) {
        console.log('456');

        setChat(data);
      }
      console.log('data',data);
      
    }
   if (
     conversation.length > 0 &&
     allConversation.filter((item) => item.id == id.toString()).length > 0
   ) {
     console.log('allConversation',allConversation);
     
     setChat(allConversation[0].chats)
   }

  }, [conversation, refresh, data, isLoading,allConversation]);


  return (
    <div className=" flex flex-col relative w-full h-full">
      <ChatbotTopSection selectedChat={selectChat} />
      <div className="no-scrollbar flex-grow  w-full">
        {chat && chat.length > 0 && <ChatbotMainSection selectedChat={chat} />}
      </div>
      <div className=" w-full rounded-full bottom-4 absolute flex justify-center px-20 ">
        <ChatbotBottomSection
          number={selectedChat?.phone_number!}
          numberId={selectedChat?._id!}
          refresh={() => setRefresh(true)}
        />
      </div>
    </div>
  );
};

export default ChatUI;
