import React from 'react';

import emptyHistoryIcon from '../../../../../../../../public/emptyHistory.png';
import Image from 'next/image';
import EmptyUIComp from '@/app/common/components/bulk-messages/empty-ui/EmptyUI';
import { IStatistique } from './dataStat';

const StatContent = ({
  initialStatistiques,
}: {
  initialStatistiques: IStatistique[];
}) => {
  return (
    <>
      <div className="flex flex-row gap-5">
        {initialStatistiques.map((statItem: IStatistique) => {
          return (
            <>
              <div className="rounded-md p-2 min-w-[150px] bg-[#2B2E31]">
                <span className="flex justify-between">
                  <h1 className="text-[20px]">{statItem.nameStat}</h1>
                  <Image src={statItem.iconStat} alt="" />
                </span>
                <span className="flex">
                  <p className="mr-1 text-[16px]">{statItem.status}</p>
                  <Image src={statItem.infoIcon} alt="" />
                </span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default StatContent;
