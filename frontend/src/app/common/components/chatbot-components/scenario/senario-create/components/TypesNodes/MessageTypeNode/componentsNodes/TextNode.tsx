import React from 'react';
import { TextNodeType } from './types';
import Image from 'next/image';
import trashIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';

function TextNode({ id, deletefc, setContent, defaultValue }: TextNodeType) {
  function deleteMe() {}
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg flex nodrag p-2">
      <textarea
        className=" appearance-none rounded-lg border-none focus:outline-none h-10 w-full font-[visby-medium]  bg-mainDarkLight text-[10px] line-clamp-2 p-2 "
        id={id}
        cols={2}
        defaultValue={defaultValue}
        // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //   debugger;
        //   setContent!(id, e.target.value);
        // }}
        onChange={(e) => setContent!(id, e.target.value)}
      ></textarea>
      <Image
        src={trashIcon}
        alt=""
        width={12}
        height={12}
        className=" nodrag cursor-pointer"
        onClick={() => deletefc(id)}
      />
    </div>
  );
}

export { TextNode };
