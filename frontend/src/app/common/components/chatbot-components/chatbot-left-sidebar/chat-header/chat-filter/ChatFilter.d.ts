export type TownsFitlerProps = {
  options: Array<{
    id: number;
    town: string;
  }>;
  handleSelect?: (id: string | number) => void;
};

export const Filteroptions = [
  {
    id: 1,
    town: 'Town',
  },
  {
    id: 2,
    town: 'Yaounde',
  },
  {
    id: 3,
    town: 'Douala',
  },
  {
    id: 4,
    town: 'Bafoussam',
  },
  {
    id: 5,
    town: 'Buea',
  },
];
