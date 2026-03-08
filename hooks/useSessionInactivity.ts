'use client';

import { useEffect, useRef } from 'react';
import { markSessionInactive } from '@/lib/patient-session';

const INACTIVITY_TIMEOUT = 30 * 1000;

export const useSessionInactivity = (
  sessionRef: React.RefObject<string | null>
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        const sessionId = sessionRef.current;
        if (!sessionId) return;

        try {
          await markSessionInactive(sessionId);
        } catch (err) {
          console.error(err);
        }
      }, INACTIVITY_TIMEOUT);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTimer();
      }
    };

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      events.forEach((event) => window.removeEventListener(event, resetTimer));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionRef]);
};
