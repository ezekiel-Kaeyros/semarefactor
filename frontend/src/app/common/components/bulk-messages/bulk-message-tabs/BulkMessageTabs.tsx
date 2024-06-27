'use client';
import React, { useEffect, useState } from 'react';
import { BulkMessageTabType } from './bulk-message-tab/bulkMessageTab.d';
import BulkMessageTab from './bulk-message-tab/BulkMessageTab';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { BulkMessageTabTypeI } from '@/redux/features/types';

const tabDataAll = [
  {
    id: 1,
    label: 'Send Message',
    selected: true,
  },
  {
    id: 2,
    label: 'History ',
    selected: false,
  },
  {
    id: 3,
    label: 'Templates',
    selected: false,
  },
];

const BulkMessageTabs = () => {
   const {
     bulkMessageTabs,
     tab1,
   }: { dispatch: any; bulkMessageTabs: BulkMessageTabTypeI[]; tab1: string } =
     useBolkMessage();
  const [id, setId] = useState<any>(tab1);
 

  useEffect(() => {
    const id = localStorage.getItem('activeTab');
    id && setId(id);
     console.log('id',id);
console.log(tab1);
    
  }, [tab1]);
  return (
    <div className="flex gap-4">
      {tabDataAll &&
        tabDataAll?.map((tab: BulkMessageTabType) => (
          <BulkMessageTab
            tabData={bulkMessageTabs}
            key={tab?.id}
            id={tab?.id}
            label={tab?.label}
            selected={
              id == '4' && '1' == tab.id.toString()
                ? true
                : id == tab.id.toString()
            }
          />
        ))}
    </div>
  );
};

export default BulkMessageTabs;
