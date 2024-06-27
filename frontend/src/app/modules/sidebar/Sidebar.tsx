'use client';

import React, { useState } from 'react';

import SidebarToggleIcon from '../../../../public/icons/sidebar/toggle-btn.svg';

import HamburgerIcon from '../../../../public/icons/hamburgerMenuIcon.svg';
import {
  navigation,
  navigationBottom,
} from '@/app/common/navigation/navigation';
// import Profile from '@/app/common/components/profile/Profile';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import service7Icon from '../../../../public/left_side_bar_icons/service7.png';
import logo from '../../../../public/images/sema-logo-2.svg';

import messageSolutionIcon from '../../../../public/left_side_bar_icons/messageSolution.png';

import SettingsIcon from '../../../../public/icons/settingsIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleSideBar } from '@/redux/features/chat-bot-slice';
import SidebarMenu from '@/app/common/ui/sidebar-menu/SidebarMenu';
import { Button } from '@/app/common/ui/button/Button';
import { removeUserCookies } from '@/cookies/cookies';

//

const Sidebar = () => {
  // const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [isOpenSidebar, setIsOpensidebar] = useState(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const programId = pathname.split('/');

  return (
    <div
      className={` hidden md:block md:w-24 ${isOpenSidebar ? ' lg:w-60 ' : ' lg:w-24 '} px-2 border-r border-gray-600 relative transition-all ease-in-out duration-300 h-full flex flex-col `}
    >
      <div className="">
        {/* Toggle icon */}

        <div
          className={`mb-12 flex w-full justify-center pt-10 ${isOpenSidebar ? 'lg:pt-5 ' : ' lg:pt-10  '}`}
        >
          <Image
            onClick={() => setIsOpensidebar(!isOpenSidebar)}
            className={` w-10 h-10 cursor-pointer ${isOpenSidebar ? 'h-16 w-16 ' : ' h-10 w-10 '}`}
            src={logo}
            alt="Hamburger menu"
          />
        </div>

        <div className="">
          {navigation?.map((value: any) => (
            <SidebarMenu
              sidebarToggle={isOpenSidebar}
              key={value?.id}
              title={value?.title}
              url={`/${programId[1]}/${value?.url}`}
              submenus={value?.submenus && value?.submenus}
              icon={value?.icon}
              selectedIcon={value?.selectedIcon}
            />
          ))}
        </div>
        <div className=" absolute bottom-0 w-full pr-3 pb-5">
          {navigationBottom?.map((value: any) => (
            <SidebarMenu
              sidebarToggle={isOpenSidebar}
              key={value?.id}
              title={value?.title}
              url={`/${programId[1]}/${value?.url}`}
              submenus={value?.submenus && value?.submenus}
              icon={value?.icon}
              selectedIcon={value?.selectedIcon}
            />
          ))}
        </div>
      </div>

      <div className=" absolute right-0 top-1/2 ">
        <Image
          onClick={() => setIsOpensidebar(!isOpenSidebar)}
          className="cursor-pointer"
          src={SidebarToggleIcon}
          alt="Toggle icon"
        />
      </div>
    </div>
  );
};

export default Sidebar;
{
  /* <div className=" mt-8">
<div
  className={` ${sideBarToggle && '[&>a>div>:nth-child(2)]:hidden'} transition-all duration-300 ease-in-out delay-150`}
> */
}
{
  /* <Link
    href={`/settings`}
    className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
  >
    <Image
      src={service7Icon}
      className="w-8 h-8 mr-3"
      alt="Settings icon"
    />{' '}
    <h1
      className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
    >
      Service 7
    </h1>
  </Link>

  <Link
    href={`/settings`}
    className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
  >
    <Image
      src={messageSolutionIcon}
      className="w-8 h-8 mr-3"
      alt="Settings icon"
    />{' '}
    <h1
      className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
    >
      Settings
    </h1>
  </Link> */
}

{
  /* <Link
    href={`/settings`}
    className="flex my-8 pl-4 items-center dark:hover:bg-slate-800 py-2 rounded-md"
  >
    <Image
      src={SettingsIcon}
      className="w-8 h-8 mr-3"
      alt="Settings icon"
    />{' '}
    <h1
      className={`${sideBarToggle && 'hidden transition-all duration-300 ease-in-out delay-150'} transition-all duration-300 ease-in-out delay-150`}
    >
      Settings
    </h1>
  </Link> */
}
{
  /* </div>
<div className="w-10 h-10 z-100 sm:block hidden">
  <Image
    onClick={() => {
      dispatch(toggleSideBar(!sideBarToggle));
      // setSidebarToggle((prev) => !prev);
    }}
    className="cursor-pointer"
    src={SidebarToggleIcon}
    alt="Toggle icon"
  />
</div>
</div> */
}
