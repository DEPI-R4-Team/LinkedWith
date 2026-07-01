import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Clock, Zap } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { Input } from "@/components/ui/input";
import { createInstantRequest } from "@/services/instantRequests.service";

type FormState = {
  title: string;
  subject: string;
  description: string;
  budget: string;
  skillLevel: string;
  urgencyLevel: string;
  expiresInMinutes: string;
};

const initialForm: FormState = {
  title: "",
  subject: "",
  description: "",
  budget: "",
  skillLevel: "",
  urgencyLevel: "urgent",
  expiresInMinutes: "30",
};

function parseApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = (error.response?.data as { detail?: unknown } | undefined)?.detail;
    if (typeof detail === "string") return detail;
  }
  return "Could not create instant request. Please try again.";
}

export function CreateInstantRequestPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.description.trim() || !form.budget.trim()) {
      setError("Title, subject, description, and budget are required.");
      return;
    }

    const budget = Number.parseFloat(form.budget);
    const expiresInMinutes = Number.parseInt(form.expiresInMinutes || "30", 10);
    if (!Number.isFinite(budget) || budget <= 0) {
      setError("Budget must be a positive number.");
      return;
    }
    if (!Number.isFinite(expiresInMinutes) || expiresInMinutes < 10 || expiresInMinutes > 120) {
      setError("Expiration must be between 10 and 120 minutes.");
      return;
    }

    setSubmitting(true);
    try {
      const request = await createInstantRequest({
        title: form.title.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        budget,
        skill_level: form.skillLevel || undefined,
        urgency_level: form.urgencyLevel || undefined,
        expires_in_minutes: expiresInMinutes,
        session_mode: "individual",
        session_type: "online",
      });
      navigate(`/student/instant-requests/${request.id}`);
    } catch (apiError) {
      setError(parseApiError(apiError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div>
          <BackButton className="mb-md" fallback="/student/requests/create" />
          <p className="text-label-md uppercase text-secondary">Instant help</p>
          <h1 className="mt-xs text-headline-lg text-on-surface">Create Instant Request</h1>
          <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
            Available instructors will be able to accept this request until it expires.
          </p>
        </div>
      </header>

      <form className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop xl:grid-cols-[minmax(0,2fr)_320px]" onSubmit={handleSubmit}>
        <main className="space-y-lg">
          {error ? <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p> : null}
          <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
            <h2 className="text-headline-md text-on-surface">Request Details</h2>
            <div className="mt-lg grid gap-md md:grid-cols-2">
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Title</span>
                <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(event) => updateField("title", event.target.value)} placeholder="Need help with derivatives now" value={form.title} />
              </label>
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Subject</span>
                <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(event) => updateField("subject", event.target.value)} placeholder="Calculus" value={form.subject} />
              </label>
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Budget</span>
                <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(event) => updateField("budget", event.target.value)} placeholder="150" value={form.budget} />
              </label>
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Skill Level</span>
                <select className="h-11 w-full rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface outline-none" onChange={(event) => updateField("skillLevel", event.target.value)} value={form.skillLevel}>
                  <option value="">Select level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Urgency</span>
                <select className="h-11 w-full rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface outline-none" onChange={(event) => updateField("urgencyLevel", event.target.value)} value={form.urgencyLevel}>
                  <option value="urgent">Urgent</option>
                  <option value="very_urgent">Very urgent</option>
                  <option value="standard">Standard</option>
                </select>
              </label>
              <label className="space-y-sm">
                <span className="text-body-sm font-medium text-on-surface">Expires In Minutes</span>
                <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(event) => updateField("expiresInMinutes", event.target.value)} placeholder="30" value={form.expiresInMinutes} />
              </label>
            </div>
            <label className="mt-md block space-y-sm">
              <span className="text-body-sm font-medium text-on-surface">Description</span>
              <textarea className="min-h-36 w-full resize-y rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface outline-none" onChange={(event) => updateField("description", event.target.value)} placeholder="Describe what you need help with right now..." value={form.description} />
            </label>
          </section>
        </main>

        <aside className="h-fit rounded-lg border border-outline-variant bg-surface-container p-lg">
          <div className="flex items-center gap-sm">
            <span className="flex size-9 items-center justify-center rounded-md bg-secondary/15 text-secondary">
              <Clock className="size-5" />
            </span>
            <h2 className="text-headline-md text-on-surface">Instant Window</h2>
          </div>
          <p className="mt-md text-body-sm text-on-surface-variant">
            Instructors with instant availability can accept first. Payment still uses the existing simulated escrow flow.
          </p>
          <button className="mt-lg inline-flex h-11 w-full items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary hover:bg-primary/90 disabled:opacity-60" disabled={submitting} type="submit">
            <Zap className="size-4" />
            {submitting ? "Posting..." : "Create Instant Request"}
          </button>
        </aside>
      </form>
    </>
  );
}
