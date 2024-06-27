'use client';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/common/ui/button/Button';
import React from 'react';
import BackIcon from '../../../../../../../public/icons/chatbot/leftIcon.svg';
import PlusIcon from '../../../../../../../public/icons/chatbot/plusIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

const ScenarioHeader = () => {
  const pathName = usePathname();
  var regex = /\/scenarios\/(?!create$)[^\/]+$/;

  return (
    <>
      <div className="flex gap-x-6 ml-2 m-8 pr-4 w-full justify-between items-center h-10">
        <div className=" flex gap-5 text-md">
          <Link href={'/dashboard/scenarios'}>
            <div
              className={` ${pathName.endsWith('/scenarios') && "before:content-[''] relative before:absolute before:h-[1px] before:bg-blueLine before:-bottom-[2px] before:left-0 before:w-full"} cursor-pointer transition-all duration-300 ease-in-out `}
            >
              Manage Scenario
            </div>
          </Link>
          <Link href={'/dashboard/scenarios/create'}>
            <div
              className={` ${pathName.endsWith('/scenarios/create') && "before:content-[''] relative before:absolute before:h-[1px] before:bg-blueLine before:-bottom-[2px] before:left-0 before:w-full"} cursor-pointer `}
            >
              Create a scenario
            </div>
          </Link>

          {regex.test(pathName) && (
            <Link href={'/dashboard/scenarios/create'}>
              <div
                className={` ${regex.test(pathName) && "before:content-[''] relative before:absolute before:h-[1px] before:bg-blueLine before:-bottom-[2px] before:left-0 before:w-full"} cursor-pointer `}
              >
                Update a scenario
              </div>
            </Link>
          )}
        </div>

        {!pathName.endsWith('/scenarios/create') && (
          <div>
            <Button href="/dashboard/scenarios/create" icon={PlusIcon}>
              Create a scenario
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ScenarioHeader;
