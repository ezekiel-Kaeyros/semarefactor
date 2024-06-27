import React from 'react';
import { DiamondLaunchProgramIcon } from '../Icons';
// import { Button } from '../../../button/Button';
import { Button } from '@/app/common/ui/button/Button';

function ActiveProgram() {
  return (
    <div className="w-[20%] mx-auto">
      <div className="space-y-6">
        <div className="m-auto flex justify-center items-center">
          <DiamondLaunchProgramIcon />
        </div>
        <div className="">
          <div className="flex items-center gap-x-2 justify-center">
            Welcome to <h1 className="font-extrabold">Loyalty Program</h1>
          </div>
          <p className="w-[90%] m-auto text-center mt-2">
            Get Started by seleting price to remunerate your loyal customers
          </p>
        </div>
        <Button href={`/loyalty-program?step=2`} className="">
          <h1 className="pt-1">Launch a Program</h1>
        </Button>
      </div>
    </div>
  );
}

export default ActiveProgram;
