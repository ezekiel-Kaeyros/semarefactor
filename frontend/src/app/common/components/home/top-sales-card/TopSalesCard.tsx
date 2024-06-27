import React from 'react';
import { TopSalesCardProps } from './topSalesCard.d';

const TopSalesCard: React.FC<TopSalesCardProps> = ({ data, graph, title }) => {
  const dummy = [
    {
      id: 1,
      salesChannel: 'Kiosk',
      amount: '20 000 XAF',
    },
    {
      id: 2,
      salesChannel: 'Mini-Market',
      amount: '20 000 XAF',
    },
    {
      id: 3,
      salesChannel: 'Supermarket',
      amount: '20 000 XAF',
    },
  ];

  return (
    <div className="bg-white rounded-xl dark:text-slate-900 p-4 w-full">
      <h1 className="font-bold text-xl mb-4">{title}</h1>
      <div className="w-full">{graph}</div>
      <div className="mt-2">
        {dummy?.map((value) => (
          <div key={value?.id}>
            <div className="flex justify-between w-full space-x-2">
              <div className="flex items-center">
                <span className="w-1 h-1 mr-2 bg-slate-500" />
                <h1>{value?.salesChannel}</h1>
              </div>
              <div>{value?.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSalesCard;
