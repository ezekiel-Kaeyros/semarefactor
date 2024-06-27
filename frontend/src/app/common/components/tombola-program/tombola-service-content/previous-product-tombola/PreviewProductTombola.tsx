import React from 'react';
// import { previousProduct } from './previous-product';
import editIcon from '@/../../public/icons/edit.svg';
import Image from 'next/image';

type ItemObject = {
  name: string;
  des: string;
  Img: any;
  id: number;
};

type ItemProps = {
  items?: ItemObject[];
  editCurentItem: any;
};

const PreviewProdctTombola: React.FC<ItemProps> = ({
  items,
  editCurentItem,
}) => {
  return (
    <div>
      <div className="bg-[#212529] p-6 flex flex-col gap-y-4 rounded-lg shadow-xl mt-[-25px]">
        <h1 className="text-2xl font-extrabold">Preview Product</h1>
        <div className="space-y-4">
          {items && items?.length === 0 ? (
            <p>there is nothing here dude</p>
          ) : (
            items?.map(({ id, name, des, Img }) => (
              <div
                className="bg-[#2B2E31] flex px-4 py-8 justify-between items-center gap-x-10 rounded-xl"
                key={id}
              >
                <div
                  className={`${
                    id !== 4 && 'flex'
                  } justify-center items-center gap-x-4`}
                >
                  <div>
                    {id !== 4 && (
                      <img
                        src={URL.createObjectURL(Img)}
                        alt={name}
                        className="w-16"
                        width={50}
                        height={50}
                      />
                      // <Img />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h1>{name}</h1>
                    <p className="text-[14px]">{des}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <Image
                    src={editIcon}
                    alt="edit"
                    onClick={() => editCurentItem(id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewProdctTombola;
