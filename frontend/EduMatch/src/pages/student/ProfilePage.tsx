import { useState } from "react";
import { LockKeyhole, Pencil, ShieldCheck } from "lucide-react";
import { PersonalInfoCard } from "@/components/cards/PersonalInfoCard";
import { ProfileHeaderCard } from "@/components/cards/ProfileHeaderCard";
import { QuickActionsCard } from "@/components/cards/QuickActionsCard";
import { useAuth } from "@/hooks/useAuth";

function BioCard({ bio, onEdit }: { bio: string | null | undefined; onEdit: () => void }) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-headline-md text-on-surface">About Me</h2>
        <button
          className="inline-flex h-9 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
          onClick={onEdit}
          type="button"
        >
          <Pencil className="size-4" />
          Edit
        </button>
      </div>
      <p className="mt-md text-body-sm text-on-surface-variant">
        {bio?.trim() ? bio : "Not added yet"}
      </p>
    </section>
  );
}

function SecurityCard({ onMessage }: { onMessage: (message: string) => void }) {
  return (
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
          onClick={() => onMessage("Password change is not implemented yet.")}
          type="button"
        >
          <LockKeyhole className="size-4 text-secondary" />
          Change Password
        </button>
        <button
          className="flex h-10 w-full items-center gap-sm rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
          onClick={() => onMessage("Login session management is not implemented yet.")}
          type="button"
        >
          <ShieldCheck className="size-4 text-secondary" />
          Manage Login Sessions
        </button>
      </div>
    </section>
  );
}

export function ProfilePage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div>
          <h1 className="text-headline-lg text-on-surface">My Profile</h1>
          <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
            Manage your personal information and learning preferences.
          </p>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {message ? (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {message}
          </p>
        ) : null}

        <ProfileHeaderCard
          user={user}
          onChangePhoto={() => setMessage("Profile photo upload is not implemented yet.")}
          onEditProfile={() => setMessage("Edit profile mode enabled.")}
        />

        <div className="grid gap-lg 2xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <main className="min-w-0 space-y-lg">
            <PersonalInfoCard
              user={user}
              onCancel={() => setMessage("Unsaved profile changes were reset.")}
              onEdit={() => setMessage("Edit profile mode enabled.")}
              onSave={() => setMessage("Profile updated successfully.")}
            />
            <BioCard bio={user?.student_profile?.bio} onEdit={() => setMessage("Edit profile mode enabled.")} />
          </main>

          <aside className="space-y-lg">
            <QuickActionsCard />
            <SecurityCard onMessage={setMessage} />
          </aside>
        </div>
      </div>
    </>
  );
}
