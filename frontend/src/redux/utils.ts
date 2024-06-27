// import { IActivity } from './features/types';

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds: any = seconds.toString().padStart(2, '0');
  // setFormattedSeconds (formattedSeconds)
  return `${formattedMinutes}:${formattedSeconds}`;
};