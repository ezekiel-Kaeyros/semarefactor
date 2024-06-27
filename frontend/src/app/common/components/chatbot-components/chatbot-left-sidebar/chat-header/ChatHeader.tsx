import Image from 'next/image';
import React, { useRef, useState } from 'react';

import SearchIcon from '../../../../../../../public/icons/searchIcon.svg';
import MessageIcon from '../../../../../../../public/icons/chatbot/messagesIcon.svg';
import { Button } from '@/app/common/ui/button/Button';
import StatusFitler from './status-filter/StatusFilter';
import { options } from './status-filter/StatusFilter.d';
import ChatFilter from './chat-filter/ChatFilter';
import { Filteroptions } from './chat-filter/ChatFilter.d';
import ScenarioFilter from './scenario-filter/ScenarioFilter';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import SecondStatusFilter from './status-filter/statusFiler2';

interface ChatFilterProps {
  selectedStatus: string | any;
  onStatusChange: (status: string) => void;
  onInputChange: any;
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
}

const ChatHeader = ({
  selectedStatus,
  onStatusChange,
  onInputChange,
  conversation,
  realTimeStatusArr,
}: ChatFilterProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const handleSelect = (id: string | number) => {
    // console.log('id selected', id);
  };
  onStatusChange;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Inbox</h1>
        <Image src={SearchIcon} alt="Search icon" />
      </div> */}

      <div>
        <InputField
          reference={inputRef}
          icon2={SearchIcon}
          handleChange={onInputChange}
          type="number"
          pattern="[0-9]*"
          placeholder="Enter a number"
        />
      </div>
      {/* Launch bulk message button */}
      <div>
        <Button rightIcon={MessageIcon}>Launch Bulk Message</Button>
      </div>
      {/* Status filtering component */}
      <div>
        <SecondStatusFilter
          conversation={conversation}
          options={options}
          handleSelect={handleSelect}
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
          realTimeStatusArr={realTimeStatusArr}
        />
      </div>

      <div className="flex items-center gap-x-5 justify-between">
        {/* <div className="">
          <StatusFitler
            options={options}
            handleSelect={handleSelect}
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />
        </div> */}
        <ChatFilter options={Filteroptions} handleSelect={handleSelect} />
        <ScenarioFilter />
      </div>
    </div>
  );
};

export default ChatHeader;
