import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createGroupRequest } from "@/services/groupRequests.service";
import { Input } from "@/components/ui/input";

type FormState = {
  title: string;
  subject: string;
  description: string;
  level: string;
  basePrice: string;
  minPrice: string;
  maxParticipants: string;
  preferredDatetime: string;
};

const initialForm: FormState = {
  title: "",
  subject: "",
  description: "",
  level: "",
  basePrice: "",
  minPrice: "",
  maxParticipants: "4",
  preferredDatetime: "",
};

function calc(base: number, min: number, count: number) {
  if (!base || !min || !count) return "Not set";
  return `${Math.max(min, Math.ceil(base / count)).toFixed(2)} EGP`;
}

function parseApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Cannot connect to server. Make sure the backend is running.";
    const detail = (error.response.data as { detail?: unknown })?.detail;
    if (typeof detail === "string") return detail;
  }
  return "Could not create group request.";
}

export function CreateGroupRequestPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const preview = useMemo(() => {
    const base = Number.parseFloat(form.basePrice);
    const min = Number.parseFloat(form.minPrice);
    const max = Number.parseInt(form.maxParticipants, 10);
    return {
      one: calc(base, min, 1),
      two: calc(base, min, 2),
      max: calc(base, min, max),
    };
  }, [form.basePrice, form.maxParticipants, form.minPrice]);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const group = await createGroupRequest({
        title: form.title.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        level: form.level || undefined,
        base_price: Number.parseFloat(form.basePrice),
        min_price_per_student: Number.parseFloat(form.minPrice),
        max_participants: Number.parseInt(form.maxParticipants, 10),
        preferred_datetime: form.preferredDatetime || undefined,
      });
      navigate(`/student/group-requests/${group.id}`);
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Create Group Request</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">Set the total budget and minimum price per student. The price updates as students join.</p>
      </header>
      <form className="grid gap-lg px-margin-mobile py-lg md:px-margin-desktop xl:grid-cols-[minmax(0,1fr)_340px]" onSubmit={submit}>
        <section className="space-y-md rounded-lg border border-outline-variant bg-surface-container p-lg">
          {error ? <p className="rounded-md border border-error/25 bg-error/10 px-md py-sm text-body-sm text-error">{error}</p> : null}
          <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(e) => update("title", e.target.value)} placeholder="Title" required value={form.title} />
          <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(e) => update("subject", e.target.value)} placeholder="Subject" required value={form.subject} />
          <textarea className="min-h-36 rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface outline-none" onChange={(e) => update("description", e.target.value)} placeholder="Describe what the group wants to learn..." required value={form.description} />
          <div className="grid gap-md md:grid-cols-2">
            <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(e) => update("level", e.target.value)} placeholder="Level" value={form.level} />
            <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" onChange={(e) => update("preferredDatetime", e.target.value)} type="datetime-local" value={form.preferredDatetime} />
            <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" min="1" onChange={(e) => update("basePrice", e.target.value)} placeholder="Base price / total budget" required type="number" value={form.basePrice} />
            <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" min="1" onChange={(e) => update("minPrice", e.target.value)} placeholder="Minimum price per student" required type="number" value={form.minPrice} />
            <Input className="h-11 border-outline-variant bg-surface-container-low text-on-surface" min="2" onChange={(e) => update("maxParticipants", e.target.value)} placeholder="Max participants" required type="number" value={form.maxParticipants} />
          </div>
        </section>
        <aside className="rounded-lg border border-outline-variant bg-surface-container p-lg xl:sticky xl:top-24">
          <h2 className="text-headline-md text-on-surface">Live Price Preview</h2>
          <div className="mt-md space-y-sm text-body-sm">
            <p className="flex justify-between text-on-surface-variant"><span>1 participant</span><b className="text-on-surface">{preview.one}</b></p>
            <p className="flex justify-between text-on-surface-variant"><span>2 participants</span><b className="text-on-surface">{preview.two}</b></p>
            <p className="flex justify-between text-on-surface-variant"><span>Max participants</span><b className="text-on-surface">{preview.max}</b></p>
          </div>
          <button className="mt-lg h-10 w-full rounded-md bg-primary text-body-sm font-medium text-on-primary hover:bg-primary/90 disabled:opacity-50" disabled={submitting} type="submit">
            {submitting ? "Creating..." : "Create Group Request"}
          </button>
        </aside>
      </form>
    </>
  );
}
