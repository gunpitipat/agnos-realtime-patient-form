import type { PatientFormData } from '@/schemas/patient-form.schema';

export type PatientSessionStatus = 'active' | 'inactive' | 'submitted';

export type PatientSession = {
  id: string;
  form_data: Partial<PatientFormData>;
  status: PatientSessionStatus;

  created_at: string;
  last_active_at: string;
  submitted_at: string | null;
};
