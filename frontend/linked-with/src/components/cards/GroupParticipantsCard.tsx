import type { SessionDetailsData } from "@/types/sessionDetails";

type GroupParticipantsCardProps = {
  session: SessionDetailsData;
};

const participants = ["Ziad Ahmed", "Ahmed Ali", "Mona Hassan", "Omar Khaled"];

export function GroupParticipantsCard({ session }: GroupParticipantsCardProps) {
  if (session.sessionMode !== "Group") {
    return null;
  }

  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
      <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-label-md uppercase text-secondary">Group Participants</p>
          <h2 className="mt-xs text-headline-md text-on-surface">Students Joined</h2>
        </div>
        <span className="w-fit rounded-full bg-secondary/15 px-sm py-xs text-label-md uppercase text-secondary ring-1 ring-secondary/25">
          4 / 5
        </span>
      </div>

      <div className="mt-lg grid gap-sm sm:grid-cols-2">
        {participants.map((participant) => (
          <div className="rounded-md border border-outline-variant bg-surface-container-low p-md text-body-sm text-on-surface" key={participant}>
            {participant}
          </div>
        ))}
      </div>

      <div className="mt-lg grid gap-sm sm:grid-cols-3">
        <div className="rounded-md border border-outline-variant bg-surface-container-low p-md">
          <p className="text-label-md uppercase text-secondary">Students Joined</p>
          <p className="mt-xs text-body-sm font-medium text-on-surface">4 / 5</p>
        </div>
        <div className="rounded-md border border-outline-variant bg-surface-container-low p-md">
          <p className="text-label-md uppercase text-secondary">Price Per Student</p>
          <p className="mt-xs text-body-sm font-medium text-on-surface">70 EGP</p>
        </div>
        <div className="rounded-md border border-outline-variant bg-surface-container-low p-md">
          <p className="text-label-md uppercase text-secondary">Instructor Total</p>
          <p className="mt-xs text-body-sm font-medium text-on-surface">280 EGP</p>
        </div>
      </div>
    </section>
  );
}
