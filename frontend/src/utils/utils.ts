import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  if (inputDate) {
    const date = new Date(inputDate);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date
    );

    return formattedDate;
  }
  return '';
}

interface UserData {
  phone_number: string;
  chat_messages: any[];
}
export function sortDataByDate(userData: UserData[]): UserData[] {
  // Sorting function to compare dates
  const compareDates = (a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  };

  // Create a deep copy of the userData array
  const sortedData = JSON.parse(JSON.stringify(userData));

  // Sorting userData array by the most recent date in chat_messages
  sortedData.forEach((user: any) => {
    user.chat_messages.sort(compareDates);
  });

  // Sorting the entire array based on the first chat message's date
  sortedData.sort((a: any, b: any) => {
    const dateA = new Date(a.chat_messages[0].date).getTime();
    const dateB = new Date(b.chat_messages[0].date).getTime();
    return dateB - dateA;
  });

  return sortedData;
}
