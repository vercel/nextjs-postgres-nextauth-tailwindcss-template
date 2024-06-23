import { useEffect, useRef, useState } from 'react';

export function useInfiniteScroll(onIntersect: () => void) {
  const sentinelRef = useRef<HTMLElement | null>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer) {
      observer.disconnect();
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: '50px 0px 0px 0px'
      }
    );

    setObserver(obs);

    if (sentinelRef.current) {
      obs.observe(sentinelRef.current);
    }

    return () => obs.disconnect();
  }, [onIntersect]);

  return sentinelRef;
}
