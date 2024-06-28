'use client';
import React from 'react';
import { AddTextNodeType } from './types';
import Image from 'next/image';
import deleteIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';
import tagIcon from '../../../../../../../../../../../public/icons/scenario/tag-2.svg';
import { Handle, Position } from 'reactflow';

function AddButtonNode({
  id,
  deletefc,
  setContent,
  defaultValue,
  isConnectable,
}: AddTextNodeType) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent!(id, e.target.value);
  };
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg flex flex-col  nodrag px-2 pt-1 relative">
      <Handle
        id={id}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: '#FF385D',
          height: 8,
          width: 8,
          borderBlockColor: '#FF385D',
          border: 0,
        }}
      ></Handle>
      <div className=" h-5 w-16 px-2 bg-gray-600 rounded-lg flex items-center justify-between">
        <p className=" text-[10px] ">Button</p>
        <Image
          src={tagIcon}
          alt=""
          width={14}
          height={14}
          className=" nodrag cursor-pointer"
        />
      </div>
      <div className="flex ">
        <textarea
          className=" appearance-none rounded-lg border-none focus:outline-none h-8 w-full font-[visby-medium] p-1.5 bg-mainDarkLight text-[12px]  "
          id={id}
          cols={1}
          defaultValue={defaultValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange!(e)
          }
        ></textarea>
        <Image
          src={deleteIcon}
          alt=""
          width={12}
          height={12}
          className=" nodrag cursor-pointer"
          onClick={() => deletefc(id)}
        />
      </div>
    </div>
  );
}

export { AddButtonNode };
