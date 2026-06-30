import { useState } from "react";
import {
  BadgeCheck,
  CircleDollarSign,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function valueOrMissing(value: string | null | undefined) {
  return value?.trim() ? value : "Not added yet";
}

function initials(name: string | undefined) {
  return (name ?? "Instructor")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function splitList(value: string | null | undefined) {
  return value?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
}

export function InstructorProfilePage() {
  const { user } = useAuth();
  const [notice, setNotice] = useState("");
  const profile = user?.instructor_profile;
  const skills = splitList(profile?.skills);

  function handleEditPlaceholder() {
    setNotice("Profile editing is not connected yet.");
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <h1 className="text-headline-lg text-on-surface">Profile</h1>
        <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
          Manage your instructor profile and credentials.
        </p>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {notice ? <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">{notice}</p> : null}

        <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-md">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-headline-md font-medium text-primary">
                    {initials(user?.full_name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-sm">
                      <h2 className="text-headline-md text-on-surface">{valueOrMissing(user?.full_name)}</h2>
                      {profile?.verification_status === "verified" ? <BadgeCheck className="size-5 text-primary" /> : null}
                    </div>
                    <p className="text-body-sm text-on-surface-variant">{valueOrMissing(user?.email)}</p>
                    <p className="text-body-sm capitalize text-on-surface-variant">
                      {profile?.verification_status?.replaceAll("_", " ") ?? "Not added yet"}
                    </p>
                  </div>
                </div>
                <button className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10" onClick={handleEditPlaceholder} type="button">
                  <Pencil className="size-4" />
                  Edit Profile
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-center justify-between gap-md">
                <h2 className="text-headline-md text-on-surface">About</h2>
                <button className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10" onClick={handleEditPlaceholder} type="button">
                  <Pencil className="size-4" />
                  Edit
                </button>
              </div>
              <p className="mt-md text-body-sm leading-relaxed text-on-surface-variant">{valueOrMissing(profile?.bio)}</p>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Specialization</h2>
              <p className="mt-md text-body-sm text-on-surface-variant">{valueOrMissing(profile?.specialization)}</p>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Skills</h2>
              {skills.length > 0 ? (
                <div className="mt-md flex flex-wrap gap-sm">
                  {skills.map((skill) => (
                    <span className="rounded-full bg-secondary/15 px-sm py-xs text-label-md text-secondary ring-1 ring-secondary/25" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-md text-body-sm text-on-surface-variant">Not added yet</p>
              )}
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-start gap-md">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="text-headline-md text-on-surface">Security</h2>
                  <p className="mt-xs text-body-sm text-on-surface-variant">Password management is not connected yet.</p>
                </div>
              </div>
              <div className="mt-lg space-y-sm">
                <button className="flex h-10 w-full items-center gap-sm rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface" onClick={() => setNotice("Password change is not implemented yet.")} type="button">
                  <LockKeyhole className="size-4" />
                  Change Password
                </button>
              </div>
            </section>
          </div>

          <aside className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Quick Stats</h2>
              <div className="mt-md space-y-md">
                <div className="flex items-center gap-sm text-body-sm">
                  <Star className="size-4 fill-tertiary text-tertiary" />
                  <span className="text-on-surface">{profile?.rating ?? "0.0"} rating</span>
                </div>
                <div className="flex items-center gap-sm text-body-sm">
                  <CircleDollarSign className="size-4 text-primary" />
                  <span className="text-on-surface">{valueOrMissing(profile?.price_per_session)} per session</span>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Availability</h2>
              <div className="mt-md flex items-center justify-between">
                <div className="flex items-center gap-sm text-body-sm">
                  <Zap className="size-4 text-tertiary" />
                  <span className="text-on-surface">Instant Availability</span>
                </div>
                <span className={cn("rounded-full px-sm py-xs text-label-md", profile?.is_available_for_instant ? "bg-emerald-400/15 text-emerald-300" : "bg-on-surface-variant/15 text-on-surface-variant")}>
                  {profile?.is_available_for_instant ? "Active" : "Inactive"}
                </span>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Verification</h2>
              <div className="mt-md flex items-center gap-sm">
                <BadgeCheck className="size-5 text-primary" />
                <span className="text-body-sm capitalize text-on-surface">
                  {profile?.verification_status?.replaceAll("_", " ") ?? "Not added yet"}
                </span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
