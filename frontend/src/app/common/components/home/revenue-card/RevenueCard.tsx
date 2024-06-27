import React from 'react';
import { RevenueCardProps } from './revenueCard.d';

const RevenueCard: React.FC<RevenueCardProps> = ({
  content,
  currentWeekAmount,
  previousWeekAmount,
  title,
}) => {
  return (
    <div className="bg-white w-full rounded-xl p-4 dark:text-slate-900">
      <div className="flex items-center mb-4">
        <h1 className="font-bold text-xl ">{title}</h1>
        <div className="w-7/12 ml-8 flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <span className="w-1 h-1 rounded-full bg-slate-900"></span>
            <h2 className="flex">
              Current week{' '}
              <h1 className="font-bold ml-1">{currentWeekAmount}</h1>
            </h2>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="w-1 h-1 rounded-full bg-slate-900"></span>
            <h2 className="flex">
              Previous week
              <h1 className="font-bold ml-1">{previousWeekAmount}</h1>
            </h2>
          </div>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default RevenueCard;
