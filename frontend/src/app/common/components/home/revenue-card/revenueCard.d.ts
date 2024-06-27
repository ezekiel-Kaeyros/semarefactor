import { ReactNode } from 'react';

export type RevenueCardProps = {
  title: string;
  currentWeekAmount: string;
  previousWeekAmount: string;
  content: ReactNode;
};
