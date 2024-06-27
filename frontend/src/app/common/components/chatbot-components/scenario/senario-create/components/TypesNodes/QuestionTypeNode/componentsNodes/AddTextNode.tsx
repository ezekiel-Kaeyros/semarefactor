import React from 'react';
import { AddTextNodeType } from './types.d';
import Image from 'next/image';
import editIcon from '../../../../../../../../../../../public/icons/chatbot/edit.svg';

function AddTextNode({
  id,
  deletefc,
  setContent,
  defaultValue,
}: AddTextNodeType) {
  function deleteMe() {}
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg flex nodrag px-2 ">
      <textarea
        className=" appearance-none rounded-lg border-none focus:outline-none h-8 w-full font-[visby-medium] p-1.5 bg-mainDarkLight text-[12px]  "
        id={id}
        cols={1}
        defaultValue={defaultValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent!(id, e.target.value)
        }
      ></textarea>
      <Image
        src={editIcon}
        alt=""
        width={12}
        height={12}
        className=" nodrag cursor-pointer"
        // onClick={() => deletefc(id)}
      />
    </div>
  );
}

export { AddTextNode };
