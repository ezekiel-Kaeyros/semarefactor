import React from 'react';
import { CardBoxCreateProps, CardBoxOptionAndCatalogProps } from './types';
import Image from 'next/image';
import { cn } from '@/utils/utils';

function CarBoxCreate(props: CardBoxCreateProps) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div
      className={cn(
        `h-28 w-72 bg-red-500 rounded-md flex p-3 cursor-grab `,
        props.color
      )}
      onDragStart={(event) => onDragStart(event, props.typeNode)}
      draggable
    >
      <div>
        <h1 className=" pb-2 ">{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div className="w-10">{props.icon}</div>
    </div>
  );
}

function CarBoxOptionAndCatalog(props: CardBoxOptionAndCatalogProps) {
  return (
    <div
      className={cn(
        `h-32 w-32 bg-mainDarkLight rounded-md flex flex-col  p-3 cursor-grab justify-center place-items-center text-center `
      )}
    >
      <div className="my-2 ">{props.icon}</div>

      <p className=" mx-2">{props.description}</p>
    </div>
  );
}
export { CarBoxCreate, CarBoxOptionAndCatalog };
