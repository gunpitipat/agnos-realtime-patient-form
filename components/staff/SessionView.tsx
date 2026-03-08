'use client';

import { useRealtimePatientSession } from '@/hooks/useRealtimePatientSession';
import Spinner from '../Spinner';

type SessionViewProps = {
  id: string;
};

const SessionView = ({ id }: SessionViewProps) => {
  const { session, isLoading } = useRealtimePatientSession(id);

  if (isLoading) return <Spinner />;
  
  return <section>{JSON.stringify(session)}</section>;
};

export default SessionView;
