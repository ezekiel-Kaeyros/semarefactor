import ChatUI from '@/app/common/components/chatbot-components/chatbot-inner-content/chat-ui/chatUi';
import CreateMaps from '@/app/common/components/chatbot-components/scenario/senario-create/CreateMaps';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className=" h-[80vh] w-full">
      <CreateMaps id={params?.id} />
    </div>
  );
};

export default page;
