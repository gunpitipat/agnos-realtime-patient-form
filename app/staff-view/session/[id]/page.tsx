import SessionView from '@/components/staff/SessionView';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="page-container">
      <h1 className="heading">Staff View</h1>
      <SessionView id={id} />
    </main>
  );
}
