import { useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  CircleDollarSign,
  GraduationCap,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const profileData = {
  name: "Dr. Ahmed Smith",
  email: "ahmed.smith@university.edu",
  title: "Associate Professor",
  department: "Computer Science & AI",
  university: "Cairo University",
  rating: 4.9,
  reviewCount: 24,
  completedSessions: 48,
  joinDate: "March 2023",
  verified: true,
  instantAvailable: true,
  pricePerSession: "120 EGP",
  specializations: [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Reinforcement Learning",
  ],
  skills: [
    "Python",
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "MATLAB",
    "LaTeX",
  ],
  bio: "Associate Professor with 10+ years of experience in AI and machine learning. Passionate about mentoring the next generation of researchers and engineers. Focused on practical, hands-on guidance for graduation projects.",
};

export function InstructorProfilePage() {
  const [notice, setNotice] = useState("");

  function handleEditPlaceholder() {
    setNotice("Profile editing is a placeholder in this academic version.");
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
        {notice && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        )}

        <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-md">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-headline-md font-medium text-primary">
                    {profileData.name
                      .split(" ")
                      .filter((_, i) => i === 0 || i === profileData.name.split(" ").length - 1)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-sm">
                      <h2 className="text-headline-md text-on-surface">
                        {profileData.name}
                      </h2>
                      {profileData.verified && (
                        <BadgeCheck className="size-5 text-primary" />
                      )}
                    </div>
                    <p className="text-body-sm text-on-surface-variant">
                      {profileData.title} • {profileData.department}
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      {profileData.university}
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
                  onClick={handleEditPlaceholder}
                  type="button"
                >
                  <Pencil className="size-4" />
                  Edit Profile
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-center justify-between gap-md">
                <h2 className="text-headline-md text-on-surface">About</h2>
                <button
                  className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
                  onClick={handleEditPlaceholder}
                  type="button"
                >
                  <Pencil className="size-4" />
                  Edit
                </button>
              </div>
              <p className="mt-md text-body-sm leading-relaxed text-on-surface-variant">
                {profileData.bio}
              </p>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Specializations</h2>
              <div className="mt-md flex flex-wrap gap-sm">
                {profileData.specializations.map((spec) => (
                  <span
                    className="rounded-full bg-primary/15 px-sm py-xs text-label-md text-primary ring-1 ring-primary/25"
                    key={spec}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Skills</h2>
              <div className="mt-md flex flex-wrap gap-sm">
                {profileData.skills.map((skill) => (
                  <span
                    className="rounded-full bg-secondary/15 px-sm py-xs text-label-md text-secondary ring-1 ring-secondary/25"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <div className="flex items-start gap-md">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="text-headline-md text-on-surface">Security</h2>
                  <p className="mt-xs text-body-sm text-on-surface-variant">
                    Password: Last changed recently
                  </p>
                </div>
              </div>
              <div className="mt-lg space-y-sm">
                <button
                  className="flex h-10 w-full items-center gap-sm rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                  onClick={() =>
                    setNotice("Password change is not implemented yet.")
                  }
                  type="button"
                >
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
                  <span className="text-on-surface">
                    {profileData.rating} rating ({profileData.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-sm text-body-sm">
                  <BookOpen className="size-4 text-secondary" />
                  <span className="text-on-surface">
                    {profileData.completedSessions} sessions completed
                  </span>
                </div>
                <div className="flex items-center gap-sm text-body-sm">
                  <CircleDollarSign className="size-4 text-primary" />
                  <span className="text-on-surface">
                    {profileData.pricePerSession} per session
                  </span>
                </div>
                <div className="flex items-center gap-sm text-body-sm">
                  <GraduationCap className="size-4 text-on-surface-variant" />
                  <span className="text-on-surface">
                    Joined {profileData.joinDate}
                  </span>
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
                <span
                  className={cn(
                    "rounded-full px-sm py-xs text-label-md",
                    profileData.instantAvailable
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-on-surface-variant/15 text-on-surface-variant",
                  )}
                >
                  {profileData.instantAvailable ? "Active" : "Inactive"}
                </span>
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Verification</h2>
              <div className="mt-md flex items-center gap-sm">
                <BadgeCheck className="size-5 text-primary" />
                <span className="text-body-sm text-on-surface">
                  Verified Instructor
                </span>
              </div>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Your credentials have been verified by the platform.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
