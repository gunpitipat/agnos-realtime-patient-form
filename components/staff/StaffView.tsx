'use client';

import { useRealtimePatientSessions } from '@/hooks/useRealtimePatientSessions';

const StaffView = () => {
  const { sessions } = useRealtimePatientSessions();

  return <section>{JSON.stringify(sessions)}</section>;
};

export default StaffView;
