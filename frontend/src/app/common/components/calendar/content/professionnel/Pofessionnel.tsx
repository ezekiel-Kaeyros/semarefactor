import { useState } from 'react';
import img from "../../../../../../../public/people (1).svg"
import Image from 'next/image';
const ArrayProfessionnel = [
  {
    name: 'Will',

    type: 'Barber',
  },
  {
    name: 'Sandra',

    type: 'Hair Maker',
  },
  {
    name: 'Jessica',

    type: 'Hair Maker',
  },
];
const type = ['Best', 'Hair', 'Treaments', 'Waixing'];

const Professionnel = () => {
  const [step, setStep] = useState('');
  return (
    <div className="w-full">
      <h1 className="font-bold text-2xl mb-6">Selectionner un professionel</h1>
      {/* <div className="flex gap-4 items-center">
        {type.map((item) => (
          <div
            className={`${step == item && 'bg-primary'} bg-[#2B2E31] px-3 py-2 border rounded-full`}
          ></div>
        ))}

    
      </div> */}
      <h1 className="font-bold">{step}</h1>

      <div className="w-8/12 grid grid-cols-2 gap-4">
        <div
          className={`w-full px-5 py-8 rounded-xl bg-[#2B2E31] flex flex-col items-center gap-3`}
        >
          {/* <div className="h-14 w-14 rounded-full bg-white"></div> */}
          <Image src={img} alt="" className="h-14 w-14" />
          <h2 className="text-xl font-bold">Any professional</h2>
          <p>In terms of availability</p>
        </div>
        {ArrayProfessionnel.map((item,index) => {
          return (
              <div
                  key={index}
              className={`w-full rounded-xl px-5 py-8 bg-[#2B2E31] flex flex-col items-center gap-3 ${step == item.name && 'border-primary border-2 '} text-[#FAF9F9]`}
            >
              <div className="h-14 w-14 rounded-full bg-white"></div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>{item.type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Professionnel;
