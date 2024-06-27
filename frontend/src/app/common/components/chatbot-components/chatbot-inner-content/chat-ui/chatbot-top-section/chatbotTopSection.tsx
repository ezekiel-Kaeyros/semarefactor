'use client';
import React from 'react';

import InfoIcon from '../../../../../../../../public/icons/chatbot/infoIcon.svg';
import staredIcon from '../../../../../../../../public/message_container_icons/upper_pane_icons/staredIcon.png';

import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Image from 'next/image';
import { toggleDisplayClientInfoInChatUI } from '@/redux/features/chat-bot-slice';
import { useChatBot } from '@/app/hooks/useChatBot';
import CountdownTimer from './countdownTimer';
import timerClocking from '../../../../../../../../public/icons/chatbot/timerIcon.svg';
import StatusFitler from '../../../chatbot-left-sidebar/chat-header/status-filter/StatusFilter';
import { options } from '../../../chatbot-left-sidebar/chat-header/status-filter/StatusFilter.d';
import { ChatbotTopSectionProps } from './ChatbotTopSection.d';
import { ChatConversationType } from './ChatbotTopSection.d';
import ConversationFilter from './conversationFilter';

interface ChatMessages {
  selectedChat: {
    chat_messages: {
      text: string;
      is_bot: boolean;
      is_admin: boolean;
      date?: string;
      chat_status: string;
    }[];
    phone_number: string;
  };
}

const ChatbotTopSection: React.FC<any> = ({ selectedChat }: ChatMessages) => {
  const { displayClientInfoInChatToggle, dispatch, message ,status} = useChatBot();

  return (
    <div className="px-[1rem] py-3 flex flex-row justify-between items-center border-slate-600 dark:bg-mainDark border-b-[0.02px]">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="mr-5 bg-[#2B45D8] py-3 px-4 rounded-full flex items-center gap-x-2">
            <div className="min-w-[65px] items-center justify-center flex">
              <CountdownTimer selectedChat={selectedChat} />
            </div>
            <Image
              src={timerClocking}
              alt="timer"
              className="mt-[-5px] rotate"
            />
          </div>

          {/* Profile section */}
          <div className="flex ml-8 font-bold justify-center items-center  rounded-full">
            <div className="relative w-12 h-12 an mr-4 rounded-full justify-center items-center bg-[#A9B3EF]">
              <h1 className="text-primary absolute  bottom-0 left-0 right-0 top-0 grid place-items-center">
                U
              </h1>
            </div>
            <div>
              <>{selectedChat?.phone_number}</>
              {/* <h3 className="text-sm opacity-90">Online</h3> */}
            </div>
          </div>
          {/* <h1 className="font-bold">{message?.phone_number}</h1> */}
        </div>
      </div>
      <div className="flex justify-center items-center gap-x-6">
        <div className="flex flex-row items-center gap-[1rem]">
          <AnimateClick>
            <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-lg w-12 h-12 p-1 flex items-center justify-center">
              <Image src={staredIcon} width={30} alt="Notification icon" />
            </div>
          </AnimateClick>

          <AnimateClick>
            <div
              onClick={() => {
                dispatch(
                  toggleDisplayClientInfoInChatUI(
                    !displayClientInfoInChatToggle
                  )
                );
              }}
              className="bg-mainDarkLight  cursor-pointer rounded-lg w-12 h-12 p-1 flex items-center justify-center"
            >
              <Image src={InfoIcon} width={30} alt="Notification icon" />
            </div>
          </AnimateClick>
        </div>
        <div className="flex justify-center w-full">
          <ConversationFilter
            options={options}
            selectedStatus={'selectedStatus'}
            onStatusChange={() => <>hello</>}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotTopSection;
