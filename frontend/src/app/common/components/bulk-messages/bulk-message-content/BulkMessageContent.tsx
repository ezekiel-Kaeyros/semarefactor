'use client';
import React, { useEffect, useState } from 'react';
import SendMessage from './send-message/SendMessage';
import SavedTemplates from './saved-templates/SavedTemplates';
import History from './history/History';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { BulkMessageTabTypeI } from '@/redux/features/types';

const BulkMessageContent = () => {
  const { bulkMessageTabs,tab1 } = useBolkMessage();
  const [selectedTab, setSelectedTab] = useState<BulkMessageTabTypeI>();
  const findSelectedItems = () => {
    bulkMessageTabs &&
      bulkMessageTabs?.find((tab: BulkMessageTabTypeI) => {
        if (tab.selected === true) {
          setSelectedTab(tab);
          return tab;
        }
      });
  };
           


    const [id, setId] = useState<any>();

    useEffect(() => {
      const id1 = localStorage.getItem('activeTab');
      id1 && setId(id1);
      console.log('tab1',tab1);
      
    }, [tab1]);
    useEffect(() => {
      findSelectedItems();
    }, [bulkMessageTabs]);
    // ;
    // useEffect(() => {

    // }, []);
    return (
      <div className="h-full ">
        {(id && id == '1') || (!id && (tab1 == '1' || tab1=="4")) ? <SendMessage /> : ''}

        {(id && id == '3') || (!id && tab1 == '3') ? <SavedTemplates /> : ''}

        {((id && id == '2') || (!id && tab1 == '2')) && <History />}
      </div>
    );
};

export default BulkMessageContent;
