import ChatUI from '@/app/common/components/chatbot-components/chatbot-inner-content/chat-ui/chatUi';
import React from 'react';
import LayoutChatComponent from '../LayoutChatComponent';

const page = ({ params }: { params: { id: string } }) => {
  return <ChatUI id={params?.id} />;
};

export default page;
