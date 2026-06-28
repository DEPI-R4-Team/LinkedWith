import { useState } from "react";
import { Pencil } from "lucide-react";

const personalInfo = [
  { label: "Full Name", value: "Ziad Ahmed" },
  { label: "Email", value: "ziad@example.com" },
  { label: "Phone", value: "01005154081" },
  { label: "Education Level", value: "Engineering Student" },
  { label: "University", value: "Menoufia University" },
  { label: "Department", value: "Computer and Electrical Engineering" },
  { label: "Preferred Language", value: "English" },
  { label: "Location", value: "Egypt" },
];

type PersonalInfoCardProps = {
  onCancel?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
};

export function PersonalInfoCard({ onCancel, onEdit, onSave }: PersonalInfoCardProps) {
  const [editing, setEditing] = useState(false);

  function handleEditToggle() {
    const nextEditing = !editing;
    setEditing(nextEditing);
    if (nextEditing) {
      onEdit?.();
    } else {
      onCancel?.();
    }
  }

  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-headline-md text-on-surface">Personal Information</h2>
        <button
          className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
          onClick={handleEditToggle}
          type="button"
        >
          <Pencil className="size-4" />
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <dl className="mt-lg grid gap-md md:grid-cols-2">
        {personalInfo.map((item) => (
          <div className="rounded-md border border-outline-variant bg-surface-container-low p-md" key={item.label}>
            <dt className="text-body-sm text-on-surface-variant">{item.label}</dt>
            <dd className="mt-xs text-body-sm font-medium text-on-surface">{item.value}</dd>
          </div>
        ))}
      </dl>

      {editing ? (
        <div className="mt-lg flex justify-end gap-sm">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-outline-variant px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={() => {
              setEditing(false);
              onCancel?.();
            }}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={() => {
              setEditing(false);
              onSave?.();
            }}
            type="button"
          >
            Save
          </button>
        </div>
      ) : null}
    </section>
  );
}
