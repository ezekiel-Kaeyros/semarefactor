import React from 'react';

type EmailFieldProps = {
  props?: any;
};
const EmailField: React.FC<EmailFieldProps> = ({ props }) => {
  return (
    <>
      <label
        className="font-medium block mb-1 mt-6 text-gray-700"
        htmlFor="username"
      >
        Email
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
        id="email"
        type="email"
        placeholder="johndoe@gmail.com"
        autoComplete="off"
        autoFocus
        name={'email'}
        {...props}
      />
    </>
  );
};

export default EmailField;
