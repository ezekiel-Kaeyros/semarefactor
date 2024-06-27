'use client';
import React, { useState } from 'react';
import NotificationIcon from '../../../../../../public/icons/notifIcon.svg';
import LanguageIcon from '../../../../../../public/icons/languageIcon.svg';
import NightIcon from '../../../../../../public/icons/nightIcon.svg';
import Image from 'next/image';
import AnimateClick from '../../animate-click/AnimateClick';
import { ThemeSwitcher } from '@/app/common/dark-mode/theme-switcher/ThemeSwitcher';

type NavBarProps = {
  lang: string;
};

const NavBar: React.FC<NavBarProps> = ({ lang }) => {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-fit ml-auto">
      <div className="flex space-x-4">
        <AnimateClick>
          <div className="bg-[#414C50] dark:bg-[#414C50] cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
            <Image src={NotificationIcon} alt="Notification icon" />
          </div>
        </AnimateClick>
        <AnimateClick>
          <div className="bg-[#414C50] dark:bg-[#414C50] cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
            <Image src={LanguageIcon} alt="Language icon" />
          </div>
        </AnimateClick>

        <AnimateClick>
          <div className="bg-[#414C50] dark:bg-[#414C50] cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
            <ThemeSwitcher />
          </div>
        </AnimateClick>
      </div>
    </nav>
  );
};

export default NavBar;
