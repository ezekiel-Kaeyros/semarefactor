import React, { useState, useEffect } from 'react';
import { ChatbotTopSectionProps } from './ChatbotTopSection.d';

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

const CountdownTimer = ({ selectedChat }: ChatMessages) => {
  let startDate;
  if (selectedChat?.chat_messages) {
    let chats = [...selectedChat?.chat_messages];
    chats = chats.reverse();
    const index = chats.findIndex((chat) => !chat.is_bot);
    startDate = new Date(chats[index].date!);
  } else {
    startDate = new Date();
  }

  const chatTimer = (startDate: Date, endDate: Date) => {
    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const wholeTime = Math.floor(diff / 1000 / 60);
    let hours = 23 - Math.floor(wholeTime / 60);
    let mins = 60 - (wholeTime % 60);

    if (hours < 0) {
      hours = 0;
      mins = 0;
    }
    let result = `${hours}`.length < 2 ? `-0${hours}:` : `-${hours}:`;
    result += `${mins}`.length < 2 ? `0${mins}` : `${mins}`;

    return result;
  };

  const timer = chatTimer(startDate, new Date());

  return (
    <div>
      <h1 className="text-xl">{timer}</h1>
    </div>
  );
};

export default CountdownTimer;
