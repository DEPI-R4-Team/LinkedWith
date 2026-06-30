import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RequestStatusBadge, type ApplicationStatus } from "@/components/ui/RequestStatusBadge";
import { cn } from "@/lib/utils";

type InstructorRequest = {
  id: string;
  projectId: string;
  title: string;
  course: string;
  studentName: string;
  studentInitials: string;
  studentColor: string;
  status: ApplicationStatus;
  dateApplied: string;
};

const mockRequests: InstructorRequest[] = [
  {
    id: "1",
    projectId: "1",
    title: "AI-Driven Medical Diagnostics",
    course: "CS499 - Capstone Project",
    studentName: "James Smith",
    studentInitials: "JS",
    studentColor: "bg-primary/20 text-primary",
    status: "pending",
    dateApplied: "Oct 24, 2023",
  },
  {
    id: "2",
    projectId: "2",
    title: "Blockchain Voting System",
    course: "CS499 - Capstone Project",
    studentName: "Aisha Khan",
    studentInitials: "AK",
    studentColor: "bg-secondary/20 text-secondary",
    status: "accepted",
    dateApplied: "Oct 22, 2023",
  },
  {
    id: "3",
    projectId: "2",
    title: "Autonomous Drone Navigation",
    course: "EE501 - Senior Design",
    studentName: "Michael Rodriguez",
    studentInitials: "MR",
    studentColor: "bg-error/20 text-error",
    status: "pending",
    dateApplied: "Oct 20, 2023",
  },
  {
    id: "4",
    projectId: "3",
    title: "Simple CRUD Web App",
    course: "CS499 - Capstone Project",
    studentName: "Emily Wong",
    studentInitials: "EW",
    studentColor: "bg-tertiary/20 text-tertiary",
    status: "rejected",
    dateApplied: "Oct 18, 2023",
  },
  {
    id: "5",
    projectId: "1",
    title: "Real-time Chat Application",
    course: "CS410 - Software Engineering",
    studentName: "Omar Hassan",
    studentInitials: "OH",
    studentColor: "bg-emerald-400/20 text-emerald-300",
    status: "accepted",
    dateApplied: "Oct 16, 2023",
  },
  {
    id: "6",
    projectId: "4",
    title: "Smart Campus IoT System",
    course: "EE501 - Senior Design",
    studentName: "Fatima Ali",
    studentInitials: "FA",
    studentColor: "bg-blue-400/20 text-blue-300",
    status: "pending",
    dateApplied: "Oct 14, 2023",
  },
  {
    id: "7",
    projectId: "3",
    title: "E-Commerce Analytics Dashboard",
    course: "BA440 - Marketing Analytics",
    studentName: "David Chen",
    studentInitials: "DC",
    studentColor: "bg-primary/20 text-primary",
    status: "accepted",
    dateApplied: "Oct 12, 2023",
  },
  {
    id: "8",
    projectId: "1",
    title: "NLP Sentiment Analysis Tool",
    course: "CS499 - Capstone Project",
    studentName: "Sara Williams",
    studentInitials: "SW",
    studentColor: "bg-secondary/20 text-secondary",
    status: "rejected",
    dateApplied: "Oct 10, 2023",
  },
  {
    id: "9",
    projectId: "2",
    title: "Robotic Arm Control System",
    course: "ME450 - Mechatronics",
    studentName: "Ali Mahmoud",
    studentInitials: "AM",
    studentColor: "bg-tertiary/20 text-tertiary",
    status: "pending",
    dateApplied: "Oct 8, 2023",
  },
  {
    id: "10",
    projectId: "4",
    title: "Renewable Energy Tracker",
    course: "EE501 - Senior Design",
    studentName: "Nour Ibrahim",
    studentInitials: "NI",
    studentColor: "bg-emerald-400/20 text-emerald-300",
    status: "accepted",
    dateApplied: "Oct 6, 2023",
  },
  {
    id: "11",
    projectId: "1",
    title: "Automated Testing Framework",
    course: "CS410 - Software Engineering",
    studentName: "Liam Brown",
    studentInitials: "LB",
    studentColor: "bg-blue-400/20 text-blue-300",
    status: "pending",
    dateApplied: "Oct 4, 2023",
  },
  {
    id: "12",
    projectId: "3",
    title: "Supply Chain Optimization",
    course: "BA440 - Operations Research",
    studentName: "Yasmin Fahmy",
    studentInitials: "YF",
    studentColor: "bg-error/20 text-error",
    status: "rejected",
    dateApplied: "Oct 2, 2023",
  },
];

type FilterValue = "all" | ApplicationStatus;
const ITEMS_PER_PAGE = 4;

const filterOptions: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

export function InstructorRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return mockRequests.filter((request) => {
      const matchesSearch =
        !query ||
        [request.title, request.studentName, request.course]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        activeFilter === "all" || request.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredRequests.length);

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-headline-lg text-on-surface">My Requests</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Manage and review applications from students for your graduation
              projects.
            </p>
          </div>

          <div className="flex w-full flex-col gap-sm sm:flex-row xl:w-auto">
            <div className="relative min-w-0 flex-1 xl:w-[280px]">
              <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
              <Input
                className="h-10 border-outline-variant bg-surface-container pl-10 text-on-surface"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search requests..."
                value={searchTerm}
              />
            </div>
            <div className="relative">
              <button
                className="inline-flex h-10 items-center justify-center gap-xs rounded-md border border-outline-variant bg-surface-container px-md text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                onClick={() => setShowFilterMenu((prev) => !prev)}
                type="button"
              >
                <Filter className="size-4 text-secondary" />
                Filter
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 top-12 z-20 w-40 rounded-md border border-outline-variant bg-surface-container p-xs shadow-lg">
                  {filterOptions.map((option) => (
                    <button
                      className={cn(
                        "block w-full rounded-md px-sm py-xs text-left text-body-sm transition",
                        activeFilter === option.value
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                      )}
                      key={option.value}
                      onClick={() => {
                        setActiveFilter(option.value);
                        setCurrentPage(1);
                        setShowFilterMenu(false);
                      }}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-margin-mobile py-lg md:px-margin-desktop">
        <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container">
          <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_120px_130px_120px] gap-md border-b border-outline-variant bg-surface-container-low px-lg py-sm md:grid">
            <span className="text-label-md uppercase text-on-surface-variant">
              Request Subject
            </span>
            <span className="text-label-md uppercase text-on-surface-variant">
              Student Name
            </span>
            <span className="text-label-md uppercase text-on-surface-variant">
              Status
            </span>
            <span className="text-label-md uppercase text-on-surface-variant">
              Date Applied
            </span>
            <span className="text-label-md uppercase text-on-surface-variant text-right">
              Action
            </span>
          </div>

          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((request, index) => (
              <div
                className={cn(
                  "grid gap-y-sm gap-x-md px-lg py-md md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_120px_130px_120px] md:items-center",
                  index !== paginatedRequests.length - 1 &&
                    "border-b border-outline-variant",
                )}
                key={request.id}
              >
                <div className="min-w-0">
                  <p className="truncate text-body-md font-medium text-on-surface">
                    {request.title}
                  </p>
                  <p className="text-body-sm text-on-surface-variant">
                    {request.course}
                  </p>
                </div>

                <div className="flex items-center gap-sm">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-label-md font-medium",
                      request.studentColor,
                    )}
                  >
                    {request.studentInitials}
                  </span>
                  <span className="truncate text-body-sm text-on-surface">
                    {request.studentName}
                  </span>
                </div>

                <div>
                  <RequestStatusBadge status={request.status} />
                </div>

                <p className="text-body-sm text-on-surface-variant">
                  {request.dateApplied}
                </p>

                <div className="flex justify-end">
                  <Link
                    className={cn(
                      "inline-flex h-9 items-center justify-center rounded-md px-md text-body-sm font-medium transition",
                      request.status === "pending"
                        ? "bg-primary text-on-primary hover:bg-primary/90"
                        : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                    )}
                    to={`/instructor/projects/${request.projectId}`}
                  >
                    {request.status === "pending" ? "View Request" : "Details"}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-xl text-center">
              <h3 className="text-headline-md text-on-surface">No requests found</h3>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}

          {filteredRequests.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-sm border-t border-outline-variant px-lg py-md sm:flex-row">
              <p className="text-body-sm text-on-surface-variant">
                Showing {startItem} to {endItem} of {filteredRequests.length}{" "}
                requests
              </p>
              <div className="flex items-center gap-xs">
                <button
                  className="flex size-8 items-center justify-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  type="button"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      className={cn(
                        "flex size-8 items-center justify-center rounded-md text-body-sm transition",
                        page === currentPage
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container-high",
                      )}
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      type="button"
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  className="flex size-8 items-center justify-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high disabled:opacity-40"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
