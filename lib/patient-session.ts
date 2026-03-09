import { supabase } from './supabase';
import { PATIENT_SESSIONS_TABLE } from '@/constants/db';
import type { PatientFormData } from '@/schemas/patient-form.schema';
import type { PatientSession } from '@/types/patient-session';

export const createSession = async (
  formData: Partial<PatientFormData>
): Promise<PatientSession> => {
  const { data, error } = await supabase
    .from(PATIENT_SESSIONS_TABLE)
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
    .from(PATIENT_SESSIONS_TABLE)
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
    .from(PATIENT_SESSIONS_TABLE)
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
    .from(PATIENT_SESSIONS_TABLE)
    .update({
      status: 'inactive',
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getPatientSessions = async (): Promise<PatientSession[]> => {
  const { data, error } = await supabase
    .from(PATIENT_SESSIONS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

export const getPatientSession = async (
  id: string
): Promise<PatientSession> => {
  const { data, error } = await supabase
    .from(PATIENT_SESSIONS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

export const deleteSession = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(PATIENT_SESSIONS_TABLE)
    .delete()
    .eq('id', id);

  if (error) throw error;
};
