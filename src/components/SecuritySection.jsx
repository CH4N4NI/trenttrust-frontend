const trustBadges = [
  "Direct Trent University SSO Verification",
  "24h Human Campus Resolution Desk",
  "In-App Shielded Relay Messaging",
];

function SecuritySection() {
  return (
    <section className="px-2.5 py-14 lg:px-5 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[28px] bg-[#191919] px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-[40px] lg:px-12 lg:py-12">

        {/* Text content */}
        <div className="max-w-lg text-white">

          {/* tag (mobile only) */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-[#034F46] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white lg:hidden">
            ✓ Why trust works here
          </span>

          <h2 className="font-serif text-[28px] leading-tight lg:text-5xl">
            Everyone is verified.{" "}
            <br className="hidden lg:block" />
            Everything is{" "}
            <br className="hidden lg:block" />
            reportable.
          </h2>

          {/* mobile copy */}
          <p className="mt-4 text-sm leading-snug text-gray-300 lg:hidden max-w-lg">
            Our ledger is locked to active academic
            enrollment. Student monitors audit flagged
            interactions within hours to keep
            <br />
            Peterborough housing reliable.
          </p>

          {/* desktop copy */}
          <p className="mt-5 hidden text-xl leading-6 text-gray-300 lg:block">
            Unlike anonymous classifieds and unstructured social
            message boards, TrentTrust ties every transaction to
            an actively matriculated university identity. Human
            student moderators review incident escalations within
            24 hours.
          </p>
        </div>

        {/* Mockup side */}
        <div className="flex flex-col gap-4">
          <img
            src="/img/Trent Verified.png"
            alt="TrentTrust verified messaging"
            className="w-full rounded-2xl lg:w-auto lg:rounded-[40px]"
          />

          {/* trust badges (mobile only) */}
          <div className="flex flex-col gap-2 lg:hidden">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="rounded-xl border-2 border-white px-3 py-2 text-xs text-white"
              >
                ✓ {badge}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default SecuritySection;