import { Camera, Pencil } from "lucide-react";

type ProfileHeaderCardProps = {
  onChangePhoto: () => void;
  onEditProfile: () => void;
};

export function ProfileHeaderCard({ onChangePhoto, onEditProfile }: ProfileHeaderCardProps) {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-lg">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-headline-md text-on-primary ring-4 ring-primary/20">
            ZA
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-sm">
              <h2 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">
                Ziad Ahmed
              </h2>
              <span className="rounded-full bg-primary/15 px-sm py-xs text-label-md uppercase text-primary ring-1 ring-primary/25">
                Student
              </span>
              <span className="rounded-full bg-emerald-400/15 px-sm py-xs text-label-md uppercase text-emerald-300 ring-1 ring-emerald-400/25">
                Active
              </span>
            </div>
            <p className="mt-xs text-body-sm text-on-surface-variant">ziad@example.com</p>
            <p className="mt-xs text-body-sm text-on-surface-variant">Joined Oct 2026</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-sm">
          <button
            className="inline-flex h-10 items-center justify-center gap-xs rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={onEditProfile}
            type="button"
          >
            <Pencil className="size-4" />
            Edit Profile
          </button>
          <button
            className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
            onClick={onChangePhoto}
            type="button"
          >
            <Camera className="size-4" />
            Change Photo
          </button>
        </div>
      </div>
    </section>
  );
}
