import { SESSION_STATUS_META } from '@/constants/session-status';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import type { PatientSessionStatus } from '@/types/patient-session';

type IndicatorProps = {
  status: PatientSessionStatus;
  lastActiveAt: string;
  submittedAt: string | null;
};

const Indicator = ({ status, lastActiveAt, submittedAt }: IndicatorProps) => {
  const { label, indicatorClass, textClass } = SESSION_STATUS_META[status];

  const statusDescription =
    status === 'active'
      ? 'Filling in...'
      : formatTimeAgo(submittedAt ?? lastActiveAt); // submittedAt is null until submission

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className={`${indicatorClass} size-3 rounded-full`} />
        <span className={textClass}>{label}</span>
      </div>

      <span className="text-sm">{statusDescription}</span>
    </div>
  );
};

export default Indicator;
