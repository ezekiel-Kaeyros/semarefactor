import React from 'react';

type PasswordFieldProps = {
  props?: any;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ props }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative w-full">
      <label
        className="font-medium block mb-1 mt-6 text-gray-700"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
        id="password"
        type={isVisible ? `text` : 'password'}
        autoComplete="off"
        {...props}
      />
      <div className="absolute inset-y-0 right-0 top-7 flex items-center px-2">
        <label
          onClick={() => setIsVisible(!isVisible)}
          className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
          htmlFor="toggle"
        >
          {isVisible ? 'Hide' : 'Show'}
        </label>
      </div>
    </div>
  );
};

export default PasswordField;
