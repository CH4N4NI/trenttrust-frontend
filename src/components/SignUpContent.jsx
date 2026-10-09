import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WelcomeNavbar from "./WelcomeNavbar"; 

function useIsMobile() {
  const query = "(max-width: 767px)";
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

const inputClass =
  "w-full rounded-xl border border-transparent bg-black/[0.04] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#00524a] md:border-black/15 md:bg-white";

export default function SignUpContent() {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div>
      {/* NAVBAR (desktop only) */}
      {!isMobile && <WelcomeNavbar />}

      {/* CARD */}
      <main className="flex justify-center px-6 py-6 md:px-4 md:py-16">
        <div className="w-full max-w-[580px] rounded-none border-0 border-[#161616] p-0 shadow-none md:rounded-3xl md:border-2 md:p-10 md:shadow-[6px_6px_0px_0px_#161616]">
          {/* Mobile top: round back button, then step pill below */}
          <div className="md:hidden">
            <Link
              to="/"
              aria-label="Back"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.06]"
            >
              <img
                src="/img/rightarrow.png"
                alt=""
                className="h-[18px] w-[18px] rotate-180 object-contain"
              />
            </Link>
            <span className="mt-5 mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#e5e2c8]/60 px-3 py-1.5 text-[12px] font-medium text-[#161616]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00524a]" />
              Step 1 of 4 • Account
            </span>
          </div>

          {/* Step progress (desktop) */}
          <div className="mb-6 hidden items-center justify-between md:flex">
            <span className="text-xs font-medium tracking-wide text-[#00524a]">
              STEP 1 OF 4 — REGISTRATION
            </span>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((i) =>
                i === 0 ? (
                  <span
                    key={i}
                    className="h-2.5 w-11 rounded-full bg-[#00524a]"
                  />
                ) : (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full bg-[#e5e2c8]"
                  />
                )
              )}
            </div>
          </div>

          <h1 className="font-serif text-[26px] leading-tight text-[#161616] md:text-[28px]">
            Create your account.
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-black/50 md:text-[14px]">
            Start exploring TrentTrust and prepare to join the student
            community.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 flex flex-col gap-4 md:gap-5"
          >
            {/* Name */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-[#161616] md:text-[13px]">
                  First Name <span className="text-[#00524a]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-[#161616] md:text-[13px]">
                  Last Name <span className="text-[#00524a]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vance"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#161616] md:text-[13px]">
                Email Address <span className="text-[#00524a]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder={
                    isMobile
                      ? "student@example.com"
                      : "e.g. personal or institutional email"
                  }
                  className={`${inputClass} md:pr-10`}
                />
                <img
                  src="/img/Letter.png"
                  alt=""
                  className="pointer-events-none absolute right-3.5 top-1/2 hidden h-[18px] w-[18px] -translate-y-1/2 object-contain md:block"
                />
              </div>
              <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-snug text-black/40">
                <img
                  src="/img/I-circle.png"
                  alt=""
                  className="mt-px h-3.5 w-3.5 shrink-0 object-contain"
                />
                <span className="md:hidden">
                  Use any email. Trent verification follows next.
                </span>
                <span className="hidden md:inline">
                  You can use any email now. Official Trent verification
                  happens in the next step.
                </span>
              </p>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-[#161616] md:text-[13px]">
                  Password <span className="text-[#00524a]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isMobile ? "At least 8 characters" : "Min. 8 characters"
                    }
                    className={`${inputClass} pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
                  >
                    <img
                      src="/img/Eye.png"
                      alt={showPassword ? "Hide password" : "Show password"}
                      className="h-[18px] w-[18px] object-contain"
                    />
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-[#161616] md:text-[13px]">
                  Confirm Password <span className="text-[#00524a]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder={
                      isMobile ? "Re-enter your password" : "Repeat password"
                    }
                    className={`${inputClass} pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
                  >
                    <img
                      src="/img/Eye.png"
                      alt={showConfirm ? "Hide password" : "Show password"}
                      className="h-[18px] w-[18px] object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-[12px] leading-snug text-[#161616] md:text-[13px]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-black/30"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/community-guidelines" className="underline">
                  Community Guidelines
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreed}
              className="mt-1 w-full cursor-pointer rounded-xl border-0 bg-[#f0d7ff] py-3 text-[15px] font-medium text-[#161616] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 md:border-2 md:border-black"
            >
              Continue →
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-black/50">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-[#161616] underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="hidden flex-col items-center justify-between gap-2 border-t border-black/10 px-6 py-5 text-[12px] text-black/40 md:flex lg:flex-row lg:px-12">
        <span>© 2025 TrentTrust University Exchange. Institutional single sign-on security enabled.</span>
        <div className="flex gap-4">
          <Link to="/security" className="hover:underline">
            Security Protocol
          </Link>
          <Link to="/privacy" className="hover:underline">
            Student Privacy Charter
          </Link>
          <Link to="/help" className="hover:underline">
            Identity Help Desk
          </Link>
        </div>
      </footer>
    </div>
  );
}