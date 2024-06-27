import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
interface SelectModalNodeProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
  placehoder?: string;
}
function SelectModalNode(props: SelectModalNodeProps) {
  return (
    <div className=" w-full flex bg-mainDarkLight  place-items-center rounded-xl">
      <div className="px-4 ">{props.icon}</div>
      <Select
        onChange={(e) => props.onChange!(e)}
        label={props.placehoder}
        className=" flex-grow  bg-mainDarkLight selectNode rounded-xl "
      >
        <SelectItem key={2} value={'interger'}>
          Integer
        </SelectItem>
        <SelectItem key={32} value={'Float'}>
          Float
        </SelectItem>
        <SelectItem key={3} value={'String'}>
          String
        </SelectItem>
      </Select>
    </div>
  );
}

export { SelectModalNode };
