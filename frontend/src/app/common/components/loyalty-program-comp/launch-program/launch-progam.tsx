import React, { useState } from 'react';
import { LaunchProgramIcon } from './Icons';
import { Button } from '@/app/common/ui/button/Button';
import ActiveProgram from './active-program/active-program';
import LunchProgramHistory from './lunch-program-history/lunch-program-history';
// import ProgramInfo from './program-info/program-info';
import ProgramInfo from './program-info/program-info';

const ProgramTitle = [
  {
    id: 1,
    label: 'Active Program',
    selected: true,
    step: '1',
  },
  {
    id: 2,
    label: 'Program Info',
    selected: false,
    step: '2',
  },
  {
    id: 3,
    label: 'History',
    selected: false,
    step: '3',
  },
];

interface LoyalyProgramTitleProps {
  id: number;
  label: string;
  selected: boolean;
  step: string;
}

function LauncProgam() {
  const [loyalyProgramTitle, setLoyalyProgramTitle] =
    useState<LoyalyProgramTitleProps[]>(ProgramTitle);
  const [currentTitleId, setCurrentTitleId] = useState<number>(1);

  const selectedTitle = (id: number) => {
    const value = loyalyProgramTitle.map((step) => {
      if (step.id === id) {
        return { ...step, selected: true };
      }
      return { ...step, selected: false };
    });
    setLoyalyProgramTitle(value);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-10 px-10">
        <div className="flex gap-x-5">
          {loyalyProgramTitle.map(({ id, label, selected, step }) => (
            <div key={id} className="">
              <Button
                className={`px-0 pt-0 pb-1 bg-trasparent justify-start ${
                  selected
                    ? 'border-b-2 border-b-[#2196F3] rounded-none'
                    : 'opacity-50 hover:opacity-50'
                }`}
                onClick={() => {
                  selectedTitle(id), setCurrentTitleId(id);
                }}
              >
                <div
                  className={`pt-[1.8px] font-extrabold text-white flex items-center gap-x-2`}
                >
                  <div className="">
                    <h1 className="pt-1">{label}</h1>
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
        <div>
          <Button href={`/dashboard/loyalty-program?step=1`}>
            <div className="flex items-center gap-x-2">
              <LaunchProgramIcon />
              <h1 className="pt-1">Launch a Program</h1>
            </div>
          </Button>
        </div>
      </div>

      <div>
        {currentTitleId === 1 ? (
          <ActiveProgram />
        ) : currentTitleId === 2 ? (
          <ProgramInfo />
        ) : currentTitleId === 3 ? (
          <LunchProgramHistory />
        ) : null}
      </div>
    </div>
  );
}

export default LauncProgam;
