import { useCalender } from "@/app/hooks/useCalendar";
import LinearCalendar from "./calendar/CalendarHere";
import Calendar from "./calendar/CalendarHere"

const HeureComponent: React.FC<{ getCurrentDtae: any }> = (props) => {
    
    const{dateGet}= useCalender()
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
  const startDate =
    new Date(dateGet).getFullYear().toString() +
    '-' +
    (new Date(dateGet).getMonth() + 1).toString() +
    '-01';
  const endDate =
    new Date(dateGet).getFullYear().toString() +
    '-' +
    (new Date(dateGet).getMonth() + 1).toString() +
    '-' +
    getNumberDay(
      new Date(dateGet).getMonth() + 1,
      new Date(dateGet).getFullYear()
    )?.toString();

  return (
    <div>
     
        <h1 className="text-3xl font-bold mb-6">{"Selectionner l’heure"}</h1>
        <LinearCalendar
          initialStartDate={startDate}
          initialEndDate={endDate}
          getDateCurrent={props.getCurrentDtae}
        />
    
    </div>
  );
};
export default HeureComponent