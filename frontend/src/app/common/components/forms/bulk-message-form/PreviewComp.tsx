'use client';
import Image from 'next/image';
import React from 'react';
import networkIcon from '../../../../../../public/preview/network.png';
import wifiIcon from '../../../../../../public/preview/wifi.png';
import batteryIcon from '../../../../../../public/preview/battery.png';

import addIcon from '../../../../../../public/preview/add.png';
import textIcon from '../../../../../../public/preview/text.png';

import pictureIcon from '../../../../../../public/preview/picture.png';
import recordIcon from '../../../../../../public/preview/record.png';


import DOMPurify from 'dompurify';


const PreviewComp:React.FC<{textTemplate?:string,ImgTemplate?:any,tagline?:string}> = (props) => {


  return (
    <div className="w-full bg-slate-100 text-black">
      <div className="h-[50px] bg-slate-300 flex flex-row justify-between items-center">
        <div className="text-[15px] pl-[1rem]">09 : 41</div>
        <div className="flex flex-row items-center gap-2 pr-[1rem]">
          <div>
            <Image src={networkIcon} alt="" width={20} />
          </div>
          <div>
            <Image src={wifiIcon} alt="" width={20} />
          </div>
          <div>
            <Image src={batteryIcon} alt="" width={20} />
          </div>
        </div>
      </div>
      <div className="h-[450px] bg-brokenWhite p-[1rem] pt-[3rem] flex flex-col gap-2 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-4 bg-white max-w-[60%] min-w-[10%] p-[.5rem] rounded-lg">
          <div className="rounded-lg bg-white flex justify-center box-border ">
            {props.ImgTemplate && props.ImgTemplate != '' && (
              <Image src={props.ImgTemplate} alt="" width={250} height={150} />
            )}
          </div>
          <div>
            <div className="text-[10px]">
              {props.textTemplate && (
                // <textarea
                //   name=""
                //   id=""
                //   cols={30}
                //   rows={Math.round(props.textTemplate.length / 30)}
                //   className="bg-white no-scrollbar"
                // >
                //   {props.textTemplate.toString()}
                // </textarea>
                // <textarea name="" id="" cols={30} rows={10} className='text-white'>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.textTemplate.toString()),
                  }}
                  className="text-[10px]"
                />
                // </textarea>
              )}
            </div>
            {props.tagline && (
              <p className="mt-5 text-[10px] opacity-80 font-bold">
                <em> {props.tagline}</em>
              </p>
            )}
          </div>
        </div>

        <div className="w-[60%] bg-previewActionBtnBg flex justify-center items-center rounded-lg py-[.3rem]">
          <p className="text-[10px]">Stop receiving this message</p>
        </div>
        <div className="w-[60%] bg-previewActionBtnBg flex justify-center items-center rounded-lg py-[.3rem]">
          <p className="text-[10px]">Purchase Item</p>
        </div>
      </div>
      <div className="h-[100px] bg-slate-300">
        <div className="flex flex-row items-center gap-2 py-[.5rem]">
          <div className="flex flex-row items-center justify-center w-[10%]">
            <Image src={addIcon} alt="" width={20} />
          </div>
          <div className="border border-gray-150 w-[70%] rounded-3xl flex justify-end p-[.5rem]">
            <Image src={textIcon} alt="" width={20} />
          </div>

          <div className="flex flex-row items-center justify-around w-[20%]">
            <div className="flex flex-row items-center">
              <Image src={pictureIcon} alt="" width={20} />
            </div>
            <div className="flex flex-row items-center">
              <Image src={recordIcon} alt="" width={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewComp;
