'use client';
import { useTombolaService } from '@/app/hooks/useTombolaService';
import { TombolaServiceTabTypeI } from '@/redux/features/types';
import React from 'react';
import { TombolaServiceTabType } from './tombola-service-tab/tombolaServiceTab.d';
import TombolaServiceTab from './tombola-service-tab/TombolaServiceTab';

const TombolaServiceTabs = () => {
  const {
    tombolaServiceTabs,
  }: { dispatch: any; tombolaServiceTabs: TombolaServiceTabTypeI[] } =
    useTombolaService();

  return (
    <>
      {tombolaServiceTabs &&
        tombolaServiceTabs?.map((tab: TombolaServiceTabType) => (
          <TombolaServiceTab
            tabData={tombolaServiceTabs}
            key={tab?.id}
            id={tab?.id}
            label={tab?.label}
            selected={tab?.selected}
          />
        ))}
    </>
  );
};

export default TombolaServiceTabs;
