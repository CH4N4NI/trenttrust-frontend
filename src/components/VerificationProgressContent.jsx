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

// Mobile: Hourglass.png image. Desktop: original checkmark badge.
function BadgeCircle() {
  return (
    <>
      <div className="relative mx-auto flex h-[96px] w-[96px] items-center justify-center sm:hidden">
        <span className="absolute inset-0 rounded-full bg-[#d3eae2]" />
        <span className="absolute inset-2 rounded-full bg-[#b7dccf]" />
        <img
          src="/img/Hourglass.png"
          alt=""
          className="relative h-14 w-14 object-contain"
        />
      </div>
      <div className="relative mx-auto hidden h-[112px] w-[112px] items-center justify-center sm:flex">
        <span className="absolute inset-0 rounded-full border border-neutral-300" />
        <span className="absolute inset-2 rounded-full border border-neutral-300" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#02503f]">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
      </div>
    </>
  );
}

const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

const MailCheck = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#02503f]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8" />
    <path d="M3.5 7.5L12 13l8.5-5.5" />
    <path d="M16 18.5l2 2 3.5-4" />
  </svg>
);

export default function VerificationProgressContent({
  submittedAt = "Today, 2:14 PM",
  targetReview = "Under 24h",
  steward = "Campus Team",
  maskedEmail = "a********@trentu.ca",
  onContinue = () => {},
  onBack = () => {},
  onContactDesk = () => {},
}) {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#fffff7] px-6 py-6 text-neutral-900 sm:px-8 sm:py-6 lg:px-12 lg:py-8"
      style={sans}
    >
      {/* Mobile top bar: round back button + step pill */}
      <div className="sm:hidden">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ececE4]"
        >
          <Arrow dir="left" />
        </button>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ececE4] px-4 py-2 text-[14px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#02503f]" />
          Step 2 of 3 • Verify
        </span>
      </div>

      {/* Desktop header */}
      <header className="hidden items-center justify-between gap-3 rounded-xl border-2 border-neutral-900 bg-white px-6 py-4 sm:flex lg:px-8">
        <div className="flex min-w-0 items-center gap-5">
          <Logo />
          <span className="h-6 w-px bg-neutral-300" />
          <span className="text-[13px] uppercase tracking-widest text-neutral-500">
            Student Auth
          </span>
        </div>
        <button
          onClick={onBack}
          className="flex shrink-0 items-center gap-2 text-[15px] font-medium"
        >
          <Arrow dir="left" />
          Back to Main Site
        </button>
      </header>

      {/* Card */}
      <main className="mx-auto mt-14 w-full max-w-[622px] sm:mt-12">
        <section className="rounded-[32px] border border-neutral-900 px-6 pb-8 pt-9 text-center sm:rounded-[40px] sm:border-2 sm:px-12 sm:pb-9 sm:pt-14">
          <BadgeCircle />

          <h1 className="mt-6 text-[32px] leading-tight sm:mt-12 sm:text-[30px]" style={serif}>
            Verification in progress
          </h1>
          <p className="mx-auto mt-6 max-w-[440px] text-[16px] leading-relaxed sm:mt-5 sm:text-[17px]">
            We usually review within 24 hours. You can browse listings now, messaging and listing unlock when you’re verified.
          </p>

          {/* Info strip: desktop only (not in the mobile design) */}
          <dl className="mt-8 hidden grid-cols-3 overflow-hidden rounded-xl border-2 border-neutral-900 bg-[#E4E4D0] py-3 text-left sm:grid">
            <div className="px-6">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Submitted</dt>
              <dd className="mt-1 text-[16px] font-medium">{submittedAt}</dd>
            </div>
            <div className="border-l border-neutral-400/60 px-4">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Target review</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[16px] font-medium">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#02503f]" />
                {targetReview}
              </dd>
            </div>
            <div className="border-l border-neutral-400/60 px-4">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Steward</dt>
              <dd className="mt-1 text-[16px] font-medium">{steward}</dd>
            </div>
          </dl>

          {/* Primary button */}
          <button
            onClick={onContinue}
            className="mx-auto mt-9 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F0D7FF] px-4 py-4 text-[16px] font-medium transition hover:brightness-95 sm:mt-8 sm:max-w-[325px] sm:rounded-xl sm:border-2 sm:border-neutral-900"
          >
            <span className="sm:hidden">Browse housing while you wait</span>
            <span className="hidden sm:inline">Continue</span>
            <Arrow />
          </button>

          {/* Email note */}
          <p className="mt-8 flex items-center justify-center gap-2 text-left text-[13px] text-neutral-500 sm:mt-5 sm:text-[14px]">
            <MailCheck />
            <span className="min-w-0">
              We’ll email you at{" "}
              <span className="break-all font-medium text-[#1A1A1A]">{maskedEmail}</span> when it’s done.
            </span>
          </p>

          {/* Document help link (mobile design) */}
          <p className="mt-8 text-[13px] leading-snug text-neutral-500 sm:hidden">
            Need to update your submitted document?
            <br />
            <button
              onClick={onContactDesk}
              className="font-medium text-neutral-900 underline underline-offset-2"
            >
              Contact resolution desk
            </button>
          </p>
        </section>

        {/* Registrar protocol: desktop only (not in the mobile design) */}
        <aside className="mt-8 hidden items-start gap-4 rounded-2xl bg-[#1a1a1a] px-6 py-6 text-white sm:flex">
          <img src="/img/double s.png" alt="" className="h-auto w-auto shrink-0" />
          <div className="min-w-0">
            <h2 className="text-[16px] font-medium">
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