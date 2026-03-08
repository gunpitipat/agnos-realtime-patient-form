'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getPatientSession } from '@/lib/patient-session';
import { PATIENT_SESSIONS_TABLE } from '@/constants/db';
import type { PatientSession } from '@/types/patient-session';

export const useRealtimePatientSession = (id: string) => {
  const [session, setSession] = useState<PatientSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getPatientSession(id);
        setSession(data);
      } catch (err) {
        console.error('Failed to fetch patient session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Subscribe realtime
    const channel = supabase
      .channel(`patient-session-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: PATIENT_SESSIONS_TABLE,
          filter: `id=eq.${id}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setSession(null);
            return;
          }

          const newSession = payload.new as PatientSession;
          setSession(newSession);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return { session, isLoading };
};
