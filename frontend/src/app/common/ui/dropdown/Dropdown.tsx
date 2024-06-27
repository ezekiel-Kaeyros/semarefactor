import React, { useState } from 'react';
import DropdownItem from './DropdownItem';
import Image from 'next/image';

type dataType = {
  href: string;
  title: string;
  type: string;
};

type DropdownProps = {
  title: string;
  image?: any;
  subItems: Array<dataType>;
};

const Dropdown: React.FC<DropdownProps> = ({ subItems, title, image }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div onClick={() => setToggle(!toggle)}>
        {title ? <>{title}</> : <Image src={image} alt="Image" />}
      </div>
      {toggle
        ? subItems?.map((el: any) => (
            <DropdownItem key={el?.id} href={`${el?.href}`}>
              {el.title}
            </DropdownItem>
          ))
        : ''}
    </>
  );
};

export default Dropdown;
