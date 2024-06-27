import Image from 'next/image';
import React, { useState } from 'react';

export interface FilterActionsProps {
  active: boolean;
  company: string;
  company_id: string;
  description: {}[];
  interactive_labels: {
    parent: string;
    child: {
      parent: string;
      child: {
        parent: string;
        child: {
          parent: string;
          child: {}[];
        }[];
      };
    }[];
  }[];
  keywords: [];
  phone_number_id: string;
  title: string;
  users: {}[];
  times: number;
  _id: string;
}

type InputFieldProps = {
  register?: any;
  icon?: any;
  title?: string;
  width?: any;
  height?: any;
  style?: string;
  name?: any;
  placeholder?: any;
  type?: any;
  reference?: any;
  func?: any;
  numberI?: any;
  classes?: string;
  labelTextStyle?: string;
  scenarios: FilterActionsProps[];
  onFilterChange: (filteredScenarios: FilterActionsProps[]) => void;
};

// interface filterProps {
//   scenarios: any[];
//   onFilterChange: (filteredScenarios: any[]) => void;
// }

const FilterInputField: React.FC<InputFieldProps> = ({
  register,
  title,
  name,
  icon,
  placeholder,
  type,
  classes,
  width,
  height,
  reference,
  style,
  scenarios,
  onFilterChange,
}) => {
  const [searchScenario, setSearchScenario] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchScenario(newSearchTerm);

    const filteredScenarios = scenarios.filter((scenario) =>
      scenario?.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    onFilterChange(filteredScenarios);
  };

  return (
    <div className={`relative w-full ${classes}`}>
      {title && (
        <label
          className={` font-bold block mb-3 text-gray-700 dark:text-white`}
          htmlFor={name}
        >
          {title}
        </label>
      )}
      <input
        className={`appearance-none dark:bg-mainDarkLight focus:dark:outline-primary dark:text-white focus:dark:bg-mainDarkLight border border-slate-700 relative w-full leading-tight bg-transparent  rounded-xl py-4 pl-12 ${icon ? 'px-12 pr-16' : 'px-6'}  focus:border-primary' focus:outline-none`}
        id={name}
        type={type ? type : 'text'}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={false}
        style={{
          fontFamily: 'visby-regular',
        }}
        {...register}
        value={searchScenario}
        onChange={handleSearchChange}
      />
      {icon && (
        <Image
          className="absolute ml-4 mt mt-auto mb-auto left-0 right-0 top-0 bottom-1"
          src={icon}
          alt="Icon"
          width={width ? width : 30}
          height={height ? height : 30}
        />
      )}
    </div>
  );
};

export default FilterInputField;
