import Image from 'next/image';
import React from 'react';
interface InputModalNodeProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  placehoder?: string;
}
function InputModalNode(props: InputModalNodeProps) {
  return (
    <div className=" w-full flex bg-mainDarkLight p-4 place-items-center rounded-xl">
      <div className=" ">{props.icon}</div>
      <input
        {...props}
        type="text"
        className=" flex-grow bg-mainDarkLight appearance-none focus:outline-none px-3"
        placeholder={props.placehoder}
      />
    </div>
  );
}

export { InputModalNode };
