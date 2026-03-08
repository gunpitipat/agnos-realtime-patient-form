import { supabase } from './supabase';
import type { PatientFormData } from '@/schemas/patient-form.schema';
import type { PatientSession } from '@/types/patient-session';

const TABLE = 'patient_sessions';

export const createSession = async (
  formData: Partial<PatientFormData>
): Promise<PatientSession> => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      form_data: formData,
      status: 'active',
      last_active_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateSession = async (
  id: string,
  formData: Partial<PatientFormData>
): Promise<PatientSession> => {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      form_data: formData,
      status: 'active',
      last_active_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const submitSession = async (
  id: string,
  formData: Partial<PatientFormData>
): Promise<PatientSession> => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      form_data: formData,
      status: 'submitted',
      last_active_at: now,
      submitted_at: now,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const markSessionInactive = async (
  id: string
): Promise<PatientSession> => {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      status: 'inactive',
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
