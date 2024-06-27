import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import React from 'react';
import cameroonFlagUIcon from '../../../../../../../../public/cameroonFlag.png';
import editIcon from '../../../../../../../../public/right_side_bar/editIcon.png';
import Image from 'next/image';

import InputField from '@/app/common/ui/forms/text-field/InputField';
import { useForm } from 'react-hook-form';
import { ForSingleElementForm } from '@/redux/features/types';
import tagsIcon from '../../../../../../../../public/right_side_bar/tags.png';
// import HorizontalList from './HorizontalScrollList';
import { useChatBot } from '@/app/hooks/useChatBot';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ChatbotRightSidebar = () => {
  const { register, handleSubmit, watch, reset } =
    useForm<ForSingleElementForm>();

  const { displayClientInfoInChatToggle, message } = useChatBot();
  const displayChatUiToggle: boolean = useSelector(
    (state: RootState) => state.ChatBotSlice.displayChatUiToggle
  );

  return (
    <div
      className={`p-[1rem] flex flex-col gap-[2rem] border-slate-600 ${
        displayClientInfoInChatToggle && displayChatUiToggle
          ? 'w-[100%] transition-all duration-300 ease-in-out delay-150'
          : 'hidden transition-all duration-300 ease-in-out delay-150'
      } dark:bg-bgColorDark border-l-[0.02px] h-[100%]`}
    >
      <AnimateClick>
        <div className="flex flex-row gap-[.5rem] items-center cursor-pointer">
          <span
            style={{
              fontWeight: 'bold',
            }}
            className="relative flex justify-center items-center text-[20px] rounded-full h-[40px] w-[40px] bg-colorRoundedName text-mainColor"
          >
            {/* <span className="w-[17px] h-[17px] rounded-full bg-onlineBg absolute top-[70%] left-[65%]"></span> */}
          </span>
          {/* <div className="flex flex-col w-[80%]"> */}
          {/* <div className="flex flex-row justify-between "> */}
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            {message?.phone_number}
          </h1>
          {/* <p className='text-[10px]'>Dec 10 09:04</p> */}
          {/* </div> */}
          {/* <div className="flex flex-row justify-between">
              <p className="text-bg-gray text-[10px]">Online</p> */}
          {/* <div className='flex flex-row items-center gap-[1rem] '>
                  <span className='px-[.5rem] text-pendingText py-[.2rem] flex items-center rounded-3xl bg-pendingBg text-[12px]'>Pending</span>
                  <span className='bg-mainColor rounded-full w-[20px] h-[20px] text-[12px] flex justify-center items-center'>1</span>
                </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </AnimateClick>
      <div>
        <h1 className="font-bold md:text-base text-sm">Information</h1>
        <div className="flex items-center md:text-sm text-xs">
          <p>Phone Number: {message?.phone_number}</p>
          {/* <Image
            src={cameroonFlagUIcon}
            alt="Notification icon"
            className="h-6 w-6 ml-2"
          /> */}
        </div>
      </div>

      <div className="flex flex-col gap-[1rem]">
        <h1 className="font-bold">Contact parameters</h1>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-row gap-[1rem] justify-between items-center bg-white rounded-3xl px-[1rem] py-[.5rem]">
            <p className="text-mainColor">Name: {message?.phone_number}</p>
            <Image src={editIcon} width={30} alt="Notification icon" />
          </div>
          <div className="flex flex-row gap-[1rem] justify-between items-center bg-white rounded-3xl px-[1rem] py-[.5rem]">
            <p className="text-mainColor">Language: en</p>
            <Image src={editIcon} width={30} alt="Notification icon" />
          </div>
        </div>
      </div>

      <div>
        <h1>Tag</h1>
        <div className="w-[100%]">
          <InputField
            name="message"
            icon={tagsIcon}
            register={register('message', { required: true })}
            placeholder="Type message here or start / with a fast reply"
          />
        </div>
        <div className="overflow-x-scroll no-scrollbar flex flex-row text-xs mt-4">
          {/* grid grid-cols-[min-content,max-content] grid-flow-col auto-cols-auto */}
          <div className="bg-white px-[1rem] py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>movies</span>
          </div>
          <div className="bg-white w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-center  py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>movies movies</span>
          </div>
          <div className="bg-white px-[1rem] py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>technology</span>
          </div>
          {/* <div className="bg-white px-[1rem] py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>movies</span>
          </div>
          <div className="bg-white w-[200px] text-ellipsis whitespace-nowrap overflow-hidden  py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>movies movies</span>
          </div>
          <div className="bg-white px-[1rem] py-[.5rem] cursor-pointer hover:bg-mainColor hover:text-white rounded-3xl text-mainColor">
            <span>technology</span>
          </div> */}
        </div>

        {/* <HorizontalList /> */}
      </div>
    </div>
  );
};

export default ChatbotRightSidebar;
