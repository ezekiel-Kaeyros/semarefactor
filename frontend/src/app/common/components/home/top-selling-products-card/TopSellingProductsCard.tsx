'use client';
import React from 'react';
import { TopSalesCardProps } from '../top-sales-card/topSalesCard.d';
import { TopSellingProductsCardProps } from './topSellingProductsCard.d';

const TopSellingProductsCard: React.FC<TopSellingProductsCardProps> = ({
  title,
}) => {
  return (
    <div className="relative rounded-xl dark:bg-white p-4 h-full overflow-x-auto">
      <h1 className="mb-4 font-bold text-xl dark:text-slate-900">{title}</h1>
      <table className="w-full h-fit p-2 text-sm text-left  text-gray-500 dark:text-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="dark:bg-white">
          <tr className="bg-white border-b dark:bg-white dark:border-gray-400">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-900"
            >
              BRR Sh 16g
            </th>
            <td className="px-6 py-4">1000 XAF</td>
            <td className="px-6 py-4">82</td>
            <td className="px-6 py-4">82 000 XAF</td>
          </tr>
          <tr className="bg-white border-b dark:bg-white dark:border-gray-400">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-900"
            >
              Peak 78g
            </th>
            <td className="px-6 py-4">2 000 XAF</td>
            <td className="px-6 py-4">37</td>
            <td className="px-6 py-4">74 000 XAF</td>
          </tr>
          <tr className="bg-white dark:bg-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-900"
            >
              Peak IVMP 400g
            </th>
            <td className="px-6 py-4">3 000 XAF</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">30 000 XAF</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingProductsCard;
