import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Languages,
  SlidersHorizontal,
  Users,
  Video,
  WalletCards,
  Pencil,
} from "lucide-react";
import {
  InstructorApplicationCard,
  type InstructorApplication,
} from "@/components/cards/InstructorApplicationCard";
import { PaymentRequiredCard } from "@/components/cards/PaymentRequiredCard";
import { RequestSummaryCard } from "@/components/cards/RequestSummaryCard";
import { RequestStatusBadge, type RequestStatus } from "@/components/ui/RequestStatusBadge";

type RequestDetails = {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  posted: string;
  requestType: "Normal" | "Instant";
  sessionMode: "Individual" | "Group";
  sessionType: "Online" | "Offline";
  learningLevel: string;
  preferredLanguage: string;
  requiredSkills: string[];
  budget: string;
  paymentStatus: string;
  joinedStudents?: string[];
  maxStudents?: number;
  pricePerStudent?: string;
  instructorTotal?: string;
};

const mockRequest: RequestDetails = {
  id: "REQ-8492",
  title: "React State Management Help",
  description:
    "I need help understanding React state management, component rendering, and how to organize a small frontend project using clean reusable components.",
  status: "open",
  posted: "Posted 2 days ago",
  requestType: "Normal",
  sessionMode: "Individual",
  sessionType: "Online",
  learningLevel: "Beginner",
  preferredLanguage: "English",
  requiredSkills: ["React", "JavaScript", "Tailwind CSS"],
  budget: "120 EGP",
  paymentStatus: "Not Required Yet",
  joinedStudents: ["Ziad Ahmed", "Ahmed Ali", "Mona Hassan"],
  maxStudents: 5,
  pricePerStudent: "80 EGP",
  instructorTotal: "240 EGP",
};

const mockApplications: InstructorApplication[] = [
  {
    id: "app-sarah",
    instructorId: "dr-sarah-jenkins",
    instructorName: "Dr. Sarah Jenkins",
    specialization: "Computer Science & AI",
    rating: "4.9",
    reviews: "124",
    experience: "10 years",
    proposedPrice: "150 EGP",
    message:
      "I can help you understand React state management step by step and guide you through practical examples.",
    status: "pending",
  },
  {
    id: "app-ahmed",
    instructorId: "ahmed-mostafa",
    instructorName: "Ahmed Mostafa",
    specialization: "Frontend Development",
    rating: "4.7",
    reviews: "63",
    experience: "5 years",
    proposedPrice: "100 EGP",
    message:
      "I can explain the React concepts in a simple way and help you fix your project structure.",
    status: "pending",
  },
  {
    id: "app-mona",
    instructorId: "mona-hassan",
    instructorName: "Mona Hassan",
    specialization: "Web Development Instructor",
    rating: "4.8",
    reviews: "51",
    experience: "6 years",
    proposedPrice: "120 EGP",
    message:
      "I have experience teaching beginners React, hooks, components, and frontend best practices.",
    status: "pending",
  },
];

const metadataItems = [
  { icon: BookOpen, label: "Request Type", value: mockRequest.requestType },
  { icon: Users, label: "Session Mode", value: mockRequest.sessionMode },
  { icon: Video, label: "Session Type", value: mockRequest.sessionType },
  { icon: GraduationCap, label: "Learning Level", value: mockRequest.learningLevel },
  { icon: Languages, label: "Preferred Language", value: mockRequest.preferredLanguage },
  { icon: WalletCards, label: "Budget", value: mockRequest.budget },
];

export function RequestDetailsPage() {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(mockRequest.status);
  const [paymentStatus, setPaymentStatus] = useState(mockRequest.paymentStatus);
  const [applications, setApplications] = useState(mockApplications);
  const [message, setMessage] = useState("");

  const acceptedApplication = useMemo(
    () => applications.find((application) => application.status === "accepted"),
    [applications],
  );

  const handleAccept = (applicationId: string) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) => ({
        ...application,
        status:
          application.id === applicationId
            ? "accepted"
            : "rejected",
      })),
    );
    setRequestStatus("waiting_payment");
    setPaymentStatus("Pending");
    setMessage("Instructor accepted. Please complete payment to continue.");
  };

  const handleReject = (applicationId: string) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId ? { ...application, status: "rejected" } : application,
      ),
    );
    setMessage("Application rejected.");
  };

  const showOpenSession = requestStatus === "in_session" || requestStatus === "completed";

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-label-md uppercase text-secondary">Request #{mockRequest.id}</p>
            <h1 className="mt-xs text-headline-lg text-on-surface">Request Details</h1>
          </div>

          <Link
            className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
            to="/student/requests"
          >
            <ArrowLeft className="size-4" />
            Back to List
          </Link>
          <button
            className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant px-md text-body-sm font-medium text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            onClick={() => setMessage("Edit request will be available later.")}
            type="button"
          >
            <Pencil className="size-4" />
            Edit Request
          </button>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        {message ? (
          <p className="rounded-md border border-secondary/25 bg-secondary/10 px-md py-sm text-body-sm text-secondary">
            {message}
          </p>
        ) : null}

        <section className="grid gap-lg rounded-lg border border-outline-variant bg-surface-container p-lg xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <div className="mb-md flex flex-wrap items-center gap-sm">
              <RequestStatusBadge status={requestStatus} />
              <span className="inline-flex items-center gap-xs text-body-sm text-on-surface-variant">
                <CalendarDays className="size-4 text-secondary" />
                {mockRequest.posted}
              </span>
            </div>

            <h2 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">
              {mockRequest.title}
            </h2>
            <p className="mt-md max-w-4xl text-body-md text-on-surface-variant">
              {mockRequest.description}
            </p>

            <div className="mt-lg grid gap-sm md:grid-cols-2 xl:grid-cols-3">
              {metadataItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="rounded-md border border-outline-variant bg-surface-container-low p-md"
                    key={item.label}
                  >
                    <dt className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                      <Icon className="size-4 text-secondary" />
                      {item.label}
                    </dt>
                    <dd className="mt-xs text-body-sm font-medium text-on-surface">{item.value}</dd>
                  </div>
                );
              })}
            </div>

            <div className="mt-lg">
              <h3 className="text-body-sm font-medium text-on-surface">Required Skills</h3>
              <div className="mt-sm flex flex-wrap gap-sm">
                {mockRequest.requiredSkills.map((skill) => (
                  <span
                    className="rounded-full bg-primary/15 px-sm py-xs text-body-sm text-primary ring-1 ring-primary/25"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {mockRequest.sessionMode === "Group" ? (
              <section className="mt-lg rounded-lg border border-outline-variant bg-surface-container-low p-lg">
                <h3 className="text-headline-md text-on-surface">Joined Students</h3>
                <div className="mt-md grid gap-md lg:grid-cols-[1fr_260px]">
                  <div className="flex flex-wrap gap-sm">
                    {mockRequest.joinedStudents?.map((student) => (
                      <span
                        className="rounded-full bg-surface-container px-sm py-xs text-body-sm text-on-surface-variant ring-1 ring-outline-variant"
                        key={student}
                      >
                        {student}
                      </span>
                    ))}
                  </div>
                  <dl className="grid gap-sm text-body-sm">
                    <div className="flex justify-between gap-md">
                      <dt className="text-on-surface-variant">Students joined</dt>
                      <dd className="font-medium text-on-surface">
                        {mockRequest.joinedStudents?.length ?? 0} / {mockRequest.maxStudents}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-md">
                      <dt className="text-on-surface-variant">Price per student</dt>
                      <dd className="font-medium text-on-surface">{mockRequest.pricePerStudent}</dd>
                    </div>
                    <div className="flex justify-between gap-md">
                      <dt className="text-on-surface-variant">Instructor total</dt>
                      <dd className="font-medium text-on-surface">{mockRequest.instructorTotal}</dd>
                    </div>
                  </dl>
                </div>
              </section>
            ) : null}
          </div>

          <RequestSummaryCard
            applicationsCount={applications.length}
            budget={mockRequest.budget}
            paymentStatus={paymentStatus}
            requestStatus={requestStatus}
          />
        </section>

        {acceptedApplication ? (
          <PaymentRequiredCard
            instructorName={acceptedApplication.instructorName}
            paymentPath="/student/payments/session/1"
            platformFee="10 EGP"
            sessionPrice={acceptedApplication.proposedPrice}
            totalAmount={`${Number.parseInt(acceptedApplication.proposedPrice, 10) + 10} EGP`}
          />
        ) : null}

        {showOpenSession ? (
          <section className="flex flex-wrap gap-sm rounded-lg border border-outline-variant bg-surface-container p-lg">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
              to="/student/sessions/1"
            >
              Open Session
            </Link>
            <button
              className="inline-flex h-10 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
              onClick={() => setMessage("Review form will be available after session completion.")}
              type="button"
            >
              Leave Review
            </button>
          </section>
        ) : null}

        <section className="space-y-md">
          <div className="flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-headline-md text-on-surface">Instructor Applications</h2>
              <p className="mt-xs text-body-sm text-on-surface-variant">
                Compare instructor proposals and choose the best fit for this request.
              </p>
            </div>

            <button
              className="inline-flex h-10 w-fit items-center gap-sm rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
              onClick={() => setMessage("Applications are already sorted by rating in this mock view.")}
              type="button"
            >
              <SlidersHorizontal className="size-4 text-secondary" />
              Sort by: Rating
            </button>
          </div>

          <div className="space-y-md">
            {applications.map((application) => (
              <InstructorApplicationCard
                application={application}
                key={application.id}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
