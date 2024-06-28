import { useCalender } from "@/app/hooks/useCalendar";
import { getPresentation } from "@/redux/features/calendar";
import { useEffect, useState } from "react";

const ArrayPrestation = [
  {
    name: 'Prestation1',
    duration: '1h',
    price: '8000',
    type: 'Best',
  },
  {
    name: 'Prestation2',
    duration: '1h',
    price: '3000',
    type: 'Hair',
  },
  {
    name: 'Prestation3',
    duration: '1h',
    price: '5000',
    type: 'Best',
  },
  {
    name: 'Prestation4',
    duration: '1h',
    price: '10500',
    type: 'Treaments',
  },
  {
    name: 'Prestation5',
    duration: '1h',
    price: '12000',
    type: 'Best',
  },
  {
    name: 'Prestation',
    duration: '1h',
    price: '3000',
    type: 'Waixing',
  },
];
const type = ['Best', 'Hair', 'Treaments', 'Waixing'];

const Prestation: React.FC<{
  getPrestation: any;
  value: { name: string; duration: string; price: string; type: string }[];
}> = (props) => {
    const { dispatch, arrayCat, arrayPresentation, arrayGetPresentation } = useCalender()
    console.log(arrayGetPresentation, 'arrayGetPresentation');
    const [step, setStep] = useState('');
    
    useEffect(() => {
        setStep(arrayCat[0]?._id);
    },[arrayCat])
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Selectionner les prestations</h1>
      <div className="flex gap-4 items-center my-6">
        {arrayCat.length > 0 &&
          arrayCat.map((item, index) => (
            <div
              key={index}
              className={`${step == item._id && 'bg-primary'} bg-[#2B2E31] px-5 py-3  rounded-full cursor-pointer text-sm`}
              onClick={() => setStep(item._id)}
            >
              {item.name}
            </div>
          ))}
      </div>
      {/* <h1 className="font-bold mb-5 text-xl">{arrayCat.length>0 && arrayCat.filter((item)=>item._id==step)[0].name}</h1> */}

      <div className="flex flex-col gap-4">
        {arrayGetPresentation.map((item, index) => {
          if (item.category_id == step) {
            return (
              <label
                key={index}
                htmlFor={item.name}
                className={`w-11/12 cursor-pointer bg-[#2B2E31] flex justify-between items-center p-5 rounded-xl ${arrayPresentation.filter((items) => items.name == item.name).length > 0 && 'border-blue-700 border'}`}
              >
                <div>
                  {' '}
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <p className="py-3">{item.duration}</p>
                  <p>{item.price}</p>
                </div>
                <input
                  checked={
                    arrayPresentation.filter((items) => items.name == item.name)
                      .length > 0
                  }
                  type="checkbox"
                  id={item.name}
                  className="h-7 w-7 bg-transparent"
                  onClick={() => {
                    dispatch(getPresentation(item));
                    props.getPrestation(item);
                  }}
                />
              </label>
            );
          }
        })}
      </div>
    </div>
  );
};
export default Prestation