import { ReactNode } from 'react';

export type TabNavigationProps = {
  items: Array<{
    id: string;
    label: string;
    content: ReactNode;
  }>;
};
