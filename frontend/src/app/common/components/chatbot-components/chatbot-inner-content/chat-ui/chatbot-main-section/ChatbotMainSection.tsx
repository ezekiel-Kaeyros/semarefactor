'use client';
import React, { useEffect, useRef } from 'react';
import ChatBubble from './chatBubble.tsx/ChatBubble';
import { ChatbotMainSectionProps } from './ChatbotMainSection.d';
import { formatDate } from '@/utils/utils';
import { useGlobalContext } from '@/app/common/contex-provider';
import { ChatConversationType, ChatMessageType } from '@/services';
import { useDispatch } from 'react-redux';
import { setChats } from '@/redux/features/chat-bot-slice';
import { useChatBot } from '@/app/hooks/useChatBot';
import { usePathname } from 'next/navigation';

const ChatbotMainSection: React.FC<ChatbotMainSectionProps> = ({
  selectedChat,
}) => {
  const chatContainerRef = useRef<any>(null);
  const { selectedScenarioLabel } = useGlobalContext();
  const dispatch = useDispatch();
  const { filterStatus } = useChatBot();
  const pathname=usePathname()

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    dispatch(setChats(selectedChat));
  }, [selectedChat]);

  // const filtered = selectedChat?.filter(
  //   (item) => item. === selectedScenarioLabel
  // );

  // const mappedConversations =
  //   filtered?.length !== 0 ? filtered : selectedChat.chat_messages;

  // const filterdStatusConversation = mappedConversations?.filter(
  //   (chats: ChatMessageType) => chats.chat_status === filterStatus
  // );

  // const mappedFilteredConversation =
  //   filterStatus === 'All' || filterStatus == ''
  //     ? mappedConversations
  //     : filterdStatusConversation;

  // console.log(selectedChat, 'selectedChat');

  return (
    <div
      className="flex-grow p-4 bg-dark 
     "
    >
      <div
        ref={chatContainerRef}
        className=" no-scrollbar  flex h-[80vh] scroll-smooth transition ease-linear duration-200 overflow-y-auto flex-col space-y-2 px-4 pt-4 pb-32"
      >
        {selectedChat?.map((chat, key: any) => (
          <ChatBubble
            date={formatDate(chat?.createdAt?.toString())}
            isBot={chat?.origin != 'user'}
            isAdmin={chat?.origin != 'user'}
            message={chat?.text}
            name={pathname.split('/').pop()!}
            key={key}
            url={chat.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatbotMainSection;
