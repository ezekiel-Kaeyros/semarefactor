import { useCallback, useEffect } from 'react';

export const useScrollToBottom = () => {
  let scrollToBottomOnce = useCallback(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    scrollToBottomOnce();
  }, [scrollToBottomOnce]);
};
