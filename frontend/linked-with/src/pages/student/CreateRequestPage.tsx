import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeDollarSign,
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Info,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RequestType = "scheduled" | "instant";
type SessionMode = "individual" | "group";

type FormState = {
  subject: string;
  description: string;
  learningLevel: string;
  language: string;
  requestType: RequestType;
  sessionMode: SessionMode;
  budget: string;
  maximumStudents: string;
  inviteEmail: string;
  discountPerStudent: string;
  minimumPrice: string;
};

const initialForm: FormState = {
  subject: "",
  description: "",
  learningLevel: "",
  language: "English",
  requestType: "scheduled",
  sessionMode: "individual",
  budget: "",
  maximumStudents: "",
  inviteEmail: "",
  discountPerStudent: "",
  minimumPrice: "",
};

function FieldLabel({ children }: { children: string }) {
  return <label className="text-body-sm font-medium text-on-surface">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-body-sm text-destructive">{message}</p>;
}

function SelectableOptionCard({
  checked,
  description,
  icon: Icon,
  label,
  name,
  onSelect,
}: {
  checked: boolean;
  description: string;
  icon: typeof CalendarClock;
  label: string;
  name: string;
  onSelect: () => void;
}) {
  return (
    <button
      className={cn(
        "flex min-h-28 w-full items-start gap-md rounded-lg border p-md text-left transition",
        checked
          ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(192,193,255,0.12)]"
          : "border-outline-variant bg-surface-container-low hover:border-primary/50 hover:bg-surface-container-high",
      )}
      onClick={onSelect}
      type="button"
    >
      <span
        className={cn(
          "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border",
          checked ? "border-primary bg-primary" : "border-outline",
        )}
      >
        <span className={cn("size-2 rounded-full", checked ? "bg-on-primary" : "bg-transparent")} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-xs flex items-center gap-sm text-body-md font-medium text-on-surface">
          <Icon className="size-4 text-secondary" />
          {label}
        </span>
        <span className="block text-body-sm text-on-surface-variant">{description}</span>
      </span>
      <span className="sr-only">{name}</span>
    </button>
  );
}

function GroupSessionSettings({
  errors,
  form,
  invitedStudents,
  onAddInvite,
  onChange,
  onRemoveInvite,
}: {
  errors: Partial<Record<keyof FormState, string>>;
  form: FormState;
  invitedStudents: string[];
  onAddInvite: () => void;
  onChange: (field: keyof FormState, value: string) => void;
  onRemoveInvite: (email: string) => void;
}) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <h2 className="text-headline-md text-on-surface">Group Session Settings</h2>

      <div className="mt-lg grid gap-md md:grid-cols-2">
        <div className="space-y-sm">
          <FieldLabel>Maximum Students</FieldLabel>
          <Input
            className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
            onChange={(event) => onChange("maximumStudents", event.target.value)}
            placeholder="e.g. 4"
            value={form.maximumStudents}
          />
        </div>
        <div className="space-y-sm">
          <FieldLabel>Invite Students by Email</FieldLabel>
          <div className="flex gap-sm">
            <Input
              className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
              onChange={(event) => onChange("inviteEmail", event.target.value)}
              placeholder="student@example.com"
              value={form.inviteEmail}
            />
            <Button
              className="h-11 bg-secondary px-md text-on-secondary hover:bg-secondary/90"
              onClick={onAddInvite}
              type="button"
            >
              Add Invite
            </Button>
          </div>
          <FieldError message={errors.inviteEmail} />
        </div>
        <div className="space-y-sm">
          <FieldLabel>Discount Per Extra Student</FieldLabel>
          <Input
            className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
            onChange={(event) => onChange("discountPerStudent", event.target.value)}
            placeholder="10%"
            value={form.discountPerStudent}
          />
        </div>
        <div className="space-y-sm">
          <FieldLabel>Minimum Price</FieldLabel>
          <Input
            className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
            onChange={(event) => onChange("minimumPrice", event.target.value)}
            placeholder="70 EGP"
            value={form.minimumPrice}
          />
        </div>
      </div>

      <div className="mt-lg grid gap-md lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-md border border-outline-variant bg-surface-container-low p-md">
          <p className="text-body-sm font-medium text-on-surface">Joined Students Preview</p>
          <div className="mt-md space-y-sm">
            {[...["Ahmed Ali", "Mona Hassan"], ...invitedStudents].map((name) => (
              <div className="flex items-center justify-between gap-sm text-body-sm text-on-surface-variant" key={name}>
                <span className="flex min-w-0 items-center gap-sm">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-label-md text-primary">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="truncate">{name}</span>
                </span>
                {invitedStudents.includes(name) ? (
                  <button
                    className="text-label-md uppercase text-error transition hover:text-error/80"
                    onClick={() => onRemoveInvite(name)}
                    type="button"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-primary/25 bg-primary/10 p-md">
          <p className="text-body-sm font-medium text-on-surface">Price Preview</p>
          <div className="mt-md space-y-sm text-body-sm">
            <SummaryRow label="Base Price" value={form.budget || "100 EGP"} />
            <SummaryRow label="Students Joined" value="3" />
            <SummaryRow label="Discount" value="20%" />
            <SummaryRow label="Final Price Per Student" value="80 EGP" />
            <SummaryRow label="Instructor Total" value="240 EGP" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-md">
      <span className="text-on-surface-variant">{label}</span>
      <span className="text-right font-medium text-on-surface">{value}</span>
    </div>
  );
}

function FinancialsCard({
  budget,
  onBudgetChange,
  onDraft,
  requestType,
  sessionMode,
}: {
  budget: string;
  onBudgetChange: (value: string) => void;
  onDraft: () => void;
  requestType: RequestType;
  sessionMode: SessionMode;
}) {
  return (
    <aside className="rounded-lg border border-outline-variant bg-surface-container p-lg xl:sticky xl:top-24">
      <div className="mb-lg flex items-center gap-sm">
        <div className="flex size-9 items-center justify-center rounded-md bg-secondary/15 text-secondary">
          <BadgeDollarSign className="size-5" />
        </div>
        <h2 className="text-headline-md text-on-surface">Financials</h2>
      </div>

      <div className="space-y-sm">
        <FieldLabel>Base Offer / Budget</FieldLabel>
        <Input
          className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
          onChange={(event) => onBudgetChange(event.target.value)}
          placeholder="100 EGP"
          value={budget}
        />
        <p className="text-body-sm text-on-surface-variant">Suggested range: 100 - 250 EGP / session</p>
      </div>

      <div className="my-lg space-y-sm rounded-md border border-outline-variant bg-surface-container-low p-md text-body-sm">
        <SummaryRow label="Request Type" value={requestType === "instant" ? "Instant Match" : "Scheduled"} />
        <SummaryRow label="Session Mode" value={sessionMode === "group" ? "Group Session" : "Individual"} />
        <SummaryRow label="Estimated Price" value={budget || "Not set"} />
        <SummaryRow label="Payment Status" value="Not required until instructor accepts" />
      </div>

      <div className="space-y-sm">
        <Button className="h-11 w-full bg-primary text-on-primary hover:bg-primary/90" type="submit">
          {requestType === "instant" ? "Find Instructor Now" : "Post Request"}
        </Button>
        <Button
          className="h-11 w-full border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high"
          onClick={onDraft}
          type="button"
          variant="outline"
        >
          Save Draft
        </Button>
      </div>

      <p className="mt-md text-center text-body-sm text-on-surface-variant">
        Payment will only be requested after an instructor accepts your request.
      </p>
    </aside>
  );
}

export function CreateRequestPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [invitedStudents, setInvitedStudents] = useState<string[]>([]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage("");
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";
    if (!form.learningLevel) nextErrors.learningLevel = "Learning level is required.";
    if (!form.budget.trim()) nextErrors.budget = "Budget is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSuccessMessage(
      form.requestType === "instant"
        ? "Instant request sent to available instructors."
        : "Request created successfully.",
    );
    window.setTimeout(() => {
      navigate(form.requestType === "instant" ? "/student/requests/1" : "/student/requests");
    }, 700);
  }

  function handleDraft() {
    localStorage.setItem("studentRequestDraft", JSON.stringify({ ...form, invitedStudents }));
    setSuccessMessage("Draft saved successfully.");
  }

  function handleAddInvite() {
    const email = form.inviteEmail.trim();

    if (!email) {
      setErrors((current) => ({ ...current, inviteEmail: "Invite email is required." }));
      return;
    }

    setInvitedStudents((current) => (current.includes(email) ? current : [...current, email]));
    updateField("inviteEmail", "");
    setSuccessMessage("Invite added locally.");
  }

  function handleRemoveInvite(email: string) {
    setInvitedStudents((current) => current.filter((student) => student !== email));
    setSuccessMessage("Invite removed.");
  }

  return (
    <>
          <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
            <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-sm flex items-center gap-sm text-label-md uppercase text-on-surface-variant">
                  <span>Requests</span>
                  <ChevronRight className="size-4" />
                  <span className="text-secondary">New</span>
                </div>
                <h1 className="text-headline-lg text-on-surface">Create Learning Request</h1>
                <p className="mt-xs max-w-3xl text-body-sm text-on-surface-variant">
                  Define your learning needs clearly to match with the best instructors in our network.
                  Precise details lead to better educational outcomes.
                </p>
              </div>

              <button
                aria-label="Notifications"
                className="flex size-10 items-center justify-center rounded-md border border-outline-variant bg-surface-container text-on-surface transition hover:bg-surface-container-high"
                onClick={() => setSuccessMessage("Notifications are a placeholder for the academic version.")}
                type="button"
              >
                <Bell className="size-4" />
              </button>
            </div>
          </header>

          <form
            className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-lg">
              {successMessage ? (
                <div className="flex items-start gap-sm rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-md text-body-sm text-emerald-200">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  {successMessage}
                </div>
              ) : null}

              <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                <h2 className="text-headline-md text-on-surface">Core Details</h2>

                <div className="mt-lg space-y-md">
                  <div className="space-y-sm">
                    <FieldLabel>Subject</FieldLabel>
                    <Input
                      aria-invalid={Boolean(errors.subject)}
                      className="h-11 border-outline-variant bg-surface-container-low text-on-surface"
                      onChange={(event) => updateField("subject", event.target.value)}
                      placeholder="e.g. Advanced Calculus, React, Machine Learning 101"
                      value={form.subject}
                    />
                    <p className="text-body-sm text-on-surface-variant">
                      Be specific to attract specialized instructors.
                    </p>
                    <FieldError message={errors.subject} />
                  </div>

                  <div className="space-y-sm">
                    <FieldLabel>Description</FieldLabel>
                    <textarea
                      aria-invalid={Boolean(errors.description)}
                      className="min-h-36 w-full resize-y rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface outline-none transition placeholder:text-on-surface-variant focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      onChange={(event) => updateField("description", event.target.value)}
                      placeholder="Describe what you want to learn, your current understanding, and specific goals..."
                      value={form.description}
                    />
                    <FieldError message={errors.description} />
                  </div>

                  <div className="grid gap-md md:grid-cols-2">
                    <div className="space-y-sm">
                      <FieldLabel>Learning Level</FieldLabel>
                      <select
                        aria-invalid={Boolean(errors.learningLevel)}
                        className="h-11 w-full rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        onChange={(event) => updateField("learningLevel", event.target.value)}
                        value={form.learningLevel}
                      >
                        <option value="">Select level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                      <FieldError message={errors.learningLevel} />
                    </div>

                    <div className="space-y-sm">
                      <FieldLabel>Preferred Language</FieldLabel>
                      <select
                        className="h-11 w-full rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        onChange={(event) => updateField("language", event.target.value)}
                        value={form.language}
                      >
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
                <h2 className="text-headline-md text-on-surface">Session Configuration</h2>

                <div className="mt-lg space-y-lg">
                  <div>
                    <p className="mb-sm text-body-sm font-medium text-on-surface">Request Type</p>
                    <div className="grid gap-md md:grid-cols-2">
                      <SelectableOptionCard
                        checked={form.requestType === "scheduled"}
                        description="Plan ahead for a specific time"
                        icon={CalendarClock}
                        label="Scheduled"
                        name="request-type"
                        onSelect={() => updateField("requestType", "scheduled")}
                      />
                      <SelectableOptionCard
                        checked={form.requestType === "instant"}
                        description="Find an available instructor right now"
                        icon={Zap}
                        label="Instant Match"
                        name="request-type"
                        onSelect={() => updateField("requestType", "instant")}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-sm text-body-sm font-medium text-on-surface">Session Mode</p>
                    <div className="grid gap-md md:grid-cols-2">
                      <SelectableOptionCard
                        checked={form.sessionMode === "individual"}
                        description="Personalized focused session"
                        icon={User}
                        label="Individual (1-on-1)"
                        name="session-mode"
                        onSelect={() => updateField("sessionMode", "individual")}
                      />
                      <SelectableOptionCard
                        checked={form.sessionMode === "group"}
                        description="Learn with peers, split the cost"
                        icon={Users}
                        label="Group Session"
                        name="session-mode"
                        onSelect={() => updateField("sessionMode", "group")}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {form.requestType === "instant" ? (
                <section className="rounded-lg border border-secondary/25 bg-secondary/10 p-lg">
                  <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-sm">
                      <Info className="mt-1 size-5 shrink-0 text-secondary" />
                      <div>
                        <h2 className="text-headline-md text-on-surface">Instant Request</h2>
                        <p className="mt-xs text-body-sm text-on-surface-variant">
                          Your request will be sent immediately to available verified instructors in the
                          selected subject. The first instructor to accept will enter the session flow with you.
                        </p>
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-secondary/15 px-sm py-xs text-label-md uppercase text-secondary ring-1 ring-secondary/25">
                      Expires in 2 minutes
                    </span>
                  </div>
                </section>
              ) : null}

              {form.sessionMode === "group" ? (
                <GroupSessionSettings
                  errors={errors}
                  form={form}
                  invitedStudents={invitedStudents}
                  onAddInvite={handleAddInvite}
                  onChange={updateField}
                  onRemoveInvite={handleRemoveInvite}
                />
              ) : null}
            </div>

            <FinancialsCard
              budget={form.budget}
              onBudgetChange={(value) => updateField("budget", value)}
              onDraft={handleDraft}
              requestType={form.requestType}
              sessionMode={form.sessionMode}
            />
          </form>
    </>
  );
}
