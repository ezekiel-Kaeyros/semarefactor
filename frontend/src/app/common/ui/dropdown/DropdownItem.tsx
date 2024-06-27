import Link from 'next/link';
import React, { ReactNode } from 'react';

type DropdownItemProps = {
  href: string;
  children: ReactNode;
};
const DropdownItem: React.FC<DropdownItemProps> = ({ href, children }) => {
  return (
    <Link className="px-2 py-1 text-white hover:bg-slate-300" href={href}>
      {children}
    </Link>
  );
};

export default DropdownItem;
