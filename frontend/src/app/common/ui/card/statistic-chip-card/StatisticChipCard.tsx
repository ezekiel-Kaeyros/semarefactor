import Image from 'next/image';
import React from 'react';

const StatisticChipCard = ({
  icon,
  stat,
  color,
}: {
  icon: string;
  stat: string;
  color?: string;
}) => {
  return (
    <div
      style={{ backgroundColor: color ? color : '#2D383C' }}
      className="px-3 mr-2 mt-2 h-8 py-1  rounded-full flex items-center"
    >
      <Image src={icon} alt="Stat icon" />{' '}
      <div className="ml-2 text-sm">{stat}</div>
    </div>
  );
};

export default StatisticChipCard;
