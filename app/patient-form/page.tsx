import PatientForm from '@/components/PatientForm';

export default function Page() {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="heading">Patient Form</h1>
      <PatientForm />
    </main>
  );
}
