'use client';
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

function LoaderSpinner() {
  return (
    <div className=" flex w-full h-full justify-center place-items-center">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#2196F3"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default LoaderSpinner;
