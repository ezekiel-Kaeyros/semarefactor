import React, { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-transparent rounded-xl w-full py-8 px-8 overflow-y-hide">
      {children}
    </div>
  );
};

export default Card;
