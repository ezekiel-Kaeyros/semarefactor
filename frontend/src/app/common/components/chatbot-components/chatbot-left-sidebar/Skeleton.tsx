import React from 'react';

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
      <div className="flex  bg-mainDark  w-full items-center">
        <div className="w-14 mr-4 h-12  backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="h-[4.8rem] max-x-md backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-600 animate-pulse w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default Skeleton;
