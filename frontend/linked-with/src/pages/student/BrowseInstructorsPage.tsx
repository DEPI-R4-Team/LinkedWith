import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  Search,
  Star,
  WalletCards,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Availability = "Available" | "Busy";

type Instructor = {
  id: string;
  name: string;
  specialization: string;
  rating: string;
  reviews: string;
  bio: string;
  skills: string[];
  sessionRate: string;
  experience: string;
  availability: Availability;
  verified: "Verified";
};

const instructors: Instructor[] = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    specialization: "Computer Science & AI",
    rating: "4.9",
    reviews: "124",
    bio: "Specializing in machine learning algorithms, neural networks, and practical AI projects.",
    skills: ["Machine Learning", "Python", "Neural Networks"],
    sessionRate: "150 EGP",
    experience: "10 years",
    availability: "Available",
    verified: "Verified",
  },
  {
    id: "prof-marcus-thorne",
    name: "Prof. Marcus Thorne",
    specialization: "Data Ethics & Policy",
    rating: "4.8",
    reviews: "89",
    bio: "Expert in technology ethics, research writing, and academic project guidance.",
    skills: ["Research", "Data Ethics", "Academic Writing"],
    sessionRate: "120 EGP",
    experience: "8 years",
    availability: "Busy",
    verified: "Verified",
  },
  {
    id: "dr-elena-rostova",
    name: "Dr. Elena Rostova",
    specialization: "Quantum Computing",
    rating: "5.0",
    reviews: "42",
    bio: "Guides students through quantum computing basics, algorithms, and complex theory.",
    skills: ["Quantum", "Algorithms", "Mathematics"],
    sessionRate: "200 EGP",
    experience: "7 years",
    availability: "Available",
    verified: "Verified",
  },
  {
    id: "ahmed-mostafa",
    name: "Ahmed Mostafa",
    specialization: "Frontend Development",
    rating: "4.7",
    reviews: "63",
    bio: "Helps students build modern web interfaces using React, TypeScript, and Tailwind CSS.",
    skills: ["React", "JavaScript", "Tailwind"],
    sessionRate: "100 EGP",
    experience: "5 years",
    availability: "Available",
    verified: "Verified",
  },
  {
    id: "mona-hassan",
    name: "Mona Hassan",
    specialization: "Database Systems",
    rating: "4.6",
    reviews: "51",
    bio: "Explains ERD, normalization, SQL queries, and database project design in a simple way.",
    skills: ["SQL", "ERD", "PostgreSQL"],
    sessionRate: "90 EGP",
    experience: "4 years",
    availability: "Available",
    verified: "Verified",
  },
  {
    id: "omar-khaled",
    name: "Omar Khaled",
    specialization: "Mathematics",
    rating: "4.8",
    reviews: "77",
    bio: "Supports students in calculus, linear algebra, probability, and engineering mathematics.",
    skills: ["Calculus", "Linear Algebra", "Probability"],
    sessionRate: "110 EGP",
    experience: "6 years",
    availability: "Busy",
    verified: "Verified",
  },
];

const filterButtons = ["Subject", "Rating", "Experience", "Price"];
type FilterMenu = "Subject" | "Rating" | "Experience" | "Price" | null;

function InstructorAvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <span
      className={cn(
        "rounded-full px-sm py-xs text-label-md uppercase ring-1",
        availability === "Available"
          ? "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25"
          : "bg-tertiary/15 text-tertiary ring-tertiary/25",
      )}
    >
      {availability}
    </span>
  );
}

function InstructorSearchFilters({
  activeMenu,
  filters,
  onFilterChange,
  onMenuToggle,
  searchTerm,
  onSearchChange,
}: {
  activeMenu: FilterMenu;
  filters: {
    subject: string;
    rating: string;
    experience: string;
    price: string;
  };
  onFilterChange: (key: "subject" | "rating" | "experience" | "price", value: string) => void;
  onMenuToggle: (menu: FilterMenu) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) {
  const options = {
    Subject: ["Any Subject", "React", "Database", "Mathematics", "Research"],
    Rating: ["Any Rating", "4.5+", "4.8+", "5.0"],
    Experience: ["Any Experience", "5+ years", "8+ years", "10+ years"],
    Price: ["Any Price", "Up to 100 EGP", "Up to 150 EGP", "Up to 200 EGP"],
  };

  const filterKeys = {
    Subject: "subject",
    Rating: "rating",
    Experience: "experience",
    Price: "price",
  } as const;

  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-md">
      <div className="flex flex-col gap-md xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-md top-1/2 size-4 -translate-y-1/2 text-on-surface-variant" />
          <Input
            className="h-11 border-outline-variant bg-surface-container-low pl-10 text-on-surface"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, specialization, or keyword..."
            value={searchTerm}
          />
        </div>

        <div className="flex flex-wrap gap-sm">
          {filterButtons.map((filter) => (
            <div className="relative" key={filter}>
              <button
                className="flex h-11 items-center gap-sm rounded-md border border-outline-variant bg-surface-container-low px-md text-body-sm text-on-surface-variant transition hover:border-primary/50 hover:bg-surface-container-high hover:text-on-surface"
                onClick={() => onMenuToggle(activeMenu === filter ? null : (filter as FilterMenu))}
                type="button"
              >
                {filters[filterKeys[filter as keyof typeof filterKeys]] === `Any ${filter}`
                  ? filter
                  : filters[filterKeys[filter as keyof typeof filterKeys]]}
                <ChevronDown className="size-4" />
              </button>
              {activeMenu === filter ? (
                <div className="absolute right-0 z-20 mt-xs w-44 rounded-md border border-outline-variant bg-surface-container p-xs shadow-lg">
                  {options[filter as keyof typeof options].map((option) => (
                    <button
                      className="block w-full rounded-md px-sm py-xs text-left text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                      key={option}
                      onClick={() => onFilterChange(filterKeys[filter as keyof typeof filterKeys], option)}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="flex min-h-[390px] flex-col rounded-lg border border-outline-variant bg-surface-container p-lg transition hover:border-primary/50 hover:bg-surface-container-high hover:shadow-[0_0_36px_rgba(192,193,255,0.10)]">
      <div className="mb-md flex items-start justify-between gap-md">
        <div className="flex min-w-0 items-center gap-md">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-body-md font-semibold text-on-primary">
            {instructor.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-headline-md text-on-surface">{instructor.name}</h2>
            <p className="truncate text-body-sm text-on-surface-variant">{instructor.specialization}</p>
          </div>
        </div>

        <InstructorAvailabilityBadge availability={instructor.availability} />
      </div>

      <div className="mb-md flex flex-wrap items-center gap-sm">
        <span className="flex items-center gap-xs rounded-full bg-tertiary/15 px-sm py-xs text-body-sm text-tertiary">
          <Star className="size-4 fill-current" />
          {instructor.rating}
        </span>
        <span className="text-body-sm text-on-surface-variant">{instructor.reviews} reviews</span>
        <span className="flex items-center gap-xs rounded-full bg-primary/15 px-sm py-xs text-label-md uppercase text-primary ring-1 ring-primary/25">
          <BadgeCheck className="size-4" />
          {instructor.verified}
        </span>
      </div>

      <p className="line-clamp-3 flex-1 text-body-sm text-on-surface-variant">{instructor.bio}</p>

      <div className="mt-md flex flex-wrap gap-sm">
        {instructor.skills.map((skill) => (
          <span
            className="rounded-full bg-surface-container-low px-sm py-xs text-body-sm text-on-surface-variant ring-1 ring-outline-variant"
            key={skill}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="my-lg grid gap-sm rounded-md border border-outline-variant bg-surface-container-low p-md text-body-sm sm:grid-cols-2">
        <div className="flex items-center gap-sm text-on-surface-variant">
          <WalletCards className="size-4 text-secondary" />
          <span>{instructor.sessionRate}</span>
        </div>
        <div className="flex items-center gap-sm text-on-surface-variant">
          <BriefcaseBusiness className="size-4 text-secondary" />
          <span>{instructor.experience}</span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-sm">
        <Link
          className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-primary px-md text-body-sm font-medium text-on-primary transition hover:bg-primary/90"
          to={`/student/instructors/${instructor.id}`}
        >
          View Profile
        </Link>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-secondary/40 px-md text-body-sm font-medium text-secondary transition hover:bg-secondary/10"
          to="/student/requests/create"
        >
          Create Request
        </Link>
      </div>
    </article>
  );
}

export function BrowseInstructorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<FilterMenu>(null);
  const [filters, setFilters] = useState({
    subject: "Any Subject",
    rating: "Any Rating",
    experience: "Any Experience",
    price: "Any Price",
  });

  function handleFilterChange(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setActiveMenu(null);
  }

  const visibleInstructors = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return instructors;
    }

    return instructors.filter((instructor) => {
      const searchableText = [
        instructor.name,
        instructor.specialization,
        ...instructor.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesSubject =
        filters.subject === "Any Subject" ||
        searchableText.includes(filters.subject.toLowerCase());
      const matchesRating =
        filters.rating === "Any Rating" ||
        Number.parseFloat(instructor.rating) >= Number.parseFloat(filters.rating);
      const years = Number.parseInt(instructor.experience, 10);
      const matchesExperience =
        filters.experience === "Any Experience" ||
        years >= Number.parseInt(filters.experience, 10);
      const price = Number.parseInt(instructor.sessionRate, 10);
      const matchesPrice =
        filters.price === "Any Price" ||
        price <= Number.parseInt(filters.price.replace(/\D/g, ""), 10);

      return matchesSearch && matchesSubject && matchesRating && matchesExperience && matchesPrice;
    });
  }, [filters, searchTerm]);

  return (
    <>
      <header className="border-b border-outline-variant bg-background/90 px-margin-mobile py-lg backdrop-blur md:px-margin-desktop">
        <div className="flex flex-col gap-md lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-sm flex items-center gap-sm text-label-md uppercase text-on-surface-variant">
              <span>Student</span>
              <span className="size-1 rounded-full bg-outline" />
              <span className="text-secondary">Browse Instructors</span>
            </div>
            <h1 className="text-headline-lg text-on-surface">Find Your Instructor</h1>
            <p className="mt-xs max-w-2xl text-body-sm text-on-surface-variant">
              Browse verified instructors and choose the best match for your learning goals.
            </p>
          </div>

          <div className="flex items-center gap-sm rounded-lg border border-primary/20 bg-primary/10 px-md py-sm text-body-sm text-primary">
            <Award className="size-4" />
            Verified instructor network
          </div>
        </div>
      </header>

      <div className="space-y-lg px-margin-mobile py-lg md:px-margin-desktop">
        <InstructorSearchFilters
          activeMenu={activeMenu}
          filters={filters}
          onFilterChange={handleFilterChange}
          onMenuToggle={setActiveMenu}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
        />

        {visibleInstructors.length > 0 ? (
          <section className="grid gap-lg md:grid-cols-2 2xl:grid-cols-3">
            {visibleInstructors.map((instructor) => (
              <InstructorCard instructor={instructor} key={instructor.id} />
            ))}
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-outline bg-surface-container p-xl text-center">
            <div className="mx-auto mb-md flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Search className="size-6" />
            </div>
            <h2 className="text-headline-md text-on-surface">No instructors found</h2>
            <p className="mt-sm text-body-sm text-on-surface-variant">
              Try changing your search keyword or filters.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
