import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  CircleDollarSign,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FundingStatus = "funded" | "unpaid";

type ProjectRequest = {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectColor: string;
  fundingStatus: FundingStatus;
  level: string;
  duration: string;
  teamSize?: string;
};

const subjectOptions = ["All", "Computer Science", "Mechanical Engineering", "Business Administration", "Electrical Engineering"];
const statusOptions = ["All", "Funded", "Unpaid"];
const budgetOptions = ["All", "Under $500", "$500 - $1000", "Over $1000"];

const subjectColorMap: Record<string, string> = {
  "Computer Science": "bg-primary/20 text-primary border-primary/30",
  "Mechanical Engineering": "bg-secondary/20 text-secondary border-secondary/30",
  "Business Administration": "bg-tertiary/20 text-tertiary border-tertiary/30",
  "Electrical Engineering": "bg-blue-400/20 text-blue-300 border-blue-400/30",
};

const mockProjects: ProjectRequest[] = [
  {
    id: "1",
    title: "Machine Learning for Healthcare Diagnostics",
    description:
      "Looking for an instructor to guide a team of 3 seniors developing an AI model for early detection of retinal diseases using open-source datasets.",
    subject: "Computer Science",
    subjectColor: subjectColorMap["Computer Science"],
    fundingStatus: "funded",
    level: "Senior Level",
    duration: "Fall Semester",
  },
  {
    id: "2",
    title: "Autonomous Drone Swarm Navigation",
    description:
      "We are a cross-disciplinary team seeking an advisor with expertise in control systems and aerodynamics. The project involves designing algorithms for collision avoidance and coordinated movement in a swarm of 5 micro-drones in indoor environments.",
    subject: "Mechanical Engineering",
    subjectColor: subjectColorMap["Mechanical Engineering"],
    fundingStatus: "unpaid",
    level: "Graduate Level",
    duration: "Full Year",
    teamSize: "Team of 4",
  },
  {
    id: "3",
    title: "Market Entry Strategy for FinTech Startup",
    description:
      "Need academic supervision for analyzing regulatory frameworks and customer acquisition costs for a new peer-to-peer lending platform in emerging markets.",
    subject: "Business Administration",
    subjectColor: subjectColorMap["Business Administration"],
    fundingStatus: "funded",
    level: "MBA Capstone",
    duration: "Spring Semester",
  },
  {
    id: "4",
    title: "Smart Grid Energy Distribution Optimization",
    description:
      "Seeking an advisor with experience in power systems and IoT integration. The project focuses on developing an intelligent energy distribution algorithm for a campus microgrid.",
    subject: "Electrical Engineering",
    subjectColor: subjectColorMap["Electrical Engineering"],
    fundingStatus: "funded",
    level: "Senior Level",
    duration: "Fall Semester",
    teamSize: "Team of 3",
  },
];

const fundingBadgeClasses: Record<FundingStatus, string> = {
  funded: "bg-emerald-400/15 text-emerald-300",
  unpaid: "bg-on-surface-variant/15 text-on-surface-variant",
};

const fundingIcons: Record<FundingStatus, typeof CircleDollarSign> = {
  funded: CircleDollarSign,
  unpaid: Users,
};

function FundingBadge({ status }: { status: FundingStatus }) {
  const Icon = fundingIcons[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs rounded-full px-sm py-xs text-label-md capitalize",
        fundingBadgeClasses[status],
      )}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      className="h-10 rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface transition hover:bg-surface-container-high focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "All" ? label : option}
        </option>
      ))}
    </select>
  );
}

function ProjectCard({
  project,
  onApply,
}: {
  project: ProjectRequest;
  onApply: (project: ProjectRequest) => void;
}) {
  const metadata = [
    { icon: GraduationCap, label: project.level },
    { icon: CalendarClock, label: project.duration },
    ...(project.teamSize ? [{ icon: Users, label: project.teamSize }] : []),
  ];

  return (
    <article className="flex flex-col rounded-lg border border-outline-variant bg-surface-container p-lg transition hover:border-primary/50 hover:bg-surface-container-high">
      <div className="mb-md flex flex-wrap items-center gap-sm">
        <span
          className={cn(
            "rounded-md border px-sm py-xs text-label-md",
            project.subjectColor,
          )}
        >
          {project.subject}
        </span>
        <FundingBadge status={project.fundingStatus} />
      </div>

      <h2 className="mb-sm text-headline-md text-on-surface">{project.title}</h2>
      <p className="line-clamp-3 flex-1 text-body-sm text-on-surface-variant">
        {project.description}
      </p>

      <div className="mt-lg flex flex-wrap items-center gap-md border-t border-outline-variant pt-md">
        {metadata.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="flex items-center gap-xs text-body-sm text-on-surface-variant"
              key={item.label}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-md flex flex-wrap items-center gap-sm">
        <button
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-lg text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
          onClick={() => onApply(project)}
          type="button"
        >
          Apply
        </button>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
          to={`/instructor/projects/${project.id}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export function InstructorProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [applyingProject, setApplyingProject] = useState<ProjectRequest | null>(null);
  const [notice, setNotice] = useState("");

  const visibleProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return mockProjects.filter((project) => {
      const matchesSearch =
        !query ||
        [project.title, project.description, project.subject]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesSubject =
        subjectFilter === "All" || project.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" ||
        project.fundingStatus === statusFilter.toLowerCase();

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, subjectFilter, statusFilter, budgetFilter]);

  function handleApply(project: ProjectRequest) {
    setApplyingProject(project);
  }

  function handleSubmitApplication() {
    setApplyingProject(null);
    setNotice("Application submitted successfully. The student will review your proposal.");
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div>
          <h1 className="text-headline-lg text-on-surface">Browse Projects</h1>
          <p className="mt-xs text-body-sm text-on-surface-variant">
            Find and apply for student project requests.
          </p>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {notice && (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {notice}
          </p>
        )}

        <div className="flex flex-col gap-sm lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              className="h-10 border-outline-variant bg-surface-container pl-10 text-on-surface"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search requests by subject or keyword..."
              value={searchTerm}
            />
          </div>
          <div className="flex flex-wrap gap-sm">
            <FilterSelect label="Subject" onChange={setSubjectFilter} options={subjectOptions} value={subjectFilter} />
            <FilterSelect label="Status" onChange={setStatusFilter} options={statusOptions} value={statusFilter} />
            <FilterSelect label="Budget" onChange={setBudgetFilter} options={budgetOptions} value={budgetFilter} />
          </div>
        </div>

        <section className="grid gap-lg md:grid-cols-2">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                onApply={handleApply}
                project={project}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-outline bg-surface-container-low p-xl text-center">
              <h3 className="text-headline-md text-on-surface">No projects found</h3>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>
      </div>

      {applyingProject && (
        <ApplyToProjectModal
          onClose={() => setApplyingProject(null)}
          onSubmit={handleSubmitApplication}
          project={applyingProject}
        />
      )}
    </>
  );
}

function ApplyToProjectModal({
  project,
  onClose,
  onSubmit,
}: {
  project: ProjectRequest;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-md backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Apply to Project"
    >
      <div className="w-full max-w-2xl rounded-lg border border-outline-variant bg-surface-container shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant px-lg py-md">
          <h2 className="text-headline-md text-on-surface">Apply to Project</h2>
          <button
            aria-label="Close"
            className="flex size-8 items-center justify-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-lg py-md">
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
            <span
              className={cn(
                "mb-sm inline-block rounded-md border px-sm py-xs text-label-md uppercase",
                project.subjectColor,
              )}
            >
              {project.subject}
            </span>
            <h3 className="text-body-md font-medium text-on-surface">
              {project.title}
            </h3>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Posted by Student • 2 days ago
            </p>
            <p className="mt-md text-body-sm text-on-surface-variant">
              {project.description}
            </p>
            <div className="mt-md flex flex-wrap gap-md border-t border-outline-variant pt-md text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-xs">
                <CalendarClock className="size-4" />
                Duration: {project.duration}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-xs">
                  <Users className="size-4" />
                  {project.teamSize}
                </span>
              )}
              <span className="flex items-center gap-xs">
                <CircleDollarSign className="size-4" />
                Student Budget: $500 – $800
              </span>
            </div>
          </div>

          <div className="mt-lg">
            <h4 className="text-body-md font-medium text-on-surface">
              Message to Student
            </h4>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Introduce yourself, explain your relevant expertise, and outline how
              you plan to guide the project.
            </p>
            <textarea
              className="mt-sm h-32 w-full resize-none rounded-md border border-outline-variant bg-surface-container-low px-md py-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hello, I'm Dr. Smith. I have extensive experience in reinforcement learning applied to urban systems..."
              value={message}
            />
          </div>

          <div className="mt-lg">
            <h4 className="text-body-md font-medium text-on-surface">
              Proposed Price (USD)
            </h4>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Enter your expected compensation for advising this project. Keep the
              student's stated budget in mind.
            </p>
            <div className="relative mt-sm">
              <span className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-body-sm text-on-surface-variant">
                $
              </span>
              <input
                className="h-10 w-full max-w-xs rounded-md border border-outline-variant bg-surface-container-low pl-8 pr-md text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                type="number"
                value={price}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-sm border-t border-outline-variant px-lg py-md">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-outline-variant px-lg text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-lg text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={onSubmit}
            type="button"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
