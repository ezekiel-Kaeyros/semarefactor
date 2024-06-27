'use client';
import { useTombolaService } from '@/app/hooks/useTombolaService';
import { changeTab } from '@/redux/features/tombola-slice';
import { TombolaServiceTabTypeI } from '@/redux/features/types';
import React from 'react';
import { TombolaServiceTabType } from './tombolaServiceTab.d';

const TombolaServiceTab: React.FC<TombolaServiceTabType> = ({
  tabData,
  id,
  label,
  selected,
  func,
}) => {
  const { dispatch }: { dispatch: any } = useTombolaService();

  const data = {
    tabData,
    id,
  };

  return (
    <span
      onClick={() => dispatch(changeTab(data))}
      className={`${selected ? 'border-b-[2px] border-mainColor' : ''} flex items-center cursor-pointer transition-all duration-300 ease-in-out delay-150`}
    >
      {label}
    </span>
  );
};

export default TombolaServiceTab;
