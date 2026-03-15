import { useRef, useEffect } from 'react';

/**
 * Custom hook to auto-scroll to the bottom of a container
 * Useful for chat interfaces and message lists
 */
export const useAutoScrollToBottom = <T extends HTMLElement>(
  dependencies: any[] = []
) => {
  const ref = useRef<T>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { ref, scrollToBottom };
};
