import React, { useEffect, useRef, useState } from 'react';
import { ImageNodeType } from './types';
import Image from 'next/image';
import trashIcon from '../../../../../../../../../../../public/icons/chatbot/trash.svg';

import galleryIcon from '../../../../../../../../../../../public/icons/chatbot/gallery-import.svg';
import { ChatbotService } from '@/services';
import LoaderSpinner from '@/app/common/ui/loaderSpinner';

function ImageNode({ id, deletefc, defaultValue, setContent }: ImageNodeType) {
  function deleteMe() {}
  const [files, setFiles] = useState<File>();
  const [filesState, setFilesState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setLoading(true);
      setFiles(event.target.files[0]);

      const response = await new ChatbotService().uploadImage({
        file: event.target.files[0],
      });
      if (response.fileUrl) {
        setContent!(id, response.fileUrl);
        setFilesState(!filesState);
      }
      setLoading(false);
    }
  };
  useEffect(() => {}, [filesState]);
  return (
    <div className="bg-mainDarkLight  w-full rounded-lg  nodrag p-2 nodrag ">
      <div className="  justify-end w-full  pt-2 hidden ">
        <Image
          src={trashIcon}
          alt=""
          width={12}
          height={12}
          className=" nodrag cursor-pointer"
          onClick={() => setContent!(id, undefined)}
        />
      </div>
      <div className=" flex justify-center place-items-center">
        <div className={` ${!loading ? 'hidden' : 'block'} `}>
          <LoaderSpinner />
        </div>

        <Image
          src={defaultValue === ' ' ? galleryIcon : defaultValue}
          alt=""
          width={32}
          height={32}
          className={`${defaultValue === ' ' ? '' : ' w-full h-hull object-cover  p-1 rounded-2xl '} ${loading && 'hidden'}  nodrag cursor-pointer`}
        />
      </div>
      <div className="">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <div
          onClick={handleButtonClick}
          className=" flex justify-center bg-gray-700 w-full text-[12px] py-1.5 mt-2 nodrag rounded-sm cursor-pointer  "
        >
          <p>Upload image</p>
        </div>
      </div>
    </div>
  );
}

export { ImageNode };
