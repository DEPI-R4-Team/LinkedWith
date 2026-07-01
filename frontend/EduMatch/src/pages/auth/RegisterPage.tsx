import { Link } from "react-router-dom";
import { AmbientGlow } from "@/components/AmbientGlow";
import { InputWithIcon } from "@/components/InputWithIcon";
import { RoleSelector } from "@/components/RoleSelector";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { ROUTES } from "@/lib/routes";

const inputClass =
  "bg-surface-container-lowest rounded-md pr-md placeholder:text-outline";

export function RegisterPage() {
  const { form, role, setRole, loading, error, handleChange, handleSubmit } =
    useRegister();

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md relative overflow-hidden font-body-md">
      <AmbientGlow />

      <main className="w-full max-w-112 bg-surface-container rounded-xl border border-outline-variant p-xl shadow-2xl relative z-10 flex flex-col">
        {/* Header */}
        <header className="text-center mb-xl">
          <h1 className="text-headline-md font-headline-md text-primary mb-sm">
            EduMatch
          </h1>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-xs hidden md:block">
            Create an Account
          </h2>
          <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-xs md:hidden">
            Create an Account
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Join the academic portal to manage your learning requests.
          </p>
        </header>

        {/* Form */}
        <form className="flex flex-col gap-lg" onSubmit={handleSubmit} noValidate>
          {/* Role selector */}
          <RoleSelector value={role} onChange={setRole} />

          {/* Input fields */}
          <div className="flex flex-col gap-md">
            {/* Full Name */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-label-md font-label-md text-on-surface"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <InputWithIcon
                icon="person"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-label-md font-label-md text-on-surface"
                htmlFor="email"
              >
                Email Address
              </label>
              <InputWithIcon
                icon="mail"
                id="email"
                name="email"
                type="email"
                placeholder="jane.doe@university.edu"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-label-md font-label-md text-on-surface"
                htmlFor="password"
              >
                Password
              </label>
              <InputWithIcon
                icon="lock"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-label-md font-label-md text-on-surface"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <InputWithIcon
                icon="lock_reset"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-label-md font-label-md text-on-surface"
                htmlFor="phone"
              >
                Phone <span className="text-on-surface-variant">(optional)</span>
              </label>
              <InputWithIcon
                icon="call"
                id="phone"
                name="phone"
                type="tel"
                placeholder="01005154081"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {role === "student" ? (
              <div className="flex flex-col gap-xs">
                <label
                  className="text-label-md font-label-md text-on-surface"
                  htmlFor="educationLevel"
                >
                  Education Level <span className="text-on-surface-variant">(optional)</span>
                </label>
                <InputWithIcon
                  icon="school"
                  id="educationLevel"
                  name="educationLevel"
                  type="text"
                  placeholder="Engineering Student"
                  autoComplete="organization-title"
                  value={form.educationLevel}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-xs">
                <label
                  className="text-label-md font-label-md text-on-surface"
                  htmlFor="specialization"
                >
                  Specialization <span className="text-on-surface-variant">(optional)</span>
                </label>
                <InputWithIcon
                  icon="history_edu"
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="React Instructor"
                  autoComplete="organization-title"
                  value={form.specialization}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {/* API / validation error */}
          {error && (
            <p className="text-body-sm text-error" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-sm bg-primary text-label-md font-label-md text-on-primary-fixed py-md h-auto rounded-lg hover:bg-primary-fixed-dim transition-colors gap-xs shadow-[0_0_15px_rgba(192,193,255,0.15)] hover:shadow-[0_0_20px_rgba(192,193,255,0.25)] disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating account…" : "Register"}
            {!loading && (
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                arrow_forward
              </span>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-lg text-center">
          <span className="text-body-sm font-body-sm text-on-surface-variant">
            Already have an account?{" "}
          </span>
          <Link
            to={ROUTES.LOGIN}
            className="text-body-sm font-body-sm text-primary hover:text-primary-fixed-dim transition-colors underline decoration-transparent hover:decoration-primary-fixed-dim underline-offset-4"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
