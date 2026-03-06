import * as z from 'zod';

export const PatientFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  dateOfBirth: z.iso.date('Invalid date format'),
  gender: z.enum(['male', 'female'], 'Please select a gender.'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .regex(/^[+0-9][0-9\s-]*$/, 'Invalid phone number format')
    .min(9, 'Please complete your phone number.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .pipe(z.email('Please enter a valid email.')),
  address: z.string().trim().min(1, 'Address is required.'),
  preferredLanguage: z
    .string()
    .trim()
    .min(1, 'Preferred language is required.'),
  nationality: z.string().trim().min(1, 'Nationality is required.'),
  emergencyContact: z
    .object({
      name: z.string().trim().optional(),
      relationship: z.string().trim().optional(),
    })
    .optional()
    .refine(
      (data) => {
        if (!data) return true;

        const hasRelationship = !!data.relationship?.trim();
        const hasName = !!data.name?.trim();

        return !(hasRelationship && !hasName);
      },
      { message: "Please enter an emergency contact's name.", path: ['name'] }
    ),
  religion: z.string().trim().optional(),
});

export type PatientFormData = z.infer<typeof PatientFormSchema>;
