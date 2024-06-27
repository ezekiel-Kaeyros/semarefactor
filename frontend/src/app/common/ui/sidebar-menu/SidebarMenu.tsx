'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SidebarMenuProps } from './sidebarMenu.d';
import DownIcon from './icons/DownIcon';
import { usePathname } from 'next/navigation';
import AnimateClick from '../../ui/animate-click/AnimateClick';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  url,
  sidebarToggle,
  icon,
  selectedIcon,
  submenus,
}) => {
  const pathname = usePathname();

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="flex my-4 w-full flex-col  text-sm">
      {/* If submenus */}

      {!submenus ? (
        <AnimateClick>
          <Link
            href={`${url}`}
            onClick={() => setToggle((prev) => !prev)}
            className={`
            ${'dark:hover:bg-slate-800 dark:hover:text-slate-400 w-full'}
            ${url && pathname.includes(url) && ' text-black'} 
            ${sidebarToggle && url && pathname.includes(url) ? 'lg:dark:bg-blue-400' : ''}
             py-2 px-4 rounded-md cursor-pointer place-items-center flex justify-center w-full transition-all duration-300 ease-in-out delay-150`}
          >
            {/* Changing icon's color when selected */}
            {icon && url && pathname.includes(url) ? (
              <Image className="w-8 h-8" src={selectedIcon} alt="icon" />
            ) : (
              <Image
                className="md:w-8 md:h-8 h-5 w-5 fill-blue-500 [&+path]:fill-[#0094D9]"
                src={icon}
                alt="icon"
              />
            )}

            {/* Title navigation link */}

            <p
              className={`ml-3 w-full hidden pt-2 text-lg font-medium ${
                submenus && 'dark:text-primaryDark text-primaryDark'
              } ${
                !sidebarToggle ? ' lg:hidden ' : 'lg:block'
              } transition-all duration-300 ease-in-out delay-150`}
            >
              {title}
            </p>

            {/* Down icon rotating when selected */}
            {submenus && (
              <div
                className={`ml-2 ${
                  !toggle
                    ? ' [&>svg>path]:fill-[#2C353A] dark:[&>svg>path]:fill-white '
                    : 'dark:[&>svg>path]:fill-[#0094D9] [&>svg>path]:fill-[#0094D9] rotate-180'
                } ${
                  sidebarToggle &&
                  !toggle &&
                  'hidden transition-all duration-300 ease-in-out delay-150'
                } transition-all duration-300 ease-in-out delay-150`}
              >
                <DownIcon />
              </div>
            )}
            {/* If not submenus */}
          </Link>
        </AnimateClick>
      ) : (
        <div
          onClick={() => setToggle((prev) => !prev)}
          className={`${!toggle && 'dark:hover:bg-slate-800 w-full'} ${
            pathname?.split('/')[2] === url?.split('/')[1] &&
            url === '/fr/dashboard' &&
            'dark:bg-slate-800'
          }  py-2 px-4 rounded-md cursor-pointer items-center flex w-full`}
        >
          {/* Changing icon's color when selected */}
          {icon &&
            (toggle ? (
              <Image
                className="md:w-8 md:h-8 h-5 w-5"
                style={{
                  filter:
                    'invert(50%) sepia(43%) saturate(6353%) hue-rotate(173deg) brightness(95%) contrast(101%)',
                }}
                src={icon}
                alt="icon"
              />
            ) : (
              <Image
                className="md:w-8 md:h-8 h-5 w-5 fill-blue-500 [&+path]:fill-[#0094D9]"
                src={icon}
                alt="icon"
              />
            ))}

          {/* Title navigation link */}

          <h1
            className={`ml-3 w-full ${
              toggle && submenus && 'dark:text-primaryDark text-primaryDark'
            } ${
              sidebarToggle &&
              !toggle &&
              'hidden transition-all duration-300 ease-in-out delay-150'
            } transition-all duration-300 ease-in-out delay-150`}
          >
            {title}
          </h1>

          {/* Down icon rotating when selected */}
          {submenus && (
            <div
              className={`ml-2 ${
                !toggle
                  ? ' [&>svg>path]:fill-[#2C353A] dark:[&>svg>path]:fill-white '
                  : 'dark:[&>svg>path]:fill-[#0094D9] [&>svg>path]:fill-[#0094D9] rotate-180'
              } ${
                sidebarToggle &&
                !toggle &&
                'hidden transition-all duration-300 ease-in-out delay-150'
              } transition-all duration-300 ease-in-out delay-150`}
            >
              <DownIcon />
            </div>
          )}
        </div>
      )}

      {/* Submenus section */}
      {submenus && toggle && (
        <div className="flex ml-9 transition-all ease-in-out duration-400 relative flex-col w-fit">
          <div className="absolute -left-1.5 h-full w-[1px] bg-primaryDark dark:bg-primaryDark"></div>
          {submenus?.map((submenu) => (
            <Link
              className={`${
                pathname?.split('/')[2] === submenu?.url?.split('/')[1] &&
                'bg-slate-800'
              } py-2 my-1 text-sm px-6 rounded-md dark:hover:bg-slate-800 hover:text-primaryDark`}
              key={submenu?.subTitle}
              href={`${submenu?.url}/`}
            >
              {submenu?.subTitle}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
