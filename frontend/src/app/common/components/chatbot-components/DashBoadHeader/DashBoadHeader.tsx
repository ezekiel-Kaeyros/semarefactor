'use client';
import React from 'react';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import Image from 'next/image';
import notificationsIcon from '../../../../../../public/right_side_bar/notifications.png';
import playvideoIcon from '../../../../../../public/left_side_bar_icons/playvideo.png';
import infoIcon from '../../../../../../public/right_side_bar/info.png';
import EyeIcon from '../../../../../../public/icons/chatbot/eyeIcon.svg';
import userIcon from '../../../../../../public/icons/user.svg';

import { Button } from '@/app/common/ui/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNumberConversationsData } from '@/zustand_store/numberConversation-store';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { removeUserCookies } from '@/cookies/cookies';

const DashBoadHeader = () => {
  const sideBarToggle = useSelector(
    (state: RootState) => state.ChatBotSlice.sideBarToggle
  );
  const { push } = useRouter();
  const numberConversations = useNumberConversationsData((state) => state.nb);
  const pathname = usePathname();

  return (
    <div
      className={`flex justify-between w-full px-6  border-slate-600 dark:bg-mainDark border-b h-[80px] sm:text-base text-xs absolute top-0 z-50 place-items-center`}
    >
      <div className="">
        <Button rightIcon={playvideoIcon} className="sm:text-base text-xs">
          Watch-tutorial
        </Button>
      </div>

      {/* Right sections */}

      <div className="flex  gap-x-12 items-center ">
        {/* Buttons */}

        {!pathname?.includes('scenarios') &&
          !pathname?.includes('bulk-messages') && (
            <div className="lg:flex gap-x-4 items-center hidden ">
              <div>
                <Button
                  href="/dashboard/scenarios"
                  icon={EyeIcon}
                  className="rounded-full text-sm"
                >
                  Scenario
                </Button>
              </div>
              <div>
                <AnimateClick>
                  <Link
                    href="/dashboard/chatbot"
                    className="flex flex-row gap-[.5rem] items-center justify-center bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-lg  h-[40px] py-1 px-3"
                  >
                    <span>Conversations</span>
                    <span className="rounded-full text-[12px] w-[20px] h-[20px] flex justify-center dark:bg-slate-500">
                      {numberConversations}
                    </span>
                  </Link>
                </AnimateClick>
              </div>
            </div>
          )}

        {/* Notification */}
        <div className="flex gap-2">
          <AnimateClick>
            <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-full w-12 h-12 flex items-center justify-center">
              <Image
                src={notificationsIcon}
                width={30}
                alt="Notification icon"
              />
            </div>
          </AnimateClick>

          <AnimateClick>
            <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
              <Image src={infoIcon} width={30} alt="Notification icon" />
            </div>
          </AnimateClick>

          <Dropdown placement="bottom-start" className=" ">
            <DropdownTrigger>
              <div>
                <AnimateClick>
                  <div className="bg-mainDarkLight dark:bg-bgBlackForBtn cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
                    <Image src={userIcon} width={30} alt="Notification icon" />
                  </div>
                </AnimateClick>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="">
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Account settings</p>
                </div>
              </DropdownItem>
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Manage Users</p>
                </div>
              </DropdownItem>
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Feedback</p>
                </div>
              </DropdownItem>
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Support </p>
                </div>
              </DropdownItem>
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Tutorials </p>
                </div>
              </DropdownItem>
              <DropdownItem key="new" className="">
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Start App Tour </p>
                </div>
              </DropdownItem>
              <DropdownItem
                key="copy"
                onClick={() => {
                  removeUserCookies();
                  push('/login');
                }}
              >
                <div className=" flex gap-2 place-items-center">
                  <p className=" pt-1.5">Log Out</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default DashBoadHeader;
