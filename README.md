# Agnos Real-Time Patient Form

A responsive patient input form and staff view system where staff members can monitor all sessions and track patient form data in real-time.

## Live Demo

- [Open Patient Form ↗](https://agnos-realtime-patient-form.vercel.app/patient-form)

- [Open Staff View ↗](https://agnos-realtime-patient-form.vercel.app/staff-view)

## Features

- **Patient Input Form** — allows patients to enter their personal information

- **Form Validation** — ensures required fields and correct input formats

- **Real-Time Multi-Session Monitoring** — allows staff to monitor all patient sessions

- **Real-Time Session Tracking** — allows staff to view individual patient form data

- **Live Status Indicator** — shows Active, Inactive, or Submitted status based on patient activity

- **Activity Timestamp** — displays when the patient was last active or submitted in relative time

- **Automatic Session Cleanup** — removes draft session if the patient leaves or refreshes the form before submitting

- **Responsive Design** — optimized layouts across mobile, tablet, and desktop devices

## Tech Stack

### Core

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**

### Styling

- **Tailwind CSS**

### Form & Validation

- **React Hook Form**
- **Zod**

### Real-time

- **Supabase**

### Tooling

- **ESLint**
- **Prettier**

### Deployment

- **Vercel**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gunpitipat/agnos-realtime-patient-form.git
cd agnos-realtime-patient-form
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

These values can be obtained from your Supabase project.

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Development Planning Documentation

[Development Planning](docs/development-planning.md)

## Notes

In some cases, real-time updates may take a moment to synchronize.
Refreshing the page will restore the latest state.
