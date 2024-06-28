import React from 'react';
import { ButtonNodeType } from './types';
import { Tooltip } from '@nextui-org/react';

function ButtonNode(props: ButtonNodeType) {
  return (
    <Tooltip
      placement={'top'}
      content={!props.conditionDisable ? props.titre : props.errorText}
      color={props.conditionDisable ? 'warning' : 'default'}
      offset={-50}
    >
      <button
        {...props}
        onClick={() => props.fc()}
        className=" border-1.5 border-white rounded-2xl px-1.5 py-0.5 text-[12px] nodrag cursor-pointer text-center  "
      >
        {props.titre}
      </button>
    </Tooltip>
  );
}

export { ButtonNode };
