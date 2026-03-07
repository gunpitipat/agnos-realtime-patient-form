import type { PatientFormData } from '@/schemas/patient-form.schema';

export type PatientSession = {
  id: string;
  form_data: Partial<PatientFormData>;
  status: string;
  last_active_at: string;
  created_at: string;
};
