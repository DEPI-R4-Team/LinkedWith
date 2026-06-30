import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Calculator,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  GraduationCap,
  Laptop,
  LockKeyhole,
  MessageSquareText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { buttonVariants } from "@/components/ui/button";

type IconType = typeof Search;

const features: Array<{ icon: IconType; title: string; description: string }> = [
  {
    icon: Search,
    title: "Easy instructor discovery",
    description: "Filter by topic, availability, delivery style, price, and trusted profile signals.",
  },
  {
    icon: MessageSquareText,
    title: "Session requests",
    description: "Send a clear request and let instructors respond with the best way to help.",
  },
  {
    icon: Laptop,
    title: "Online/offline sessions",
    description: "Choose remote learning or meet locally when the subject benefits from hands-on support.",
  },
  {
    icon: LockKeyhole,
    title: "Secure payments",
    description: "Keep payment protected until the session is accepted, completed, and confirmed.",
  },
  {
    icon: Star,
    title: "Ratings and reviews",
    description: "Compare instructors through student feedback, experience, and completed sessions.",
  },
  {
    icon: BarChart3,
    title: "Role-based dashboards",
    description: "Students and instructors each get a focused workspace for requests, sessions, and progress.",
  },
];

const studentBenefits = [
  "Find instructors easily",
  "Request help in specific subjects",
  "Compare instructors by experience, price, and reviews",
  "Track sessions from the dashboard",
];

const instructorBenefits = [
  "Receive student requests",
  "Manage sessions",
  "Set availability",
  "Track earnings",
  "Build a trusted teaching profile",
];

const categories: Array<{ icon: IconType; name: string; text: string }> = [
  { icon: BrainCircuit, name: "Artificial Intelligence", text: "Models, prompts, automation, and applied AI workflows." },
  { icon: Code2, name: "Web Development", text: "Frontend, backend, APIs, deployment, and modern frameworks." },
  { icon: BookOpenCheck, name: "Programming Basics", text: "Core logic, problem solving, syntax, and coding confidence." },
  { icon: Database, name: "Databases", text: "SQL, schema design, queries, indexing, and data modeling." },
  { icon: Network, name: "Electrical Engineering", text: "Circuits, signals, controls, embedded systems, and labs." },
  { icon: Calculator, name: "Mathematics", text: "Calculus, linear algebra, statistics, and exam preparation." },
  { icon: BarChart3, name: "Data Analysis", text: "Spreadsheets, Python, dashboards, visualization, and insights." },
  { icon: ShieldCheck, name: "Cybersecurity", text: "Security basics, networks, risk, testing, and defensive thinking." },
];

const testimonials = [
  {
    name: "Maya N.",
    role: "Student",
    initials: "MN",
    quote: "EduMatch helped me find a patient database instructor before my project deadline. The request flow made everything clear.",
  },
  {
    name: "Omar K.",
    role: "Instructor",
    initials: "OK",
    quote: "I can review requests, manage sessions, and build trust through reviews without juggling separate tools.",
  },
  {
    name: "Lina S.",
    role: "Student",
    initials: "LS",
    quote: "Comparing instructors by price and experience made it easy to choose someone who matched my learning style.",
  },
];

const faqs = [
  {
    question: "What is EduMatch?",
    answer:
      "EduMatch is a learning platform that connects students with instructors for targeted academic help, scheduled sessions, and instant support.",
  },
  {
    question: "How do students find instructors?",
    answer:
      "Students can browse instructor profiles or create a request with the subject, goals, timing, and preferred session format.",
  },
  {
    question: "Can instructors accept or decline requests?",
    answer:
      "Yes. Instructors can review incoming requests and choose the sessions that match their expertise and availability.",
  },
  {
    question: "Are sessions online or offline?",
    answer:
      "EduMatch supports both. Students and instructors can coordinate remote sessions or local in-person learning when appropriate.",
  },
  {
    question: "Is payment supported?",
    answer:
      "Yes. The platform includes payment flows designed to keep both students and instructors aligned around accepted sessions.",
  },
  {
    question: "Can I use EduMatch as a beginner?",
    answer:
      "Absolutely. Requests can be written for beginner-friendly help, fundamentals, project guidance, or advanced review.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="landing-reveal mx-auto mb-12 max-w-[44rem] text-center space-y-4">
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-label-md font-semibold text-primary">
        {eyebrow}
      </span>
      <h2 className="text-headline-lg md:text-headline-xl font-bold text-on-background">
        {title}
      </h2>
      <p className="text-body-lg text-on-surface-variant">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: IconType;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "landing-reveal landing-card landing-tilt group rounded-2xl border border-outline-variant bg-surface-container-low p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-primary/40 hover:bg-surface-container",
        className,
      )}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_12px_30px_rgba(192,193,255,0.12)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-headline-md font-semibold text-on-background">{title}</h3>
      <p className="text-body-sm text-on-surface-variant">{description}</p>
    </article>
  );
}

function BenefitsSection({
  id,
  eyebrow,
  title,
  description,
  benefits,
  flipped = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  flipped?: boolean;
}) {
  return (
    <section id={id} className="relative overflow-hidden py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <div className={cn("grid items-center gap-10 lg:grid-cols-2", flipped && "lg:[&>*:first-child]:order-2")}>
          <div className="landing-reveal space-y-6">
            <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-label-md font-semibold text-secondary">
              {eyebrow}
            </span>
            <div className="space-y-4">
              <h2 className="text-headline-lg md:text-headline-xl font-bold text-on-background">
                {title}
              </h2>
              <p className="text-body-lg text-on-surface-variant">{description}</p>
            </div>
            <ul className="grid gap-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="landing-card flex items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface-variant transition-all duration-300"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="landing-reveal perspective-[900px]">
            <div className="landing-product-card landing-card relative min-h-[360px] overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" aria-hidden="true" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/10 to-transparent" aria-hidden="true" />
              <div className="relative z-10 flex h-full min-h-[310px] flex-col justify-between">
                <div className="landing-dashboard-profile flex items-center justify-between">
                  <div className="rounded-2xl border border-outline-variant bg-background/50 p-3 text-primary">
                    {id === "students" ? (
                      <GraduationCap className="h-7 w-7" aria-hidden="true" />
                    ) : (
                      <UsersRound className="h-7 w-7" aria-hidden="true" />
                    )}
                  </div>
                  <div className="landing-live-badge rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-label-md font-semibold text-secondary">
                    Live profile
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="landing-dashboard-panel rounded-2xl border border-outline-variant bg-background/60 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="landing-dashboard-avatar h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                      <div>
                        <div className="landing-dashboard-line h-3 w-28 rounded-full bg-on-surface-variant/40" />
                        <div className="landing-dashboard-line mt-2 h-2 w-20 rounded-full bg-on-surface-variant/20" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="landing-dashboard-stat h-16 rounded-xl bg-primary/15" />
                      <div className="landing-dashboard-stat h-16 rounded-xl bg-secondary/15" />
                      <div className="landing-dashboard-stat h-16 rounded-xl bg-tertiary/15" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="landing-feature-preview rounded-2xl border border-outline-variant bg-surface-container p-4">
                      <CalendarClock className="mb-3 h-5 w-5 text-secondary" aria-hidden="true" />
                      <p className="text-body-sm font-semibold text-on-background">Smart scheduling</p>
                    </div>
                    <div className="landing-feature-preview rounded-2xl border border-outline-variant bg-surface-container p-4">
                      <WalletCards className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                      <p className="text-body-sm font-semibold text-on-background">
                        {id === "students" ? "Clear pricing" : "Earnings view"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="landing-ambient-shape landing-ambient-shape-primary left-[5%] top-8" aria-hidden="true" />
      <div className="landing-ambient-shape landing-ambient-shape-secondary right-[8%] bottom-6" aria-hidden="true" />
      <div className="relative max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Features"
          title="Everything needed to move from request to real progress"
          description="EduMatch keeps discovery, requests, sessions, payments, and reviews inside one focused learning workspace."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudentsSection() {
  return (
    <BenefitsSection
      id="students"
      eyebrow="For students"
      title="Find the right instructor for the exact help you need"
      description="Whether you are preparing for an exam, debugging a project, or learning a subject from scratch, EduMatch helps you request support with confidence."
      benefits={studentBenefits}
    />
  );
}

export function InstructorsSection() {
  return (
    <BenefitsSection
      id="instructors"
      eyebrow="For instructors"
      title="Turn your expertise into organized, trusted teaching work"
      description="EduMatch gives instructors a clear way to receive requests, manage learning sessions, and build a profile students can trust."
      benefits={instructorBenefits}
      flipped
    />
  );
}

export function PopularCategoriesSection() {
  return (
    <section id="categories" className="py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Popular categories"
          title="Explore high-demand learning topics"
          description="Start with the subjects students request most, then narrow the session around your exact goal."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <FeatureCard
              key={category.name}
              icon={category.icon}
              title={category.name}
              description={category.text}
              className="min-h-[220px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Testimonials"
          title="Built for students and instructors who value clarity"
          description="Sample stories that reflect how EduMatch is designed to feel: direct, trusted, and easy to act on."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="landing-reveal landing-card landing-tilt rounded-2xl border border-outline-variant bg-surface-container-low p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-secondary/40"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-label-md font-bold text-on-primary">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-background">{testimonial.name}</h3>
                    <p className="text-body-sm text-on-surface-variant">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-tertiary" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
              </div>
              <p className="text-body-md text-on-surface-variant">"{testimonial.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [openItem, setOpenItem] = useState(faqs[0]?.question ?? "");

  return (
    <section id="faq" className="py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[960px] mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions before you start"
          description="Quick answers about how EduMatch works for students, instructors, sessions, and payments."
        />
        <div className="landing-reveal space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-outline-variant bg-surface-container-low px-5 py-4 transition-colors duration-300 has-[button[aria-expanded='true']]:bg-surface-container"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left font-semibold text-on-background"
                aria-expanded={openItem === faq.question}
                onClick={() => setOpenItem((current) => (current === faq.question ? "" : faq.question))}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    openItem === faq.question && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  openItem === faq.question ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <p className="overflow-hidden pt-3 text-body-sm text-on-surface-variant">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingCTASection() {
  return (
    <section id="cta" className="py-24 px-margin-mobile md:px-margin-desktop scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="landing-reveal relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/15 via-secondary/5 to-transparent pointer-events-none" aria-hidden="true" />
          <Sparkles className="absolute left-8 top-8 h-10 w-10 rotate-[-10deg] text-primary/25" aria-hidden="true" />
          <Code2 className="absolute bottom-8 right-8 h-12 w-12 rotate-12 text-secondary/25" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[44rem] space-y-6">
            <h2 className="text-headline-lg md:text-[40px] md:leading-[48px] font-bold text-on-background">
              Ready to start learning with the right instructor?
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Join EduMatch and connect with instructors who match your goals.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                to={ROUTES.REGISTER}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "landing-button h-auto rounded-xl px-8 py-4 text-label-md font-semibold shadow-[0_0_20px_rgba(192,193,255,0.24)] hover:opacity-90",
                )}
              >
                Get Started
              </Link>
              <Link
                to={ROUTES.STUDENT.INSTRUCTORS}
                className="landing-button inline-flex items-center justify-center rounded-xl border border-outline-variant bg-surface-variant px-8 py-4 text-label-md font-semibold text-on-background transition-colors hover:bg-surface-container-highest"
              >
                Browse Instructors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
