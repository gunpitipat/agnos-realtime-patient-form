# Development Planning Documentation

## Project Structure

The project follows the Next.js App Router structure and organizes UI components, hooks, utilities, and shared types into separate folders for maintainability and scalability.

```text
app/
  globals.css
  layout.tsx
  page.tsx
  patient-form/
    page.tsx
  staff-view/
    page.tsx
    session/
      [id]/
        page.tsx

components/
  Indicator.tsx
  Navbar.tsx
  PatientForm.tsx
  Spinner.tsx
  staff/
    SessionField.tsx
    SessionRow.tsx
    SessionView.tsx
    StaffView.tsx

constants/
hooks/
lib/
schemas/
types/
utils/
```

- **app/** — application routes using Next.js App Router

- **components/** — reusable and feature-specific UI components

- **constants/** — shared constant values (e.g., database table name, navigation config, and session status metadata)

- **hooks/** — custom React hooks for fetching initial data, subscribing to Supabase real-time, and handling session inactivity

- **lib/** — Supabase client setup and helper functions for managing patient sessions

- **schemas/** — Zod schema for validating form data and inferring a TypeScript type

- **types/** — shared TypeScript types for patient session data, aligned with the Supabase table structure

- **utils/** — utility functions for text and date formatting

## Design

### Design Goals

The UI focuses on simplicity, readability, and consistency for both patients and staff. The color palette and typography were inspired by the Agnos Health website to create a familiar visual tone.

### Navigation

The application uses a simple top navigation bar with three items: **Home**, **Patient Form**, and **Staff View**. Since they comfortably fit on small screens, a hamburger menu or sidebar was intentionally not implemented.

### Layout and Responsiveness

Both the **Patient Form** and **Staff View** use a centered, stacked layout.

- On **small** screens, content expands close to the full width of the screen to maximize usable space.

- On **larger** screens, content grows with the viewport but is constrained with a `max-width` to maintain readability.

- On **desktop**, spacing and font sizes are slightly increased for clarity.

- In the Staff View session list, long names and phone numbers are truncated on very small screens to prevent layout overflow.

### UI States

The **Staff View** and **Session View** pages have three UI states:

- **Loading state** — shows a spinner while initial data is being fetched.

- **Empty state** — displays a message when no data exists.

- **Data state** — shows data as a session list with key information in the **Staff View** for quick scanning by staff, and a form preview in the **Session View**.

### Scope Decisions

Due to scope and time constraints, global **not-found** and **error** pages were not prioritized for this implementation. Instead, missing data is handled with a fallback message, and unexpected errors are logged using `console.error`.

## Component Architecture

- **PatientForm**
  - Handles patient input and form validation using React Hook Form and Zod
  - Creates a session when the patient starts filling the form
  - Updates the session as the form values change
  - Marks the session as inactive after a period of user inactivity
  - Submits the session and redirects to the Home page
  - Removes the draft session if the patient leaves without submitting

- **StaffView**
  - Displays a list of patient sessions using the **SessionRow** component for each session
  - Fetches initial sessions and subscribes to Supabase real-time updates
  - Updates the session list as sessions change

- **SessionView**
  - Displays a form preview for a single patient
  - Fetches the session and subscribes to Supabase real-time updates
  - Updates preview data as the patient modifies form values
  - Shows session status and activity information using the **Indicator** component

## Real-Time Synchronization Flow

- Real-time updates are handled using Supabase `postgres_changes` subscriptions.

- When a patient starts filling the form, a session is created in the database.

- As the patient modifies form values, the session is continuously updated with the latest form data, activity status, and timestamp.

- Staff interfaces (Supabase client) subscribe to Supabase real-time changes from the `patient_sessions` table through a WebSocket connection.
  - The **StaffView** subscribes to all session changes, while the **SessionView** subscribes to a specific session using an ID filter.

- As updates occur in the database, Supabase emits real-time events to the client, and the UI state updates accordingly, allowing staff to view session status and form updates instantly.
