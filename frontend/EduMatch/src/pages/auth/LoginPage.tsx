import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { InputWithIcon } from "@/components/InputWithIcon";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { ROUTES } from "@/lib/routes";

export function LoginPage() {
  const { credentials, loading, error, successMessage, handleChange, handleSubmit } = useLogin();

  return (
    <main className="bg-background text-on-background min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md">
      <div className="w-full max-w-112 bg-surface-container rounded-xl border border-outline-variant p-lg shadow-lg relative overflow-hidden">
        {/* Decorative glow */}
        <div
          className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <BrandLogo />

        <form className="space-y-md" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label
              className="block text-label-md font-label-md text-on-surface mb-sm"
              htmlFor="email"
            >
              Email Address
            </label>
            <InputWithIcon
              icon="mail"
              id="email"
              name="email"
              type="email"
              placeholder="student@university.edu"
              autoComplete="email"
              required
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-sm">
              <label
                className="block text-label-md font-label-md text-on-surface"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-label-md font-label-md text-secondary hover:text-secondary-fixed transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <InputWithIcon
              icon="lock"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          {/* API error */}
          {successMessage && !error && (
            <p className="text-body-sm text-secondary" role="status">
              {successMessage}
            </p>
          )}

          {error && (
            <p className="text-body-sm text-error" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:bg-[#818cf8] text-white text-label-md font-label-md py-3 h-auto rounded-lg transition-colors duration-200 mt-xl shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing in…" : "Login"}
          </Button>
        </form>

        <div className="mt-lg text-center">
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-secondary hover:text-secondary-fixed font-bold transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
