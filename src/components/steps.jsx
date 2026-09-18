function Steps() {
  const steps = [
    {
      number: "01",
      icon: <img src="/img/gradcap.png" alt="" />,
      title: "Verify your Trent identity",
      text: "Instant handshake via active @trentu.ca student credentials or myTrent multi-factor authentication before interacting.",
    },
    {
      number: "02",
      icon: <img src="/img/squares.png" alt="" />,
      title: "Browse structured listings",
      text: "Standardized spreadsheet specs: bus lines to Symons or Trail, all-utilities/hydro/water inclusion, and certified video flags.",
    },
    {
      number: "03",
      icon: <img src="/img/shield.png" alt="" />,
      title: "Message privately in-app",
      text: "Conduct discussions through the relay. Your personal telephone number and personal social handles remain shielded.",
    },
    {
      number: "04",
      icon: <img src="img/handshake.png" alt="" />,
      title: "Meet, verify & arrange",
      text: "Inspect on-site or via verified video walkthrough. Sign standard Ontario leases directly with collegiate peace of mind.",
    },
  ];

  return (
    <section className="bg-[#e8e8d5] px-10 py-16">

      {/* heading */}
      <h2 className="mb-16 font-serif text-5xl">
        Four steps to a safer deal.
      </h2>

      {/* cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="min-h-[325px] rounded-[30px] border-2 border-black bg-[#fffff0] p-8"
          >

            {/* number and icon */}
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl">
                {step.number}
              </span>

              <span className="text-2xl">
                {step.icon}
              </span>
            </div>

            {/* card text */}
            <div className="mt-10">
              <h3 className="max-w-[220px] text-2xl font-semibold leading-tight">
                {step.title}
              </h3>

              <p className="mt-4 text-lg leading-snug">
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