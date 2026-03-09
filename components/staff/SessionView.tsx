'use client';

import { useRealtimePatientSession } from '@/hooks/useRealtimePatientSession';
import { formatDate } from '@/utils/formatDate';
import { capitalize } from '@/utils/capitalize';
import Spinner from '../Spinner';
import Indicator from '../Indicator';
import SessionField from './SessionField';

type SessionViewProps = {
  id: string;
};

const SessionView = ({ id }: SessionViewProps) => {
  const { session, isLoading } = useRealtimePatientSession(id);

  if (isLoading) return <Spinner />;

  if (!session) return <section>Session not found</section>;

  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    phoneNumber,
    email,
    address,
    preferredLanguage,
    nationality,
    emergencyContact,
    religion,
  } = session.form_data;

  return (
    <section className="form layout-container">
      <Indicator
        status={session.status}
        lastActiveAt={session.last_active_at}
        submittedAt={session.submitted_at}
      />

      <SessionField label="First name" value={firstName} />
      <SessionField label="Middle name" value={middleName} optional />
      <SessionField label="Last name" value={lastName} />
      <SessionField
        label="Date of birth"
        value={dateOfBirth ? formatDate(dateOfBirth) : ''}
      />
      <SessionField label="Gender" value={gender ? capitalize(gender) : ''} />
      <SessionField label="Phone number" value={phoneNumber} />
      <SessionField label="Email" value={email} />
      <SessionField label="Address" value={address} multiline />
      <SessionField label="Preferred language" value={preferredLanguage} />
      <SessionField label="Nationality" value={nationality} />

      <div className="flex flex-col gap-2">
        <div className="form-label">
          Emergency contact
          <span className="form-label-hint">(optional)</span>
        </div>

        <div className="form-field">
          <span>Name</span>
          <div className="form-input form-input-height">
            {emergencyContact?.name ?? ''}
          </div>
        </div>

        <div className="form-field">
          <span>Relationship</span>
          <div className="form-input form-input-height">
            {emergencyContact?.relationship ?? ''}
          </div>
        </div>
      </div>

      <SessionField label="Religion" value={religion} optional />
    </section>
  );
};

export default SessionView;
