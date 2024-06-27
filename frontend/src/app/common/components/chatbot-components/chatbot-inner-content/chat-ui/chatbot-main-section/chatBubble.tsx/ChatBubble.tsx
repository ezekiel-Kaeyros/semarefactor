'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { ChatBubbleProps } from './ChatBubble.d';
import BotIcon from '../../../../../../../../../public/icons/chatbot/botIcon.svg';

const ChatBubble: React.FC<ChatBubbleProps> = ({
  date,
  isBot,
  message,
  name,
  isAdmin,
  url
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const urlPattern =
    /^http:\/\/back\.chatbot\.sem-a\.com\/uploads\/file-\d{13}-\d{9}\.(jpg|jpeg|png)$/;

  useEffect(() => {
    if (urlPattern.test(message)) {
      setImageUrl(message);
    }
  }, []);

  return (
    <div
      className={`max-w-lg py-4 h-full  ${((isBot || isAdmin) && ' self-start') || 'self-end'}`}
    >
      <div className="flex w-full items-center mb-4 ">
        <div
          className={`flex items-center gap-x-4  ${((isBot || isAdmin) && 'justify-start flex-row-reverse') || 'justify-end ml-auto'}`}
        >
          <h1>{(!(isBot || isAdmin) && name) || 'Bot'}</h1>
          <div className="w-8 h-8 rounded-full bg-[#A9B3EF] flex items-center justify-center">
            {((isBot || isAdmin) && <h1>B</h1>) || <h1>U</h1>}
          </div>
        </div>
        {(isBot || isAdmin) && (
          <Image className="ml-4" src={BotIcon} alt="Bot image" />
        )}
      </div>
      <div
        className={`rounded-xl  px-3 pt-3 pb-1 ${((isBot || isAdmin) && 'bg-mainDarkLight') || 'bg-[#576CE0]'}`}
      >
        <div
          className=" rounded-xl backdrop-filter backdrop-blur-lg bg-slate-700 bg-opacity-10  px-4 py-2
 mb-2"
        >
          {/* {message && <>{message}</>} */}

          {url ? (
            // <div className='max-w-[200px] max-h-[250px] overflow-hidden'>
            //   <Image
            //     src={url}
            //     alt="Uploaded Image"
            //     width={100}
            //     height={100}
            //     className=" w-full h-full object-contain"
            //     // layout="responsive"
            //   />
            // </div>
            <>{url}</>
          ) : (
            message && <>{message}</>
          )}
        </div>
        <div
          className="text-xs w-full flex justify-end opacity-70
        "
        >
          <h1>{date && date}</h1>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
