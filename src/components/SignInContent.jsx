import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WelcomeNavbar from "./WelcomeNavbar"; // fix path to match your folder

// true when the screen is narrower than 768px
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

export default function SignInContent() {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div>
      {/* NAVBAR (desktop only) */}
      {!isMobile && <WelcomeNavbar />}

      {/* Mobile top bar: back arrow */}
      {isMobile && (
        <div className="bg-[#ffffe0]/70 px-6 py-5 shadow-sm">
          <Link to="/" aria-label="Back" className="inline-block">
            <img
              src="/img/rightarrow.png"
              alt=""
              className="h-5 w-5 rotate-180 object-contain"
            />
          </Link>
        </div>
      )}

      <main className="flex justify-center px-4 pb-10 pt-24 md:px-6 md:py-10">
        <div className="w-full max-w-[520px]">
          <div className="w-full rounded-xl border-2 border-[#161616] px-5 pb-10 pt-8 md:rounded-2xl md:px-[50px] md:py-[50px]">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <img src="/img/logo.png" alt="" className="h-9 md:h-auto" />
                <span className="font-serif text-[20px] text-[#161616] md:text-[24px]">
                  Trent
                  <span className="font-semibold text-[#00524a]">Trust</span>
                </span>
              </div>

              <h1 className="mt-4 font-serif text-[32px] leading-tight text-[#161616] md:mt-3 md:text-[40px]">
                Welcome back.
              </h1>

              <p className="mt-1.5 text-[15px] text-black/70 md:mt-2 md:text-black/50">
                {isMobile
                  ? "Sign in to continue to TrentTrust."
                  : "Sign in to continue to TrentTrust peer marketplace."}
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-8 md:mt-12">
              {/* Email */}
              <div>
                <div className="mb-2 flex items-center justify-between md:mb-2.5 md:block">
                  <label className="block text-[14px] font-medium text-[#161616]">
                    {isMobile ? "Campus Email" : "Institutional or Verified Email"}
                  </label>
                  {isMobile && (
                    <span className="text-[13px] text-black/50">@trentu.ca</span>
                  )}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50">
                    {isMobile ? (
                      <img
                        src="/img/Letter.png"
                        alt=""
                        className="h-[18px] w-[18px] object-contain"
                      />
                    ) : (
                      <img src="/img/at.png" alt="" />
                    )}
                  </span>
                  <input
                    type="email"
                    placeholder={
                      isMobile ? "student@trentu.ca" : "e.g. yourname@trentu.ca"
                    }
                    className="h-11 w-full rounded-xl border border-black/5 bg-white/70 pl-10 pr-4 text-[15px] outline-none placeholder:text-black/30 focus:border-[#00524a] md:h-[50px] md:border-[#e5e2c8] md:bg-white/60 md:pl-11"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-5 md:mt-6">
                <label className="mb-2 block text-[14px] font-medium text-[#161616] md:mb-2.5">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/50">
                    <img
                      src="/img/Padlock.png"
                      alt=""
                      className={
                        isMobile ? "h-[18px] w-[18px] object-contain" : ""
                      }
                    />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isMobile ? "Enter your password" : "•••••••••••••"}
                    className="h-11 w-full rounded-xl border border-black/5 bg-white/70 pl-10 pr-12 text-[15px] outline-none placeholder:text-black/30 focus:border-[#00524a] md:h-[50px] md:border-[#e5e2c8] md:bg-white/60 md:pl-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-70"
                  >
                    <img
                      src="/img/Eye.png"
                      alt={showPassword ? "Hide password" : "Show password"}
                      className="h-5 w-5 object-contain"
                    />
                  </button>
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="mt-7 flex items-center justify-between md:mt-5">
                <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#161616]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-5 w-5 cursor-pointer rounded-md border-2 border-[#161616] accent-[#00524a]"
                  />
                  {isMobile ? "Remember me" : "Remember this trusted device"}
                </label>

                <button
                  type="button"
                  className="cursor-pointer text-[14px] font-medium text-[#00524a] underline md:font-semibold md:text-[#161616] md:no-underline"
                >
                  {isMobile ? "Forgot Password?" : "Forgot password?"}
                </button>
              </div>

              {/* Sign in */}
              <button
                type="submit"
                className="mt-9 flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border-0 bg-[#f0d7ff] text-[16px] font-medium text-[#161616] md:mt-6 md:rounded-xl md:border-2 md:border-[#161616] md:text-[15px]"
              >
                Sign In
                <img
                  src="/img/rightarrow.png"
                  alt=""
                  className={isMobile ? "h-[18px] w-[18px] object-contain" : ""}
                />
              </button>

              {/* Desktop only: OR divider, SSO, create account */}
              {!isMobile && (
                <>
                  <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e5e2c8]" />
                    <span className="text-[12px] tracking-widest text-black/40">
                      OR
                    </span>
                    <div className="h-px flex-1 bg-[#e5e2c8]" />
                  </div>

                  <button
                    type="button"
                    className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#161616] bg-transparent text-[16px] text-[#161616]"
                  >
                    <img src="/img/Bank.png" alt="" />
                    Continue with Trent Student SSO
                  </button>

                  <p className="mt-8 text-center text-[16px] text-[#161616]">
                    Don't have an account yet?
                    <Link
                      to="/signup"
                      className="ml-2 cursor-pointer text-[14px] font-semibold text-[#00524a]"
                    >
                      Create an account
                    </Link>
                  </p>
                </>
              )}
            </form>
          </div>

          {/* Mobile only: create account below the card */}
          {isMobile && (
            <p className="mt-7 text-center text-[15px] text-[#161616]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="ml-1 font-semibold text-[#00524a] underline"
              >
                Create account
              </Link>
            </p>
          )}
        </div>
      </main>

      {!isMobile && (
        <footer className="mx-auto mt-5 max-w-[1180px] border-t border-black/10 px-6 py-6">
          <p className="text-[10px] text-black/40">
            © 2026 TrentTrust. Built for the Trent student community.
          </p>
        </footer>
      )}
    </div>
  );
}