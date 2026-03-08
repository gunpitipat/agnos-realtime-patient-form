'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PatientFormSchema,
  type PatientFormData,
} from '@/schemas/patient-form.schema';
import {
  createSession,
  updateSession,
  submitSession,
} from '@/lib/patient-session';

const PatientForm = () => {
  const {
    register,
    handleSubmit,
    subscribe,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(PatientFormSchema),
  });

  const sessionIdRef = useRef<string | null>(null);
  const isCreatingRef = useRef(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<PatientFormData> = async (data) => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;

    try {
      await submitSession(sessionId, data);
      alert('Form submitted');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Submission has failed.');
    }
  };

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: {
        values: true,
      },
      callback: async ({ values: formData }) => {
        if (!sessionIdRef.current) {
          if (isCreatingRef.current) return;

          isCreatingRef.current = true;

          const data = await createSession(formData);
          sessionIdRef.current = data.id;
          return;
        }

        await updateSession(sessionIdRef.current, formData);
      },
    });

    return () => unsubscribe();
  }, [subscribe]);

  return (
    // NOTE: React compiler false positive: ref access in built-in event handler (RHF pattern)
    // Fixed upstream: https://github.com/facebook/react/pull/35062
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <input
          id="firstName"
          type="text"
          className="form-input"
          {...register('firstName')}
          autoComplete="given-name"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          required
        />
        {errors.firstName && (
          <p id="firstName-error" role="alert" className="form-error">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="middleName" className="form-label">
          Middle name
          <span className="form-label-hint">(optional)</span>
        </label>
        <input
          id="middleName"
          type="text"
          className="form-input"
          {...register('middleName')}
          autoComplete="additional-name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          className="form-input"
          {...register('lastName')}
          autoComplete="family-name"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          required
        />
        {errors.lastName && (
          <p id="lastName-error" role="alert" className="form-error">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="dateOfBirth" className="form-label">
          Date of birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          className="form-input"
          {...register('dateOfBirth')}
          autoComplete="bday"
          aria-invalid={!!errors.dateOfBirth}
          aria-describedby={
            errors.dateOfBirth ? 'dateOfBirth-error' : undefined
          }
          required
        />
        {errors.dateOfBirth && (
          <p id="dateOfBirth-error" role="alert" className="form-error">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          className="form-input min-h-8.5 lg:min-h-9.5"
          {...register('gender')}
          aria-invalid={!!errors.gender}
          aria-describedby={errors.gender ? 'gender-error' : undefined}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p id="gender-error" role="alert" className="form-error">
            {errors.gender.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="phoneNumber" className="form-label">
          Phone number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="form-input"
          {...register('phoneNumber')}
          autoComplete="tel"
          aria-invalid={!!errors.phoneNumber}
          aria-describedby={
            errors.phoneNumber ? 'phoneNumber-error' : undefined
          }
          required
        />
        {errors.phoneNumber && (
          <p id="phoneNumber-error" role="alert" className="form-error">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email')}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          required
        />
        {errors.email && (
          <p id="email-error" role="alert" className="form-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          className="form-input resize-none"
          {...register('address')}
          autoComplete="street-address"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          required
        />
        {errors.address && (
          <p id="address-error" role="alert" className="form-error">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="preferredLanguage" className="form-label">
          Preferred language
        </label>
        <input
          id="preferredLanguage"
          type="text"
          className="form-input"
          {...register('preferredLanguage')}
          aria-invalid={!!errors.preferredLanguage}
          aria-describedby={
            errors.preferredLanguage ? 'preferredLanguage-error' : undefined
          }
          required
        />
        {errors.preferredLanguage && (
          <p id="preferredLanguage-error" role="alert" className="form-error">
            {errors.preferredLanguage.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="nationality" className="form-label">
          Nationality
        </label>
        <input
          id="nationality"
          type="text"
          className="form-input"
          {...register('nationality')}
          aria-invalid={!!errors.nationality}
          aria-describedby={
            errors.nationality ? 'nationality-error' : undefined
          }
          required
        />
        {errors.nationality && (
          <p id="nationality-error" role="alert" className="form-error">
            {errors.nationality.message}
          </p>
        )}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="form-label">
          Emergency contact
          <span className="form-label-hint">(optional)</span>
        </legend>

        <div className="form-field">
          <label htmlFor="emergencyContactName">Name</label>
          <input
            id="emergencyContactName"
            type="text"
            className="form-input"
            {...register('emergencyContact.name')}
            aria-invalid={!!errors.emergencyContact?.name}
            aria-describedby={
              errors.emergencyContact?.name
                ? 'emergencyContactName-error'
                : undefined
            }
          />
          {errors.emergencyContact?.name && (
            <p
              id="emergencyContactName-error"
              role="alert"
              className="form-error"
            >
              {errors.emergencyContact.name.message}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="emergencyContactRelationship">Relationship</label>
          <input
            id="emergencyContactRelationship"
            type="text"
            className="form-input"
            {...register('emergencyContact.relationship')}
          />
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="religion" className="form-label">
          Religion
          <span className="form-label-hint">(optional)</span>
        </label>
        <input
          id="religion"
          type="text"
          className="form-input"
          {...register('religion')}
        />
      </div>

      <button
        type="submit"
        className={`primary-btn mt-4 ${isSubmitting ? 'active-btn' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default PatientForm;
