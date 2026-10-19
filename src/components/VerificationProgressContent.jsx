const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#efd6ff] sm:h-10 sm:w-10">
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="#02503f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h9M8.5 6v12" />
          <path d="M14 13l2.5 2.5L21 10" />
        </svg>
      </span>
      <span className="text-[22px] leading-none text-neutral-900 sm:text-[26px]" style={serif}>
        Trent<span className="font-semibold text-[#02503f]">Trust</span>
      </span>
    </div>
  );
}

function BadgeCircle() {
  return (
    <div className="relative mx-auto flex h-[96px] w-[96px] items-center justify-center sm:h-[112px] sm:w-[112px]">
      <span className="absolute inset-0 rounded-full border border-neutral-300" />
      <span className="absolute inset-2 rounded-full border border-neutral-300" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#02503f] sm:h-20 sm:w-20">
        <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </span>
    </div>
  );
}

const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

export default function VerificationProgressContent({
  submittedAt = "Today, 2:14 PM",
  targetReview = "Under 24h",
  steward = "Campus Team",
  maskedEmail = "a********@trentu.ca",
  onContinue = () => {},
  onBack = () => {},
}) {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#fffff7] px-4 py-4 text-neutral-900 sm:px-8 sm:py-6 lg:px-12 lg:py-8"
      style={sans}
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 rounded-xl border-2 border-neutral-900 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Logo />
          <span className="hidden h-6 w-px bg-neutral-300 sm:block" />
          <span className="hidden text-[13px] uppercase tracking-widest text-neutral-500 sm:block">
            Student Auth
          </span>
        </div>
        <button
          onClick={onBack}
          className="flex shrink-0 items-center gap-2 text-[14px] font-medium sm:text-[15px]"
        >
          <Arrow dir="left" />
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to Main Site</span>
        </button>
      </header>

      {/* Card */}
      <main className="mx-auto mt-8 w-full max-w-[622px] sm:mt-12">
        <section className="rounded-[28px] border-2 border-neutral-900 px-5 pb-8 pt-10 text-center sm:rounded-[40px] sm:px-12 sm:pb-9 sm:pt-14">
          <BadgeCircle />

          <h1 className="mt-8 text-[26px] leading-tight sm:mt-12 sm:text-[30px]" style={serif}>
            Verification in progress
          </h1>
          <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-relaxed sm:mt-5 sm:text-[17px]">
            We usually review within 24 hours. You can browse listings now — messaging and listing unlock when you’re verified.
          </p>

          {/* Info strip: stacked on mobile, 3 columns from sm up */}
          <dl className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border-2 border-neutral-900 bg-[#E4E4D0] text-left sm:grid-cols-3 sm:py-3">
            <div className="px-5 py-3 sm:px-6 sm:py-0">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Submitted</dt>
              <dd className="mt-1 text-[15px] font-medium sm:text-[16px]">{submittedAt}</dd>
            </div>
            <div className="border-t border-neutral-400/60 px-5 py-3 sm:border-l sm:border-t-0 sm:px-4 sm:py-0">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Target review</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[15px] font-medium sm:text-[16px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#02503f]" />
                {targetReview}
              </dd>
            </div>
            <div className="border-t border-neutral-400/60 px-5 py-3 sm:border-l sm:border-t-0 sm:px-4 sm:py-0">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Steward</dt>
              <dd className="mt-1 text-[15px] font-medium sm:text-[16px]">{steward}</dd>
            </div>
          </dl>

          {/* Continue */}
          <button
            onClick={onContinue}
            className="mx-auto mt-8 flex w-full max-w-[325px] items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] py-4 text-[16px] font-medium transition hover:brightness-95"
          >
            Continue
            <Arrow />
          </button>

          <p className="mt-5 break-words text-[13px] text-neutral-500 sm:text-[14px]">
            We’ll email you at{" "}
            <span className="break-all font-medium text-[#1A1A1A]">{maskedEmail}</span> when it’s done.
          </p>
        </section>

        {/* Registrar protocol */}
        <aside className="mt-6 flex items-start gap-3 rounded-2xl bg-[#1a1a1a] px-4 py-5 text-white sm:mt-8 sm:gap-4 sm:px-6 sm:py-6">
          <img
            src="/img/double s.png"
            alt=""
            className="h-auto w-10 shrink-0 sm:w-auto"
          />
          <div className="min-w-0">
            <h2 className="text-[15px] font-medium sm:text-[16px]">
              Trent University Registrar Protocol
            </h2>
            <p className="mt-1 max-w-[470px] text-[12.5px] leading-relaxed text-neutral-300">
              Credentials are encrypted, cross-referenced solely against the institutional enrolled ledger, and wiped from intermediate queues following authentication.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}