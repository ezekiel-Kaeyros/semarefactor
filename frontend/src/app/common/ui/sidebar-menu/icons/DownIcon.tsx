import React from 'react';

type DownIconProps = {
  color?: string;
};

const DownIcon: React.FC<DownIconProps> = ({ color }) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9202 0.179932H6.69024H1.08024C0.120237 0.179932 -0.359763 1.33993 0.320237 2.01993L5.50024 7.19993C6.33024 8.02993 7.68024 8.02993 8.51024 7.19993L10.4802 5.22993L13.6902 2.01993C14.3602 1.33993 13.8802 0.179932 12.9202 0.179932Z"
        fill={color ? `${color}` : 'white'}
      />
    </svg>
  );
};

export default DownIcon;
