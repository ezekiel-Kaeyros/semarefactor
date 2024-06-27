'use client';

import React from 'react';
import { FaceLeftIcon, FacetIcon } from './icons';
import Image from 'next/image';
import AddProducts from '@/app/common/components/loyalty-program-comp/loyalty-program/add-products/add-products';
import GenerateQrCode from '@/app/common/components/loyalty-program-comp/loyalty-program/generate-qrcode/generate-qrCode';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import director from '../../../../public/icons/Vector.svg';

interface LoyaltyStep {
  id: number;
  label: string;
  selected: boolean;
  step: string;
  Icon: any;
}

const steps = [
  {
    id: 1,
    label: 'Add Product',
    selected: true,
    step: '1',
    Icon: FaceLeftIcon,
  },
  {
    id: 2,
    label: 'Generate Qr Code',
    selected: false,
    step: '2',
    Icon: FacetIcon,
  },
];

function LoyaltyProgram() {
  // redux store actions
  const { currentStep } = useSelector((state: RootState) => state.stepReducer);

  // ;

  return (
    <div>
      <div className="w-[80%] m-auto mt-10">
        <div className="">
          <div className="flex gap-x-4 items-center">
            <div className="">
              <div
                className={`pl-0 bg-trasparent justify-start ${
                  currentStep === steps[0].id
                    ? ''
                    : 'opacity-50 hover:opacity-50'
                }`}
              >
                <div
                  className={`pt-[1.8px] font-extrabold text-white flex items-center gap-x-2`}
                >
                  <h1 className="w-7 h-7 bg-[#576CE0] rounded-[100%] flex items-center justify-center">
                    {steps[0].step}
                  </h1>
                  <div className="">
                    <h1 className="pt-1">{steps[0].label}</h1>
                  </div>
                </div>
              </div>
            </div>
            <Image src={director} alt="vector" className="w-3" />
            <div className="">
              <div
                className={`pl-0 bg-trasparent justify-start ${
                  currentStep === steps[1].id
                    ? ''
                    : 'opacity-50 hover:opacity-50'
                }`}
              >
                <div
                  className={`pt-[1.8px] font-extrabold text-white flex items-center gap-x-2`}
                >
                  <h1 className="w-7 h-7 bg-[#576CE0] rounded-[100%] flex items-center justify-center">
                    {steps[1].step}
                  </h1>
                  <div className="">
                    <h1 className="pt-1">{steps[1].label}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rendering Step Content */}
          <div className="mt-8">
            {currentStep === 1 ? <AddProducts /> : <GenerateQrCode />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyProgram;
