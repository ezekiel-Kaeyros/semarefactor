import Image from 'next/image';
import React, { ChangeEvent } from 'react';

interface InputFieldClusterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  icon?: string;
  title?: string;
}

const InputFieldCluster: React.FC<InputFieldClusterProps> = ({
  register,
  title,
  name,
  icon,
  placeholder,
}) => {
  return (
    <div className="relative w-full pt-[12px] pb-[14px]">
      {title && (
        <label
          className="font-medium block mb-1 mt-6 text-gray-700"
          htmlFor={name}
        >
          {title}
        </label>
      )}
      <input
        className="appearance-none relative border rounded-xl w-full py-4 pl-[0.75rem] leading-tight border-gray-300 bg-white focus:outline-none focus:border-primary focus:white:bg-white dark:text-[#6C757D] text-color-[#6C757D]"
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus
        {...register}
      />
      {icon && (
        <Image
          className="absolute ml-4 mt-auto mb-auto left-0 right-0 top-0 bottom-0"
          src={icon}
          alt="Icon"
        />
      )}
    </div>
  );
};

export default InputFieldCluster;
