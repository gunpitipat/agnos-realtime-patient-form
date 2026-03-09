'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getPatientSessions } from '@/lib/patient-session';
import { PATIENT_SESSIONS_TABLE } from '@/constants/db';
import type { PatientSession } from '@/types/patient-session';

export const useRealtimePatientSessions = () => {
  const [sessions, setSessions] = useState<PatientSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getPatientSessions();
        setSessions(data);
      } catch (err) {
        console.error('Failed to fetch patient sessions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();

    // Subscribe realtime
    const channel = supabase
      .channel('patient-sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: PATIENT_SESSIONS_TABLE,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            const oldSession = payload.old as PatientSession;

            setSessions((prev) =>
              prev.filter((session) => session.id !== oldSession.id)
            );

            return;
          }

          const newSession = payload.new as PatientSession;

          setSessions((prev) => {
            const exists = prev.find((session) => session.id === newSession.id);
            if (exists) {
              return prev.map((session) =>
                session.id === newSession.id ? newSession : session
              );
            }

            return [newSession, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { sessions, isLoading };
};
