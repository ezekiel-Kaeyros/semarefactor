import { ConversationsType } from '@/redux/features/types';
import { fiftyNineSeconds, padVar, twentyFourHours, zero } from './constants';

export const attachCountdownTimer = (object: ConversationsType) => {
  object.hours = twentyFourHours;
  object.minutes = zero;
  object.seconds = zero;

  const formatTime = (value: any) => {
    return value.toString().padStart(padVar, '0');
  };

  object.timer! = setInterval(() => {
    if (object?.seconds! > zero) {
      object.seconds!--;
    } else {
      if (object?.minutes! > zero) {
        object.minutes!--;
        object.seconds! = fiftyNineSeconds;
      } else {
        if (object?.hours! > zero) {
          object.hours!--;
          object.minutes! = fiftyNineSeconds;
          object.seconds! = fiftyNineSeconds;
        } else {
          clearInterval(object?.timer);
          //console.log(
          //   `Timer for object with ID ${object?.id} has reached 00:00:00`
          // );
        }
      }
    }

    const formattedTime = `${formatTime(object.hours)}:${formatTime(object.minutes)}:${formatTime(object.seconds)}`;
    // ;
  }, 1000);

  return object;
};

export const getTimeLeft = (endDateTime: string, currentDateTime: string) => {
  const timeDiff =
    new Date(endDateTime).getTime() - new Date(currentDateTime).getTime();

  if (timeDiff <= 0) {
    return '00:00:00';
  }

  let seconds = Math.floor(timeDiff / 1000) % 60;
  let minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  let hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

  const formatTime = (value: any) => {
    return value.toString().padStart(2, '0');
  };

  const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  return formattedTime;
};

export function addOneDayToDate(currentDate: any): any {
  let nextDay: any = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay = new Date(nextDay).toString();
  return nextDay;
}

export const specialDatTimeFormat = (data: any) => {
  const date = new Date(data);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export function updateTimer(conversation: ConversationsType) {
  const currentTime = new Date().getTime();
  const timeDiff: any =
    new Date(conversation?.deadline).getTime() - currentTime;

  // ;
  if (timeDiff <= 0 || timeDiff >= 24 * 60 * 60 * 1000) {
    conversation = {
      ...conversation,
      timer: 'Expired',
    };
    //   conversation.timer = 'Expired';
  } else {
    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

    conversation = {
      ...conversation,
      timer: `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`,
    };

    //   conversation.timer = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;

    // setTimeout(() => {
    //   updateTimer(conversation);
    // }, 1000); // Update the timer every second (1000 milliseconds)
  }
}

function padStart(value: any) {
  return value.toString().padStart(2, '0');
}

//   // Example usage
//   const endDateTime = '2024-01-30T12:00:00';
//   const currentDateTime = '2024-01-28T18:30:00';

//   const timeLeft = getTimeLeft(endDateTime, currentDateTime);
//   // ;
