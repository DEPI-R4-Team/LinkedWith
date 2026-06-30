import { useState } from "react";

const initialSettings = {
  newApplications: true,
  applicationUpdates: true,
  paymentReleases: true,
  sessionReminders: true,
  studentMessages: true,
  marketingEmails: false,
};

export function InstructorSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [message, setMessage] = useState("");

  function toggleSetting(key: keyof typeof settings) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setMessage("");
  }

  function handleSave() {
    setSavedSettings(settings);
    setMessage("Settings saved successfully.");
  }

  function handleCancel() {
    setSettings(savedSettings);
    setMessage("Unsaved settings were reset.");
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Settings</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Manage local dashboard preferences for this academic version.
        </p>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {message && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {message}
          </p>
        )}

        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <h2 className="text-headline-md text-on-surface">Notifications</h2>
          <div className="mt-lg space-y-sm">
            {([
              ["newApplications", "New student applications"],
              ["applicationUpdates", "Application status updates"],
              ["paymentReleases", "Payment and escrow releases"],
              ["sessionReminders", "Session reminders"],
              ["studentMessages", "Student messages"],
              ["marketingEmails", "Academic newsletter"],
            ] as const).map(([key, label]) => (
              <label
                className="flex items-center justify-between gap-md rounded-md border border-outline-variant bg-surface-container-low p-md text-body-sm text-on-surface"
                key={key}
              >
                <span>{label}</span>
                <input
                  checked={settings[key]}
                  className="size-4 accent-primary"
                  onChange={() => toggleSetting(key)}
                  type="checkbox"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
          <h2 className="text-headline-md text-on-surface">Theme</h2>
          <p className="mt-sm text-body-sm text-on-surface-variant">
            Dark mode is kept as the default project theme.
          </p>
        </section>

        <div className="flex flex-wrap gap-sm">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={handleSave}
            type="button"
          >
            Save Settings
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
