import React, { useState } from 'react';
import DesignIcon from '../../../../../../../../public/tombola/Design 1.svg';
import Image from 'next/image';
import { Button } from '@/app/common/ui/button/Button';

const CardActiveProgram = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="2xl:w-[20%] w-[25%] max-md:w-[90%]   mt-20 flex flex-col items-center ">
          <Image alt="" src={DesignIcon} />
          <h3 className="text-[18px]">
            Welcome to <strong>Tombola Program</strong>
          </h3>
          <p className="flex text-center text-[16px]">
            Get started by selecting price to remunerate your loyal customers
          </p>
          <div className="w-2/2 mt-2">
            <Button variant={'mainColor'}>Launch Tombola</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardActiveProgram;
