'use client';
import { Button } from '@/app/common/ui/button/Button';
import TombolaServiceContent from '@/app/common/components/tombola-program/tombola-service-content/TombolaServiceContent';
import TombolaServiceTabs from '@/app/common/components/tombola-program/tombola-service-tabs/TombolaServiceTabs';

import tombolaIcon from '../../../../public/tombola.png';
import React from 'react';
import { useTombolaService } from '@/app/hooks/useTombolaService';
import { changeTab } from '@/redux/features/tombola-slice';

const TombolaService = () => {
  const { tombolaServiceTabs, dispatch } = useTombolaService();

  //   const handleOnClickOpenModal = () => {
  //     dispatch (toggleOpenModal(true))
  //   };

  //   const handleOnClickCloseModal = () => {
  //     dispatch (toggleCloseModal(false))
  //   };
  return (
    <div className="px-[1rem] py-[2rem]">
      <div>
        <h1
          style={{
            fontFamily: 'visby-bold',
          }}
          className="text-[32px]"
        >
          Tombola Promotion
        </h1>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[1rem]">
          <TombolaServiceTabs />
        </div>
        <div>
          <Button
            variant={'mainColor'}
            icon={tombolaIcon}
            leftIcon={true}
            iconSize={30}
            onClick={() => {
              dispatch(changeTab({ id: 4, tabData: tombolaServiceTabs }));
            }}
          >
            Launch a Program
          </Button>
        </div>
      </div>
      <div className="p-[1rem]">
        <TombolaServiceContent />
      </div>
    </div>
  );
};

export default TombolaService;
