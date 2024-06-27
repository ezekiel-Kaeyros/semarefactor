import React from 'react';
import { OneObjectType, SelectFieldProps } from './selectField.d';

const SelectField: React.FC<SelectFieldProps> = ({
  title,
  options,
  name,
  register,
  classes,
  labelTextStyle,
  selectCompWidth,
}) => {
  return (
    <div className={`flex flex-col ${selectCompWidth}`}>
      <label
        htmlFor={name}
        className={`block  ${labelTextStyle ? labelTextStyle : 'font-medium text-sm'} mb-3 text-gray-900 dark:text-white`}
      >
        {title}
      </label>
      <select
        name={name}
        {...register}
        id={name}
        className={`${classes ? classes : 'border-gray-300 dark:border-gray-400 border dark:bg-cardDark'} bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full py-4 px-4   dark:placeholder-gray-100 dark:text-white dark:focus:ring-primary dark:focus:border-primary`}
      >
        {options?.map((option: OneObjectType) => (
          <option key={option?.id} value={option?.id}>
            {option?.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
