'use client';
import { useEffect, useState } from 'react';
import Content from './content/Content';
import img from '../../../../../public/arrow-right (2).svg';
import img2 from '../../../../../public/Frame 10635.svg';
import img3 from '../../../../../public/Group 33833.svg';
import Image from 'next/image';
import { Button } from '../../ui/button/Button';
import { useCalender } from '@/app/hooks/useCalendar';
import { CalendarService } from '@/services/calendarService/calendarService';
import { useQuery } from '@tanstack/react-query';
import { error } from 'console';
import { toast, Toaster } from 'react-hot-toast';

import {
  getCategory,
  getDate,
  setDateAvailable,
  setPrestation,
} from '@/redux/features/calendar';
const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const mont = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mai',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
];

// const registerHandler = async () => {
//     const
// }
const CalendarComponent = () => {
  //  const { data: posts, isLoading } = useQuery({
  //    queryKey: ['getTempleteSession'],
  //    queryFn: new BulkMessagesService().getTemplateSession,
  //  });
  const { arrayPresentation, total, dispatch, dateGet, heure, id_array } =
    useCalender();
  const [step, setStep] = useState(1);
  const [load, setLoad] = useState(false);
  //   const [total, setTotal] = useState(0);
  const [prof, setProf] = useState<
    {
      name: string;
      duration: string;
      price: string;
      type: string;
    }[]
  >([]);
  const [currentDate, setCurrentDate] = useState('');
  const profHandler = (item: {
    name: string;
    duration: string;
    price: string;
    type: string;
  }) => {
    const value = prof.filter((items) => items.name == item.name);
    if (value.length > 0) {
      setProf((preview) => {
        const value = preview.filter((items) => {
          if (item.name != items.name) {
            return item;
          }
        });

        return value;
      });

      //  setTotal((preview) => {
      //    const total = preview - +item.price;
      //    console.log('total', total);

      //    return total;
      //  });
    } else {
      const newArray = [...prof, item];
      console.log('newArray', newArray);

      // setTotal((preview) => {
      //   const total = preview + +item.price;
      //   console.log('total', total);

      //   return total;
      // });

      setProf([...prof, item]);
    }
  };
  console.log('id_array', id_array);

  useEffect(() => {
    const response = new CalendarService()
      .getCategory('66672c59c615817051015d0c')
      .then((result) => {
        dispatch(getCategory(result.data));

        console.log(result.data, 'data..........');
      });

    const response1 = new CalendarService()
      .getDate('66672c59c615817051015d0c', '60')
      .then((result) => {
        console.log(result.data, 'dataDate..........');
        dispatch(setDateAvailable(result.data));
      })
      .catch((error) => {
        console.log(error);
      });
    const response3 = new CalendarService()
      .getPrestation('66672c59c615817051015d0c')
      .then((result) => {
        dispatch(setPrestation(result.data));
        console.log(result.data, 'data..........5478');
      });
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {step == 3 && (
        <div className="min-h-[90vh] w-full flex items-center justify-center flex-col gap-5">
          <Image src={img3} alt="" />
          <h1 className="text-xl font-bold">Reservation Successful</h1>
          <p>Go to Whatsapp to get more info about your reservation </p>
        </div>
      )}
      {step < 3 && (
        <div>
          <div className="flex gap-5 items-center text-sm font-[500] text-[#FAF9F9] mb-6">
            <span
              onClick={() => setStep(1)}
              className={`${step != 1 && 'opacity-80'} cursor-pointer`}
            >
              Prestations
            </span>
            {/* <span className="text-4xl">{'>'}</span> */}
            <Image src={img} alt="" />
            {/* <span
          onClick={() => setStep(2)}
          className={`${step != 2 && 'opacity-80'} cursor-pointer`}
        >
          Professionnel
        </span>
        <span className="text-4xl">{'>'}</span>
        <Image src={img} alt="" /> */}

            <span
              onClick={() => {
                if (arrayPresentation.length > 0) {
                  setStep(2);
                }
              }}
              className={`${step != 3 && 'opacity-80'} 
          ${arrayPresentation.length > 0 && 'cursor-pointer'}`}
            >
              Heure
            </span>
            {/* <span className="text-4xl">{'>'}</span> */}
            <Image src={img} alt="" />

            <span
              className={`${step != 4 && 'opacity-80'} cursor-pointer`}
              onClick={() => setStep(3)}
            >
              Valider
            </span>
          </div>

          <div className="w-full flex justify-between text-[#FAF9F9]">
            <div className="w-6/12">
              <Content
                step={step}
                getPrestation={profHandler}
                valueCheck={prof}
                getCurrentDate={(value: any) => {
                  setCurrentDate(value);
                }}
              />
            </div>
            <div className="w-4/12 p-4 border-xl bg-[#2B2E31] rounded-xl h-fit fixed left-[60%]">
              <div>
                <div className="w-full flex items-center gap-3 ">
                  <Image src={img2} alt="" />
                  <div className="xl:max-w-sm max-w-xs overflow-hidden">
                    <h2 className="font-bold text-xl">Barber Shop Studio</h2>
                    <p className="truncate mt-2 text-sm">
                      3636 Menaul Boulevard Northeast, Albuquerque...
                    </p>
                  </div>
                </div>

                <div className="my-5 flex- flex-col max-h-[500px] overflow-auto no-scrollbar">
                  {arrayPresentation.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between  text-[#C3C7CB] mb-7"
                    >
                      <div>
                        <h2 className="">{item.name}</h2>
                        <p className="text-sm mt-1">{item.price}</p>
                      </div>
                      <span className="text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>

                {heure.length > 0 && (
                  <div className="w-full flex justify-end font-bold text-lg">
                    {daysOfWeek[dateGet.getDay()] +
                      ' ' +
                      dateGet.getDate() +
                      ' ' +
                      mont[dateGet.getMonth()] +
                      ' ' +
                      dateGet.getFullYear() +
                      ' à ' +
                      heure}
                  </div>
                )}

                <div className="w-full flex items-center py-4 border-t-1 justify-between mb-14">
                  <span>Total</span>
                  <span>{total}</span>
                </div>

                <Button
                  disabled={
                    arrayPresentation.length > 0 && step == 1
                      ? false
                      : step == 2 && heure.length > 0 && !load
                        ? false
                        : true
                  }
                  variant={
                    arrayPresentation.length > 0 && step == 1
                      ? 'default'
                      : step == 2 && heure.length > 0 && !load
                        ? 'default'
                        : 'disabled'
                  }
                  onClick={async () => {
                    if (step < 2) {
                      setStep((preview) => {
                        const value = preview + 1;
                        return value;
                      });
                    } else {
                      const newdate = new Date(dateGet);
                      newdate.setHours(
                        +heure.split(':')[0],
                        +heure.split(':')[1]
                      );
                      console.log('newdate', newdate);
                      setLoad(true);
                      const response3 = new CalendarService()
                        .CreateReservation({
                          name: 'string',
                          total_price: total,
                          description: null,
                          startAt: newdate.toString(),
                          service_booking_id: id_array,
                          conversation_id: '66737253b61d3059b67578f2',
                        })
                        .then((result) => {
                          setLoad(false);
                          // dispatch(setPrestation(result.data));
                          //   console.log(result.data, 'data..........5478');
                          setStep((preview) => {
                            const value = preview + 1;
                            return value;
                          });
                          toast.success('booking succeeded');
                            
                        })
                        .catch((error) => {
                          console.log('error', error);
                          toast.error('something went wrong');
                        });
                    }
                  }}
                >
                  continues
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
};

export default CalendarComponent;
