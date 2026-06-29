import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  CircleDollarSign,
  GraduationCap,
  Users,
} from "lucide-react";
import { ApplyToProjectModal } from "@/components/modals/ApplyToProjectModal";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ProjectDetails = {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectColor: string;
  fundingStatus: "funded" | "unpaid";
  level: string;
  duration: string;
  teamSize: string;
  budget: string;
  studentName: string;
  postedDate: string;
  requirements: string[];
};

const subjectColorMap: Record<string, string> = {
  "Computer Science": "bg-primary/20 text-primary border-primary/30",
  "Mechanical Engineering": "bg-secondary/20 text-secondary border-secondary/30",
  "Business Administration": "bg-tertiary/20 text-tertiary border-tertiary/30",
  "Electrical Engineering": "bg-blue-400/20 text-blue-300 border-blue-400/30",
};

const mockProjectDetails: Record<string, ProjectDetails> = {
  "1": {
    id: "1",
    title: "Machine Learning for Healthcare Diagnostics",
    description:
      "Looking for an instructor to guide a team of 3 seniors developing an AI model for early detection of retinal diseases using open-source datasets. The project involves data preprocessing, CNN architectures, and transfer learning techniques. Students have basic Python and ML knowledge.",
    subject: "Computer Science",
    subjectColor: subjectColorMap["Computer Science"],
    fundingStatus: "funded",
    level: "Senior Level",
    duration: "Fall Semester",
    teamSize: "3 Students",
    budget: "$500 – $800",
    studentName: "Sarah Jenkins",
    postedDate: "2 days ago",
    requirements: [
      "Experience with deep learning frameworks (PyTorch/TensorFlow)",
      "Background in medical image analysis preferred",
      "Available for weekly 1-hour meetings",
      "Ability to review code and provide feedback",
    ],
  },
  "2": {
    id: "2",
    title: "Autonomous Drone Swarm Navigation",
    description:
      "We are a cross-disciplinary team seeking an advisor with expertise in control systems and aerodynamics. The project involves designing algorithms for collision avoidance and coordinated movement in a swarm of 5 micro-drones in indoor environments.",
    subject: "Mechanical Engineering",
    subjectColor: subjectColorMap["Mechanical Engineering"],
    fundingStatus: "unpaid",
    level: "Graduate Level",
    duration: "Full Year",
    teamSize: "4 Students",
    budget: "Unpaid / Volunteer",
    studentName: "Michael Rodriguez",
    postedDate: "5 days ago",
    requirements: [
      "Expertise in control theory and robotics",
      "Experience with ROS or similar frameworks",
      "Published work in swarm intelligence preferred",
    ],
  },
  "3": {
    id: "3",
    title: "Market Entry Strategy for FinTech Startup",
    description:
      "Need academic supervision for analyzing regulatory frameworks and customer acquisition costs for a new peer-to-peer lending platform in emerging markets.",
    subject: "Business Administration",
    subjectColor: subjectColorMap["Business Administration"],
    fundingStatus: "funded",
    level: "MBA Capstone",
    duration: "Spring Semester",
    teamSize: "2 Students",
    budget: "$400 – $600",
    studentName: "Emily Wong",
    postedDate: "1 week ago",
    requirements: [
      "Background in financial regulation",
      "Experience with market analysis methodologies",
      "MBA or PhD in related field",
    ],
  },
  "4": {
    id: "4",
    title: "Smart Grid Energy Distribution Optimization",
    description:
      "Seeking an advisor with experience in power systems and IoT integration. The project focuses on developing an intelligent energy distribution algorithm for a campus microgrid.",
    subject: "Electrical Engineering",
    subjectColor: subjectColorMap["Electrical Engineering"],
    fundingStatus: "funded",
    level: "Senior Level",
    duration: "Fall Semester",
    teamSize: "3 Students",
    budget: "$500 – $700",
    studentName: "Ahmed Mostafa",
    postedDate: "3 days ago",
    requirements: [
      "Knowledge of power system optimization",
      "Experience with IoT sensor networks",
      "Familiarity with MATLAB or Simulink",
    ],
  },
};

export function InstructorProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [notice, setNotice] = useState("");

  const project = mockProjectDetails[id ?? "1"] ?? mockProjectDetails["1"];

  const metadata = [
    { icon: GraduationCap, label: project.level },
    { icon: CalendarClock, label: project.duration },
    { icon: Users, label: project.teamSize },
    { icon: CircleDollarSign, label: `Budget: ${project.budget}` },
  ];

  function handleSubmitApplication() {
    setShowApplyModal(false);
    setNotice("Application submitted successfully. The student will review your proposal.");
  }

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <Link
          className="mb-md inline-flex items-center gap-xs text-body-sm text-on-surface-variant transition hover:text-on-surface"
          to={ROUTES.INSTRUCTOR.PROJECTS}
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
        <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-sm flex flex-wrap items-center gap-sm">
              <span
                className={cn(
                  "rounded-md border px-sm py-xs text-label-md uppercase",
                  project.subjectColor,
                )}
              >
                {project.subject}
              </span>
              <span
                className={cn(
                  "rounded-full px-sm py-xs text-label-md capitalize",
                  project.fundingStatus === "funded"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-on-surface-variant/15 text-on-surface-variant",
                )}
              >
                {project.fundingStatus}
              </span>
            </div>
            <h1 className="text-headline-lg text-on-surface">{project.title}</h1>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Posted by {project.studentName} • {project.postedDate}
            </p>
          </div>
          <button
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary px-lg text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
            onClick={() => setShowApplyModal(true)}
            type="button"
          >
            Apply to Project
          </button>
        </div>
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
              <h2 className="text-headline-md text-on-surface">Project Description</h2>
              <p className="mt-md text-body-sm leading-relaxed text-on-surface-variant">
                {project.description}
              </p>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Requirements</h2>
              <ul className="mt-md space-y-sm">
                {project.requirements.map((req) => (
                  <li
                    className="flex items-start gap-sm text-body-sm text-on-surface-variant"
                    key={req}
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-lg">
            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Project Details</h2>
              <div className="mt-md space-y-md">
                {metadata.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="flex items-center gap-sm text-body-sm"
                      key={item.label}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-container-high text-on-surface-variant">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-on-surface">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-lg border border-outline-variant bg-surface-container p-lg">
              <h2 className="text-headline-md text-on-surface">Student Info</h2>
              <div className="mt-md flex items-center gap-sm">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-body-sm font-medium text-primary">
                  {project.studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-body-md font-medium text-on-surface">
                    {project.studentName}
                  </p>
                  <p className="text-body-sm text-on-surface-variant">Student</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {showApplyModal && (
        <ApplyToProjectModal
          onClose={() => setShowApplyModal(false)}
          onSubmit={handleSubmitApplication}
          project={project}
        />
      )}
    </>
  );
}
