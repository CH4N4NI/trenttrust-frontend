function Steps() {
  const steps = [
    {
      number: "01",
      icon: <img src="/img/gradcap.png" alt="" />,
      title: "Verify your Trent identity",
      text: "Instant handshake via active @trentu.ca student credentials or myTrent multi-factor authentication before interacting.",
      mobileText: (
        <>
          Instant handshake via active{" "}
          <code className="rounded bg-[#e8e8d5] px-1 font-mono text-[13px]">
            @trentu.ca
          </code>{" "}
          credentials or institutional myTrent MFA. No ghost landlords or
          anonymous syndicates.
        </>
      ),
    },
    {
      number: "02",
      icon: <img src="/img/squares.png" alt="" />,
      title: "Browse structured listings",
      text: "Standardized spreadsheet specs: bus lines to Symons or Trail, all-utilities/hydro/water inclusion, and certified video flags.",
      mobileText:
        "Standardized broadsheet specs: designated bus routes to Symons or Traill, actual hydro/water inclusion breakdown, and certified video tour flags on-file.",
    },
    {
      number: "03",
      icon: <img src="/img/shield.png" alt="" />,
      title: "Message privately in-app",
      text: "Conduct discussions through the relay. Your personal telephone number and personal social handles remain shielded.",
      mobileText:
        "Relay messaging shields your phone number and personal WhatsApp handles until mutual verification and agreement to tour are established.",
    },
    {
      number: "04",
      icon: <img src="/img/handshake.png" alt="" />,
      title: "Meet, verify & arrange",
      text: "Inspect on-site or via verified video walkthrough. Sign standard Ontario leases directly with collegiate peace of mind.",
      mobileText:
        "Conduct an on-site or live video walkthrough, review room boundaries, and execute the standard Ontario Residential Tenancy Agreement directly.",
    },
  ];

  return (
    <section className="bg-[#ffffeb] px-5 py-8 lg:bg-[#e8e8d5] lg:px-10 lg:py-16">

      {/* heading */}
      <h2 className="mb-2 font-serif text-[28px] leading-tight lg:mb-16 lg:text-5xl">
        Four steps to a safer deal.
      </h2>

      {/* subtitle (mobile only) */}
      <p className="mb-6 text-sm text-gray-600 lg:hidden">
        Structural guarantees built for the Trent corridor.
      </p>

      {/* cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-3xl border-2 border-black bg-[#fffff0] p-5 lg:min-h-[325px] lg:rounded-[30px] lg:p-8"
          >

            {/* number and icon */}
            <div className="flex items-start justify-between">
              <span className="font-serif text-2xl text-gray-400 lg:text-3xl lg:text-black">
                {step.number}
              </span>

              <span className="hidden text-2xl lg:block">
                {step.icon}
              </span>
            </div>

            {/* card text */}
            <div className="mt-2 lg:mt-10">
              <h3 className="text-lg font-semibold leading-tight lg:max-w-[220px] lg:text-2xl">
                {step.title}
              </h3>

              {/* mobile copy */}
              <p className="mt-2 text-sm leading-snug lg:hidden">
                {step.mobileText}
              </p>

              {/* desktop copy */}
              <p className="mt-4 hidden text-lg leading-snug lg:block">
                {step.text}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Steps;