import Link from 'next/link';
import { SESSION_STATUS_META } from '@/constants/session-status';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
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

  const { label, indicatorClass, textClass } = SESSION_STATUS_META[status];

  const statusDescription =
    status === 'active'
      ? 'Filling in...'
      : formatTimeAgo(submittedAt ?? lastActiveAt); // submittedAt is null until submission

  return (
    <Link
      href={`/staff-view/session/${id}`}
      className="border-border hover:border-secondary shadow-border w-full rounded-md border px-4 py-3 shadow-sm transition-colors duration-150 ease-out"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`${indicatorClass} size-3 rounded-full`} />
          <span className={textClass}>{label}</span>
        </div>

        <span className="text-sm">{statusDescription}</span>
      </div>

      <div className="mt-1 flex justify-between gap-4">
        <span className="max-w-40 truncate">{name}</span>

        <span className="max-w-30 truncate">{phoneNumber || '—'}</span>
      </div>
    </Link>
  );
};

export default SessionRow;
