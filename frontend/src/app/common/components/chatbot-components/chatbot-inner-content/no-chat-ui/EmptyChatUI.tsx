'use client';
import Image from 'next/image';
import React from 'react';

import emptyIcon from '../../../../../../../public/message_container_icons/empty.png';
import { Button } from '@/app/common/ui/button/Button';
import messageIcon from '../../../../../../../public/icons/chatbot/messagesIcon.svg';
import Link from 'next/link';

const EmptyChatUI = () => {
  return (
    <div className="w-[100%] py-64 bg-mainDark h-screen-minus-80 grid justify-items-center gap-[1.5rem] content-center">
      <div className="p-1 flex items-center justify-center">
        <Image src={emptyIcon} width={150} alt="Notification icon" />
      </div>
      <div className="flex flex-col justify-center justify-items-center w-[200px]">
        <p className="text-center">
          Welcome to <span className="font-bold">Chatbot</span>
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
          }}
        >
          Get Started by selecting a client or create new message
        </p>
      </div>
      {/* <div className="flex flex-col justify-center gap-[1rem] justify-items-center w-[200px]"></div> */}
      <div className="my-6">
        <Link href={`/dashboard/scenarios/create`}>
          <Button rightIcon={messageIcon}>Create scenario</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyChatUI;
