import React from 'react';

type TextAreaProps = {
  props: any;
  name: string;
  placeholder: string;
};

const TextArea: React.FC<TextAreaProps> = ({ props, name, placeholder }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {placeholder}
      </label>
      <textarea
        id={placeholder}
        rows={4}
        name={name}
        {...props}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Description"
      ></textarea>
    </>
  );
};

export default TextArea;
