// components/LinearCalendar.tsx
import { useCalender } from '@/app/hooks/useCalendar';
import { getDate, getHour, setSaveDate } from '@/redux/features/calendar';
import { CalendarService } from '@/services/calendarService/calendarService';
import { NumberFormatter } from '@internationalized/number';
import { Spinner } from '@nextui-org/spinner';
import { Span } from 'next/dist/trace';
import { Item } from 'rc-menu';
import React, { useEffect, useRef, useState } from 'react';

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

const availableTimes = [
  '11:00 AM',
  '11:30 AM',

  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
];

interface LinearCalendarProps {
  initialStartDate: string;
  initialEndDate: string;
  getDateCurrent: any;
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const getNumberDay = (month: number, year: number): number => {
  switch (month) {
    case 1: // January
    case 3: // March
    case 5: // May
    case 7: // July
    case 8: // August
    case 10: // October
    case 12: // December
      return 31;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      return 30;
    case 2: // February
      return isLeapYear(year) ? 29 : 28;
    default:
      throw new Error('Invalid month');
  }
};
const LinearCalendar: React.FC<LinearCalendarProps> = ({
  initialStartDate,
  initialEndDate,
  getDateCurrent,
}) => {
  const { availableDat, arraySaveDate, heure,dateGet,dispatch } = useCalender();

  const [load, setLoad] = useState(false);
  const [hour, setHour] = useState<{ date: string; hour: string[] }[]>([]);
  const [saveHour, setSaveHour] = useState<string[]>(
    arraySaveDate.filter((item) => item.date == dateGet.toString()).length > 0 ? arraySaveDate.filter((item) => item.date == dateGet.toString())[0].hour : []
  );
 const sliderRef = useRef<HTMLDivElement | null>(null);
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
//   const [dates, setDate] = useState<Date[]>([]);
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const [checkDate, setCheckDate] = useState(
    new Date(
      new Date().getFullYear().toString() +
        '-' +
        (new Date().getMonth() + 1).toString() +
        '-' +
        new Date().getDate().toString()
    )
  );

  const [currentdate, setCurrentDate] = useState(
    new Date(
      new Date().getFullYear().toString() +
        '-' +
        (new Date().getMonth() + 1).toString() +
        '-' +
        new Date().getDate().toString()
    )
  );

  const isGet = (current: Date): boolean => {
    // console.log('current++++++++', NumberFormatter);

    const table = availableDat.filter((item, index) => {
      //   console.log(new Date(item.date), 'items.date');

      if (
        new Date(item.date).getFullYear() == new Date(current).getFullYear() &&
        new Date(item.date).getDay() == new Date(current).getDay() &&
        new Date(item.date).getMonth() == new Date(current).getMonth() &&
        item.isOpen
      ) {
   

        return item;
      }
    });
    return table.length > 0;
  };

  const generateDates = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dates = generateDates(startDate, endDate);

  const handlePreviousMonth = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() - 1);
    const newEndDate = new Date(
      new Date(newStartDate).getFullYear().toString() +
        '-' +
        (new Date(newStartDate).getMonth() + 1).toString() +
        '-' +
        getNumberDay(
          new Date(newStartDate).getMonth() + 1,
          new Date(newStartDate).getFullYear()
        )?.toString()
    );
    // newEndDate.setMonth(newEndDate.getMonth() - 1);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleNextMonth = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() + 1);
    // const newEndDate = new Date(endDate);
    // newEndDate.setMonth(newEndDate.getMonth() + 1);
    const newEndDate = new Date(
      new Date(newStartDate).getFullYear().toString() +
        '-' +
        (new Date(newStartDate).getMonth() + 1).toString() +
        '-' +
        getNumberDay(
          new Date(newStartDate).getMonth() + 1,
          new Date(newStartDate).getFullYear()
        )?.toString()
    );
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };


  useEffect(() => {

    if (
      arraySaveDate.length > 0 &&
      arraySaveDate.filter((item) => item.date == dateGet.toString()).length >
        0
    ) {
      setSaveHour(
        arraySaveDate.filter((item) => item.date == dateGet.toString())[0]
          .hour
      );
    //   setLoad(false);
    } else {
    setLoad(true);

        if (dateGet.getMonth()<9) {
          const response = new CalendarService()
            .getHour(
              '66672c59c615817051015d0c',
              new Date(dateGet).getFullYear().toString() +
                '-' +
                (new Date(dateGet).getMonth() + 1).toString() +
                '-' +
                new Date(dateGet).getDate().toString()
            )
            .then((result) => {
              dispatch(
                setSaveDate({
                  date: dateGet.toString(),
                  hour: result.data,
                })
              );
              setLoad(false);

              // setHour([...hour, { date: dateGet.toString(), hour: result.data }])
              setSaveHour(result.data);
            })
            .catch((error) => {
              setLoad(false);
                console.log(error, 'error');
                setSaveDate({
                  date: dateGet.toString(),
                  hour: [],
                });
            });
        
    } else {
          const response = new CalendarService()
            .getHour('66672c59c615817051015d0c', dateGet.toString())
            .then((result) => {
              dispatch(
                setSaveDate({
                  date: dateGet.toString(),
                  hour: result.data,
                })
              );
              setLoad(false);

              // setHour([...hour, { date: checkDate.toString(), hour: result.data }])
              setSaveHour(result.data);
            })
            .catch((error) => {
              setLoad(false);
                console.log(error, 'error');
                setSaveDate({
                  date: dateGet.toString(),
                  hour: [],
                });
            });
    }
    }
      console.log(arraySaveDate, 'arrraysave+++++++++');
      console.log(checkDate.toString(),'checkkkkkkkkkkkkkkk');
      
      
  }, [dateGet, arraySaveDate]);
    
      useEffect(() => {
        if (dateGet && sliderRef.current) {
          const selectedDate = document.getElementById(dateGet.getTime().toString());
          if (selectedDate) {
            selectedDate.scrollIntoView();
          }
        }
      }, []);

    return (
      
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-4 items-center">
        <button
          disabled={startDate < currentdate}
          onClick={handlePreviousMonth}
          className={`${startDate > currentdate ? 'opacity-100' : 'opacity-70'} text-white py-2 px-4 rounded-lg bg-blue-500`}
        >
          Mois Précédent
        </button>

        <span>
          {mont[new Date(startDate).getMonth()] +
            ' ' +
            new Date(startDate).getFullYear()}
        </span>
        <button
          onClick={handleNextMonth}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Mois Suivant
        </button>
      </div>
      <div
        className="flex w-full items-center overflow-x-auto whitespace-nowrap  p-4 rounded-lg gap-5 no-scrollbar"
        ref={sliderRef}
      >
        {dates.map((date, index) => {
          if (date >= currentdate) {
            return (
              <div
                key={index}
                    className={` flex flex-col items-center gap-2  `}
                    id={date.getTime().toString()}
              >
                <div
                        onClick={() => {
                            console.log(
                              'date',
                              new Date(date).getFullYear().toString() +
                                '-' +
                                (new Date(date).getMonth() + 1).toString() +
                                '-' +
                                new Date(date).getDate().toString()
                            );
                            
                    if (isGet(date)) {
                      dispatch(
                        getDate(
                          new Date(
                            new Date(date).getFullYear().toString() +
                              '-' +
                              (new Date(date).getMonth() + 1).toString() +
                              '-' +
                              new Date(date).getDate().toString()
                          )
                        )
                      );
                      setCheckDate(
                        new Date(
                          new Date(date).getFullYear().toString() +
                            '-' +
                            (new Date(date).getMonth() + 1).toString() +
                            '-' +
                            new Date(date).getDate().toString()
                        )
                      );

                      getDateCurrent(
                        new Date(
                          new Date(date).getFullYear().toString() +
                            '-' +
                            (new Date(date).getMonth() + 1).toString() +
                            '-' +
                            new Date(date).getDate().toString()
                        )
                      );
                    }
                  }}
                  className={`text-white text-lg h-14  w-14  rounded-full flex items-center justify-center 
                  
                    ${
                      !isGet(date)
                        ? 'bg-gray-300'
                        : date.getTime() != dateGet.getTime()
                          ? 'bg-gray-800 cursor-pointer'
                          : 'bg-blue-500 cursor-pointer selected'
                    }     `}
                >
                  {date.getDate()}
                </div>
                <div className="text-gray-400 text-sm">
                  {daysOfWeek[date.getDay()]}
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="w-full min-h-96 rounded-xl bg-[#212529] p-4">
        {!load && (
          <div className="w-full flex flex-col gap-5">
            {!load &&
              saveHour &&
              saveHour.map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${heure == item && ' bg-blue-500 '} cursor-pointer rounded-xl pl-5 py-4 bg-[#2B2E31] font-bold flex items-center`}
                  onClick={() => {
                    dispatch(getHour(item));
                    //   dispatch(getDate(checkDate.toString()))
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        )}

        {load && (
          <div className="w-full h-full flex justify-center items-center text-white">
            <Spinner
              label="Loading . . . "
              color="primary"
              size="lg"
              classNames={{ label: 'text-white' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LinearCalendar;
