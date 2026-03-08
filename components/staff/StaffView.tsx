'use client';

import { useRealtimePatientSessions } from '@/hooks/useRealtimePatientSessions';
import Spinner from '../Spinner';
import SessionRow from './SessionRow';

const StaffView = () => {
  const { sessions, isLoading } = useRealtimePatientSessions();

  if (isLoading) return <Spinner />;

  return (
    <section className="layout-container flex flex-col gap-4">
      {sessions.map((session) => (
        <SessionRow
          key={session.id}
          id={session.id}
          firstName={session.form_data.firstName}
          lastName={session.form_data.lastName}
          phoneNumber={session.form_data.phoneNumber}
          status={session.status}
          lastActiveAt={session.last_active_at}
          submittedAt={session.submitted_at}
        />
      ))}
    </section>
  );
};

export default StaffView;
