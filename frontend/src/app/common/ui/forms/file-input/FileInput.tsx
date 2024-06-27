import React, { useState } from 'react';
import { FileInputProps } from './fileInput.d';
import Image from 'next/image';
import AnimateClick from '../../animate-click/AnimateClick';

const FileInput: React.FC<FileInputProps> = ({ name, register }) => {
  const [file, setFile] = useState<any>();
  function handleChange(e: { target: { files: (Blob | MediaSource)[] } }) {
    // ;
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-cardDark hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div
          className={`flex ${
            file && 'hidden'
          } flex-col items-center justify-center pt-5 pb-6`}
        >
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload an Image</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG (MAX. 800x400px)
          </p>
        </div>
        {file && (
          <div className="h-full w-full relative">
            <div
              onClick={() => setFile(null)}
              className="absolute -top-4 -right-4 h-8 w-8 flex items-center justify-center rounded-full bg-red-700 p-1"
            >
              x
            </div>

            <Image
              width={200}
              className="w-full h-full object-cover"
              height={200}
              src={file}
              alt="File uploaded"
            />
          </div>
        )}
        <input
          {...register}
          disabled={file ? true : false}
          name={name}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default FileInput;
