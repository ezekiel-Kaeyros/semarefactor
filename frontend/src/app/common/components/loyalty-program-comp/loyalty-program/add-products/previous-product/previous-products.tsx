import React from 'react';
import { previousProduct } from './previous-product';
import editIcon from '@/../../public/icons/edit.svg';
import Image from 'next/image';
import shoppingbag from '../../../../../../../../public/icons/shopping-bag.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type ItemProps = {
  itemTranslation: {
    name: string;
    products: {
      name: string;
      description?: string;
      image_url?: any;
      points: number;
      id?: string;
    }[];
  };
  editCurentItem?: any;
};

const getCurrentDateTime = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate
    .getMilliseconds()
    .toString()
    .padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

const currentDateTime = getCurrentDateTime();
// ;

const PreviousProdct: React.FC<ItemProps> = ({
  itemTranslation,
  editCurentItem,
}) => {
  return (
    <div>
      <div className="bg-[#212529] p-6 flex flex-col gap-y-4 rounded-lg shadow-xl mt-[-25px]">
        <h1 className="text-3xl font-extrabold">Preview Product</h1>
        <div className="space-y-4">
          {itemTranslation?.products?.length === 0 ? (
            <div className="h-[200px] flex items-center">
              <div className="m-auto w-[40%] flex flex-col justify-center items-center">
                <Image src={shoppingbag} alt="shopping bag" className="w-16" />
                <h1 className="text-[#899299] text-xl">No Product added</h1>
              </div>
            </div>
          ) : (
            itemTranslation?.products.map(
              ({ name, description, image_url, points, id }, index) => (
                <div
                  className="bg-[#2B2E31] flex px-4 py-8 justify-between items-center gap-x-10 rounded-xl"
                  key={index}
                >
                  <div
                    className={`${
                      index !== 3 && 'flex'
                    } justify-center items-center gap-x-4`}
                  >
                    <div>
                      {index !== 3 && (
                        <img
                          src={image_url}
                          alt={name}
                          className="w-16"
                          width={50}
                          height={50}
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h1>{name}</h1>
                      <p className="text-[14px]">{description}</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-x-2">
                    <h3>{points}</h3>
                    <Image
                      src={editIcon}
                      alt="edit"
                      onClick={() => editCurentItem(id)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousProdct;
