'use client';

import Image from 'next/image';
import React from 'react';

type Props = {
  type: string;
  title: string;
  id: string;
  placeholder: string;
  name: string;
  icon?: any;
  props?: any;
  value?: any;
  disabled?: boolean;
  img?: any;
  isValid?: boolean;
  min?: string;
  max?: string;
  change?: any;
};

const InputFieldPayment: React.FC<Props> = ({
  type,
  icon,
  title,
  name,
  id,
  placeholder,
  props,
  value,
  disabled,
  img,
  isValid,
  min,
  max,
  change,
}) => {
  return (
    <div
      className={`relative w-full h-full bg-[#2B2E31] rounded-xl flex justify-between ${isValid ? 'border border-red-400' : 'border-none'}`}
    >
      <label
        className="text-sm font-bold mb-2 absolute top-[12px] left-4"
        htmlFor={id}
      >
        {title ? title : ''}
      </label>
      {icon ? (
        <div className="absolute mr-10 text-gray-400 inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      ) : (
        ''
      )}

      <input
        name={name}
        type={type}
        {...props}
        id={id}
        disabled={disabled}
        value={value}
        className={` ${
          isValid ? 'border-red-600 bg-red-100' : 'boder-[#E9ECEF]  '
        } 
        ${
          img && img !== '' ? 'w-[95%]' : 'w-full '
        }  pt-10 text-base pl-4 h-full bg-transparent focus:outline-none focus:ring-1 sm:text-sm focus:ring-transparent  block   p-2.5 placeholder:text-sm sm:placeholder:text-lg appearance-none	`}
        placeholder={placeholder}
        // required
        min={min ? min : ''}
        max={max ? max : ''}
      />

      {!icon && img && img !== '' ? (
        <Image className=" h-[80%] mt-2  mr-3" src={img} alt="" />
      ) : (
        ''
      )}
    </div>
  );
};

export default InputFieldPayment;
