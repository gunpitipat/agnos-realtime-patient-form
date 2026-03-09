type SessionFieldProps = {
  label: string;
  value?: string;
  optional?: boolean;
  multiline?: boolean;
};

const SessionField = ({
  label,
  value = '',
  optional,
  multiline,
}: SessionFieldProps) => {
  return (
    <div className="form-field">
      <span className="form-label">
        {label}
        {optional && <span className="form-label-hint">(optional)</span>}
      </span>

      <div
        className={`form-input ${multiline ? 'min-h-20.5 whitespace-pre-line lg:min-h-23.5' : 'form-input-height'}`}
      >
        {value}
      </div>
    </div>
  );
};

export default SessionField;
