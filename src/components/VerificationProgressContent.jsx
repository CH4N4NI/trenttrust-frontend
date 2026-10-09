const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#efd6ff]">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#02503f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h9M8.5 6v12" />
          <path d="M14 13l2.5 2.5L21 10" />
        </svg>
      </span>
      <span className="text-[26px] leading-none text-neutral-900" style={serif}>
        Trent<span className="font-semibold text-[#02503f]">Trust</span>
      </span>
    </div>
  );
}

function BadgeCircle() {
  return (
    <div className="relative mx-auto flex h-[112px] w-[112px] items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-neutral-300" />
      <span className="absolute inset-2 rounded-full border border-neutral-300" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#02503f]">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </span>
    </div>
  );
}

const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="min-h-screen bg-[#fffff7] px-12 py-8 text-neutral-900" style={sans}>
      {/* Header */}
      <header className="flex items-center justify-between rounded-xl border-2 border-neutral-900 bg-white px-8 py-4">
        <div className="flex items-center gap-5">
          <Logo />
          <span className="h-6 w-px bg-neutral-300" />
          <span className="text-[13px] uppercase tracking-widest text-neutral-500">Student Auth</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-[15px] font-medium">
          <Arrow dir="left" />
          Back to Main Site
        </button>
      </header>

      {/* Card */}
      <main className="mx-auto mt-12 w-full max-w-[622px]">
        <section className="rounded-[40px] border-2 border-neutral-900 px-12 pb-9 pt-14 text-center">
          <BadgeCircle />

          <h1 className="mt-12 text-[30px] leading-tight" style={serif}>
            Verification in progress
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] text-[17px] leading-relaxed">
            We usually review within 24 hours. You can browse listings now — messaging and listing unlock when you’re verified.
          </p>

          {/* Info strip */}
          <dl className="mt-8 grid grid-cols-3 rounded-xl border-2 border-neutral-900 bg-[#E4E4D0] py-3 text-left">
            <div className="px-6">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Submitted</dt>
              <dd className="mt-1 text-[16px] font-medium">{submittedAt}</dd>
            </div>
            <div className="border-l border-neutral-400/60 px-4">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Target review</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[16px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#02503f]" />
                {targetReview}
              </dd>
            </div>
            <div className="border-l border-neutral-400/60 px-4">
              <dt className="text-[12px] uppercase tracking-wide text-neutral-500">Steward</dt>
              <dd className="mt-1 text-[16px] font-medium">{steward}</dd>
            </div>
          </dl>

          {/* Continue */}
          <button
            onClick={onContinue}
            className="mx-auto mt-8 flex w-[325px] items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] py-4 text-[16px] font-medium transition hover:brightness-95"
          >
            Continue
            <Arrow />
          </button>

          <p className="mt-5 text-[14px] text-neutral-500">
            We’ll email you at <span className="text-[#1A1A1A] font-medium">{maskedEmail}</span> when it’s done.
          </p>
        </section>

        {/* Registrar protocol */}
        <aside className="mt-8 flex items-start gap-4 rounded-2xl bg-[#1a1a1a] px-6 py-6 text-white">
          <img src="/img/double s.png" alt="" />
          <div>
            <h2 className="text-[16px] font-medium">Trent University Registrar Protocol</h2>
            <p className="mt-1 max-w-[470px] text-[12.5px] leading-relaxed text-neutral-300">
              Credentials are encrypted, cross-referenced solely against the institutional enrolled ledger, and wiped from intermediate queues following authentication.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}