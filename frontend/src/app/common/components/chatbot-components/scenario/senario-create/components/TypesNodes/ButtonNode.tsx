import React from 'react';
import { ButtonNodeType } from './types';

function ButtonNode(props: ButtonNodeType) {
  return (
    <button
      {...props}
      onClick={() => props.fc()}
      className=" border-1.5 border-white rounded-2xl px-1.5 py-0.5 text-[12px] nodrag cursor-pointer text-center  "
    >
      {props.title}
    </button>
  );
}

export { ButtonNode };
