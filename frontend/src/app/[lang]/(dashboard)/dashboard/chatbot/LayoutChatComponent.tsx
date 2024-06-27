// import ChatbotLeftSidebar from '@/app/common/components/chatbot-components/chatbot-left-sidebar/chatbotLeftSidebar2';

import ChatbotLeftSidebar from '@/app/common/components/chatbot-components/chatbot-left-sidebar/ChatbotLeftSidebar2';
import React from 'react';

const LayoutChatComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen-minus-80 dark:bg-mainDark">
      <div className="h-full ">
        <ChatbotLeftSidebar />
      </div>
      <div className={`md:block flex-grow flex h-full overflow-y-auto`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutChatComponent;
