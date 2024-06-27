import React from 'react';
import moreIcon from '../../../../../../../../../public/icons/chatbot/more.svg';
import messageIcon from '../../../../../../../../../public/icons/chatbot/message-text.svg';
import editIcon from '../../../../../../../../../public/icons/chatbot/edit.svg';
import trashIcon from '../../../../../../../../../public/icons/chatbot/trash.svg';
import hierachyIcon from '../../../../../../../../../public/icons/chatbot/hierarchy.svg';
import copyIcon from '../../../../../../../../../public/icons/chatbot/copy.svg';

import Image from 'next/image';
import { LayoutNodeType } from './types';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { cn } from '@/utils/utils';

function LayoutTypesNode({
  icon,
  title,
  children,
  color,
  data,
  duplicate,
  deleteNode,
}: LayoutNodeType) {
  return (
    <div className=" w-[13rem] ">
      <div
        className={cn(
          `w-full px-3 flex justify-between p-2 bg-blue-message-primary rounded-t-md`,
          color
        )}
      >
        <div className="flex justify-center place-items-center gap-3">
          {icon}
          <h1 className=" text-white text-xs ">{title}</h1>
        </div>

        <Dropdown placement="right-start" className=" mt-5">
          <DropdownTrigger>
            <Image
              src={moreIcon}
              alt="ddf"
              className=" nodrag cursor-pointer "
              width={16}
              height={16}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" className="">
              <div className=" flex gap-2 place-items-center">
                <Image
                  src={editIcon}
                  alt="ddf"
                  className=" nodrag cursor-pointer "
                />
                <p className=" pt-1.5">Edit</p>
              </div>
            </DropdownItem>
            <DropdownItem key="copy" onClick={() => deleteNode!()}>
              <div className=" flex gap-2 place-items-center">
                <Image
                  src={trashIcon}
                  alt="ddf"
                  className=" nodrag cursor-pointer "
                />
                <p className=" pt-1.5">Delete</p>
              </div>
            </DropdownItem>
            <DropdownItem key="edit">
              <div className=" flex gap-2 place-items-center">
                <Image
                  src={hierachyIcon}
                  alt="ddf"
                  className=" nodrag cursor-pointer "
                />
                <p className=" pt-1.5">Set as start node</p>
              </div>
            </DropdownItem>
            {/* <DropdownItem key="duplicate" onClick={() => duplicate!()}>
              <div className=" flex gap-2 place-items-center">
                <Image
                  src={copyIcon}
                  alt="ddf"
                  className=" nodrag cursor-pointer "
                />
                <p className=" pt-1.5">Duplicate</p>
              </div>
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div>{children}</div>
    </div>
  );
}

export { LayoutTypesNode };
