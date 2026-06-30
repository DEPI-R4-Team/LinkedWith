const summary = [
  { label: "Account Type", value: "Student" },
  { label: "Status", value: "Active" },
  { label: "Total Requests", value: "6" },
  { label: "Completed Sessions", value: "3" },
  { label: "Held Payments", value: "2" },
  { label: "Reviews Given", value: "3" },
];

export function AccountSummaryCard() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Account Summary</h2>
      <dl className="mt-lg space-y-sm">
        {summary.map((item) => (
          <div className="flex justify-between gap-md text-body-sm" key={item.label}>
            <dt className="text-on-surface-variant">{item.label}</dt>
            <dd className="font-medium text-on-surface">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
