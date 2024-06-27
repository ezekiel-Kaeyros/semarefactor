import React from 'react';
import { RevenueByLocationCardProps } from './revenueByLocationCard.d';

const RevenueByLocationCard: React.FC<RevenueByLocationCardProps> = ({
  data,
  map,
  title,
}) => {
  const dummy = [
    {
      id: 1,
      city: 'Yaoundé',
      amount: '72k',
      progress: '80',
    },
    {
      id: 2,
      city: 'Douala',
      amount: '80k',
      progress: '90',
    },
    ,
    {
      id: 3,
      city: 'Ngaoundéré',
      amount: '72k',
      progress: '60',
    },
  ];
  return (
    <div className="p-4 w-full h-full bg-white dark:text-slate-900 rounded-xl">
      <h1 className="font-bold text-xl mb-4">{title}</h1>
      <div className="w-full">{map}</div>
      <div className="w-full">
        {dummy?.map((value) => (
          <div className="my-1 w-full" key={value?.id}>
            <div className="w-full flex justify-between items-center">
              <h1>{value?.city}</h1>
              <h1>{value?.amount}</h1>
            </div>
            <div className="w-full mt-2 rounded-full h-1 mb-4 dark:bg-gray-400">
              <div
                className=" h-1 rounded-full dark:bg-blue-500"
                style={{ width: `${value?.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByLocationCard;
