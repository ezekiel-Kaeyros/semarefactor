import React from 'react';
import { AudioNodeType, ImageNodeType } from './types';
import Image from 'next/image';
import trashIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';

import videoIcon from '../../../../../../../../../../../public/icons/chatbot/video-play.svg';

function VideoNode({ id, deletefc }: AudioNodeType) {
  function deleteMe() {}
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg  nodrag p-2 ">
      <div className=" flex justify-end w-full  pt-2 ">
        <Image
          src={trashIcon}
          alt=""
          width={12}
          height={12}
          className=" nodrag cursor-pointer"
          onClick={() => deletefc(id)}
        />
      </div>
      <div className=" flex justify-center place-items-center">
        <Image
          src={videoIcon}
          alt=""
          width={32}
          height={32}
          className=" nodrag cursor-pointer"
          onClick={() => deletefc(id)}
        />
      </div>
      <div className=" flex justify-center bg-gray-700 w-full text-[12px] py-1.5 mt-2 nodrag rounded-sm ">
        <p>Upload audio</p>
      </div>
    </div>
  );
}

export { VideoNode };
