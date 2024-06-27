'use client';
import LoyaltyProgram from '@/app/modules/loyalty-program/loyaltyProgram';
import LaunchProgam from '../launch-program/launch-progam';
import { useSearchParams } from 'next/navigation';

import React from 'react';

function LoyaltyProgramSteps() {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  return (
    <div>
      <div className="pt-4 pl-4">
        <h1 className="text-2xl font-extrabold">Loyalty Program</h1>
      </div>
      {parseInt(`${step}`) == 1 ? <LaunchProgam /> : <LoyaltyProgram />}
    </div>
  );
}

export default LoyaltyProgramSteps;
