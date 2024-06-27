import React, { useState } from 'react';
import Image from 'next/image';
import dropdownIcon from '../../../../../../../../public/left_side_bar_icons/dropdown.png';
import { TownsFitlerProps } from './ChatFilter.d';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';

const ChatFilter: React.FC<TownsFitlerProps> = ({ handleSelect, options }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative">
      <AnimateClick>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="py-3 px-4 bg-mainDarkLight flex justify-between  rounded-md h-[50px] min-w-[130px]"
        >
          {/* Selected value */}
          <div className="flex items-center gap-x-2">
            <div className="">{selected?.town}</div>
            <Image className="w-4" alt="Dropdown icon" src={dropdownIcon} />
          </div>
        </div>
      </AnimateClick>

      {/* Dropdown section */}
      {toggle && (
        <div className="rounded-md py-4 px-2 mt-2 shadow-lg z-10 bg-mainDarkLight absolute left-0 right-0">
          {options
            ?.filter((town) => town.id !== options[0].id)
            .filter((town) => town.id !== selected.id)
            .map((option, key) => (
              <AnimateClick key={key}>
                <div
                  className="py-2 px-2 flex justify-between rounded-md hover:bg-mainDark cursor-pointer hover:w-full"
                  onClick={() => {
                    handleSelect && handleSelect(option?.town),
                      setSelected(option),
                      setToggle((prev) => !prev);
                  }}
                >
                  {option?.town}
                </div>
              </AnimateClick>
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatFilter;
