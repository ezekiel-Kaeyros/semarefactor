import React from 'react';
import Image from 'next/image';

import { StatisticsCardProps } from './statisticsCard.d';
import IncreaseIcon from '../../../../../../public/icons/riseIcon.svg';
import DecreaseIcon from '../../../../../../public/icons/riseDownIcon.svg';

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  content,
  percentage,
  title,
  type,
  color,
}) => {
  return (
    <div
      className={`${
        color ? color : 'bg-slate-100'
      }  rounded-xl flex flex-col justify-between dark:text-slate-700 p-6 w-full`}
    >
      <h1 className="font-bold text-2xl mb-4">{title}</h1>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">{content}</h3>
        <h6 className="text-sm flex">
          {percentage}
          <span className="ml-2">
            <Image
              src={(type = 'increase' ? IncreaseIcon : DecreaseIcon)}
              alt="Increase or decrease graph"
            />
          </span>
        </h6>
      </div>
    </div>
  );
};

export default StatisticsCard;
