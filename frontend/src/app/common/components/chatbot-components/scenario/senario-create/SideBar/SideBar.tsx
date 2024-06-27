import React, { useRef, useState } from 'react';
import { CarBoxCreate, CarBoxOptionAndCatalog } from '../components';
import messageText from '../../../../../../../../public/icons/chatbot/message-text.svg';
import messageTick from '../../../../../../../../public/icons/chatbot/message-tick.svg';
import messageQuestion from '../../../../../../../../public/icons/chatbot/message-question.svg';

import plusicon from '../../../../../../../../public/icons/chatbot/Plus.svg';
import preferences from '../../../../../../../../public/icons/chatbot/Preferences.svg';
import subscribe from '../../../../../../../../public/icons/chatbot/subscribe-chat.svg';
import unsubcribe from '../../../../../../../../public/icons/chatbot/unsubscribe.svg';
import timeDelay from '../../../../../../../../public/icons/chatbot/time-delay.svg';
import triggerSenario from '../../../../../../../../public/icons/chatbot/trigger-senario.svg';
import momoLogos from '../../../../../../../../public/icons/chatbot/momo-logo.svg';
import omLogos from '../../../../../../../../public/icons/chatbot/om-logos.svg';
import arrow from '../../../../../../../../public/icons/chatbot/arrow-circle-left.svg';
import { useSenarioCreate } from '@/zustand_store';
import Image from 'next/image';
import arrowIcon from '../../../../../../../../public/icons/chatbot/arrow-left.svg';
import chatBotSelectedIcon from '../../../../../../../../public/left_side_bar_icons/headsetUser.png';
import { isNullOrUndefined } from '@typegoose/typegoose/lib/internal/utils';

interface SideBarProps {
  updateOrCreate: string | undefined;
}
function SideBar(props: SideBarProps) {
  const [close, setClose] = useState(false);
  const { setNameSenario, setKeywordsSenario } = useSenarioCreate();
  const nameSenario = useSenarioCreate((state) => state.nameSenario);
  const keywordsSenario = useSenarioCreate((state) => state.keywords);
  const nameScenarioRef = useRef<HTMLInputElement>(null);

  function splitStringAndRemoveSpaces(input: string) {
    const parts = input.split(',');
    const result = parts.map((part) => part.trim());
    return result;
  }
  function joinArrayToString(arr: string[]) {
    return arr.join(', ');
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur(); // Retire le focus de l'input
    }
  };
  return (
    <>
      <div
        onClick={() => setClose(!close)}
        className={`absolute shadow-lg  bg-mainDark rounded-full top-[56%] transition-all ease-in-out duration-800 ${close ? ' left-0 rotate-180 ' : 'left-72 '} h-12 w-12 flex justify-center place-item-center cursor-pointer z-20`}
      >
        <Image src={arrow} alt="arrow" />
      </div>

      <div
        className={` font-light w-72 absolute top-3 border border-white py-3 px-2 rounded-xl z-20 flex gap-2 items-center ${close ? ' left-0  ' : 'left-80 '} transition-all ease-in-out duration-800 `}
      >
        <input
          type="text"
          className=" text-md text-white bg-transparent  appearance-none focus:outline-none font-[visby-medium'] font-semibold flex-grow"
          placeholder="Trigger Chatbot Keyword"
          defaultValue={joinArrayToString(keywordsSenario ?? [])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeywordsSenario!(splitStringAndRemoveSpaces(e.target.value))
          }
        />
        <Image src={chatBotSelectedIcon} alt="arrow" className=" w-7" />
      </div>
      <div
        className={`absolute left-0 top-0 h-full overflow-y-scroll scrollbar-hide z-20 py-2 transition-all overflow-hidden ease-in-out duration-500 ${close ? ' w-0 opacity-0' : 'w-72 opacity-1'}`}
      >
        <div
          className={`  top-14 z-20 flex gap-2 place-items-center ${close ? ' left-0  ' : 'left-80 '} transition-all ease-in-out duration-800 `}
        >
          <Image src={arrowIcon} alt="arrow" />
          <input
            type="text"
            className=" text-lg text-white bg-transparent  appearance-none focus:outline-none font-[visby-medium'] font-semibold"
            defaultValue={nameSenario}
            ref={nameScenarioRef}
            onKeyUp={(event) => {
              const { key } = event;
              console.log(key);
              if (key === 'Enter') {
                if (nameScenarioRef.current) {
                  nameScenarioRef?.current?.blur();
                }
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameSenario(e.target.value)
            }
            placeholder="Nom du scenario "
          />{' '}
        </div>
        <p className=" text-xl my-3 font-light ">
          {props.updateOrCreate && 'Update'}
        </p>
        <div className=" flex flex-col gap-3">
          <CarBoxCreate
            title="Ask a question"
            description="Ask question and store user input in variable"
            color="error-default-light"
            icon={<Image src={messageQuestion} alt="" />}
            typeNode="questionNode"
          />
          <CarBoxCreate
            title="Send a message"
            description="With no responses required from visitor"
            color="bg-blue-message-primary"
            icon={<Image src={messageText} alt="" />}
            typeNode="messageNode"
          />

          <CarBoxCreate
            title="Set conditional"
            description="Send message based on logical conditions"
            color="bg-green-emerald"
            icon={<Image src={messageTick} alt="" />}
            typeNode="conditionalNode"
          />
        </div>
        <h1 className=" text-xl my-5  ">Options</h1>
        <div className=" grid grid-cols-2 gap-3">
          <CarBoxOptionAndCatalog
            description="Subscribe to chat"
            icon={<Image src={subscribe} alt="" />}
          />
          <CarBoxOptionAndCatalog
            description="Unsubscribe to chat"
            icon={<Image src={unsubcribe} alt="" />}
          />
          <CarBoxOptionAndCatalog
            description="Trigger scenario"
            icon={<Image src={triggerSenario} alt="" />}
          />
          <CarBoxOptionAndCatalog
            description="Time to delay"
            icon={<Image src={timeDelay} alt="" />}
          />
        </div>
        <h1 className=" text-xl my-5  ">Catalog</h1>
        <div className=" grid grid-cols-2 gap-3">
          <CarBoxOptionAndCatalog
            description="Product Sets"
            icon={<Image src={preferences} alt="" />}
          />
          <CarBoxOptionAndCatalog
            description=" Single Product"
            icon={<Image src={plusicon} alt="" />}
          />
        </div>
        <h1 className=" text-xl my-5  ">Intergrations</h1>
        <div className=" grid grid-cols-2 gap-3">
          <CarBoxOptionAndCatalog
            description="Product Sets"
            icon={<Image src={momoLogos} alt="" />}
          />
          <CarBoxOptionAndCatalog
            description=" Single Product"
            icon={<Image src={omLogos} alt="" />}
          />
        </div>
        <div className=" h-28"></div>
      </div>
    </>
  );
}

export { SideBar };
