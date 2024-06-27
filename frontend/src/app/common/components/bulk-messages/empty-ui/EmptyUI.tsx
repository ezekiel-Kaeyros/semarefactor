import React from 'react';

// import emptyBulkMessageIcon from "../../../../../../../../public/emptyBulkMessage.png"
import Image from 'next/image';
import { Button } from '@/app/common/ui/button/Button';
import { EmptyUIType } from './emptyUI.d';
// import { EmptyUIType } from './EmptyUI'

const EmptyUIComp: React.FC<EmptyUIType> = ({
  LogoOfEmptyPage,
  bigTitle,
  secondaryTitle,
  buttonImage,
  buttonLabel,
  functionToRun,
  bigContainerStyle,
}) => {
  return (
    <div
      className={`${
        bigContainerStyle
          ? bigContainerStyle
          : 'w-[100%] h-[100%] grid justify-items-center gap-[1.5rem] content-center bg-black'
      } `}
    >
      <div className="p-1 flex items-center justify-center">
        <Image src={LogoOfEmptyPage} width={100} alt="Notification icon" />
      </div>
      <div className="flex flex-col justify-center justify-items-center w-[200px]">
        <h1
          className=""
          style={{
            fontSize: 'bold',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {bigTitle}
        </h1>
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
          }}
        >
          {secondaryTitle}
        </p>
      </div>
      {buttonImage ? (
        <div className="flex flex-col justify-center gap-[1rem] justify-items-center w-[200px]">
          <div className="w-[200px]">
            <Button rightIcon={buttonImage} onClick={() => functionToRun()}>
              {buttonLabel}
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EmptyUIComp;
