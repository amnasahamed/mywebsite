import { useState, useEffect } from 'react';

export function useClock() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return time;
}
