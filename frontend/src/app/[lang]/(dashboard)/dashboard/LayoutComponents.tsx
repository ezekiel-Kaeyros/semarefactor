'use client';
import DashBoadHeader from '@/app/common/components/chatbot-components/DashBoadHeader/DashBoadHeader';
import Sidebar from '@/app/modules/sidebar/Sidebar';
import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const LayoutComponents = ({
  children, // params: { lang },
}: {
  children: React.ReactNode;
  // params: { lang: string };
}) => {

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />
      <div className={` flex-grow  relative h-full pt-20  overflow-auto `}>
        <DashBoadHeader />
        {children}
      </div>
    </div>
  );
};

export default LayoutComponents;
