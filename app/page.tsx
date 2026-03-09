import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-container">
      <h1 className="heading">Real-time Patient Form</h1>

      <div className="layout-container flex flex-col gap-4">
        <div className="text-base">
          <p>To test the real-time functionality:</p>
          <ol className="mt-2 ml-8 list-decimal space-y-2">
            <li>Open two browser tabs.</li>
            <li>
              In the first tab, go to{' '}
              <Link href="/patient-form" className="font-medium">
                Patient Form
              </Link>
              .
            </li>
            <li>
              In the second tab, open{' '}
              <Link href="/staff-view" className="font-medium">
                Staff View
              </Link>{' '}
              to monitor all sessions in real-time.
            </li>
            <li>
              Click a session in Staff View to preview the patient&apos;s form
              data.
            </li>
          </ol>
        </div>

        <div className="text-base">
          <p>You can also test:</p>
          <ul className="mt-2 ml-8 list-disc space-y-2">
            <li>
              Active / Inactive status by stopping interaction for 30 seconds.
              <span className="block text-sm opacity-75">
                (typing, scrolling, mouse movement, touch, and tab visibility)
              </span>
            </li>
            <li>
              Session removal when leaving or refreshing the form before
              submitting.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
