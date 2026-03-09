import Link from 'next/link';
import Indicator from '../Indicator';
import type { PatientSessionStatus } from '@/types/patient-session';

type SessionRowProps = {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status: PatientSessionStatus;
  lastActiveAt: string;
  submittedAt: string | null;
};

const SessionRow = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  status,
  lastActiveAt,
  submittedAt,
}: SessionRowProps) => {
  const name =
    firstName || lastName
      ? `${firstName ?? ''} ${lastName ?? ''}`.trim()
      : 'Unnamed Patient';

  return (
    <Link
      href={`/staff-view/session/${id}`}
      className="border-border hover:border-secondary shadow-border w-full rounded-md border px-4 py-3 shadow-sm transition-colors duration-150 ease-out"
    >
      <Indicator
        status={status}
        lastActiveAt={lastActiveAt}
        submittedAt={submittedAt}
      />

      <div className="mt-1 flex justify-between gap-4">
        <span className="max-w-40 truncate">{name}</span>

        <span className="max-w-30 truncate">{phoneNumber || '—'}</span>
      </div>
    </Link>
  );
};

export default SessionRow;
