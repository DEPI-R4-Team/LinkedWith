const subjects = ["React", "Frontend Development", "Databases", "Mathematics"];
const preferences = [
  { label: "Preferred Session Type", value: "Online" },
  { label: "Preferred Session Mode", value: "Individual and Group" },
  { label: "Learning Level", value: "Beginner to Intermediate" },
  { label: "Budget Range", value: "100 - 250 EGP per session" },
];

export function LearningPreferencesCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Learning Preferences</h2>

      <div className="mt-lg">
        <p className="text-body-sm text-on-surface-variant">Interested Subjects</p>
        <div className="mt-sm flex flex-wrap gap-sm">
          {subjects.map((subject) => (
            <span
              className="rounded-full bg-primary/15 px-sm py-xs text-body-sm text-primary ring-1 ring-primary/25"
              key={subject}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-lg grid gap-md md:grid-cols-2">
        {preferences.map((item) => (
          <div className="rounded-md border border-outline-variant bg-surface-container-low p-md" key={item.label}>
            <dt className="text-body-sm text-on-surface-variant">{item.label}</dt>
            <dd className="mt-xs text-body-sm font-medium text-on-surface">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
