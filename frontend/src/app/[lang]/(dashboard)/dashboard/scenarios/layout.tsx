import Link from 'next/link';
import React, { ReactNode } from 'react';
import PlusIcon from '../../../../../../../public/icons/chatbot/plusIcon.svg';
import Image from 'next/image';
import { Button } from '@/app/common/ui/button/Button';
import ScenarioHeader from '@/app/common/components/chatbot-components/scenario/scenario-header/ScenarioHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="m-8">
      <ScenarioHeader />
      {children}
    </div>
  );
};

export default Layout;
