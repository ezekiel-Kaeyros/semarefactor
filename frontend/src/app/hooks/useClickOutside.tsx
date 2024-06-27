import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: any) => {
  let domNode = useRef<any>();

  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (!domNode || !domNode?.current?.contains(event?.target)) {
        handler(event);
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    document.addEventListener('touchstart', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
      document.removeEventListener('touchstart', maybeHandler);
    };
  });
  return domNode;
};
