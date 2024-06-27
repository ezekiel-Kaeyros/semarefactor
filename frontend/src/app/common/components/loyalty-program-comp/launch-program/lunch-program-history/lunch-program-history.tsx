import React from 'react';
import { LunchProgramHistoryIcon } from '../Icons';
// import { Button } from '../../../button/Button';

function LunchProgramHistory() {
  return (
    <div className="w-[20%] mx-auto">
      <div className="space-y-6">
        <div className="m-auto flex justify-center items-center">
          <LunchProgramHistoryIcon />
        </div>
        <div className="">
          <div className="flex items-center gap-x-2 justify-center">
            <p>No History</p>
          </div>
          <p className="w-[90%] m-auto text-center mt-2">
            Get started by creating a loyalty Progam
          </p>
        </div>
      </div>
    </div>
  );
}

export default LunchProgramHistory;
