export const SESSION_STATUS_META = {
  active: {
    label: 'Active',
    indicatorClass: 'bg-green-500',
    textClass: 'text-green-800',
  },
  inactive: {
    label: 'Inactive',
    indicatorClass: 'bg-amber-500',
    textClass: 'text-amber-800',
  },
  submitted: {
    label: 'Submitted',
    indicatorClass: 'bg-blue-500',
    textClass: 'text-blue-800',
  },
} as const;
