const features = [
  {
    image: (
      <img
        src="/img/Calendar.png"
        alt=""
        className="h-5 w-5 object-contain"
      />
    ),
    title: "Sublet your room in days, not weeks",
    mobileTitle: "Sublet your room in days, not weeks",
    description:
      "Reach visiting exchange students and winter-term registrants actively searching Peterborough listings.",
  },
  {
    image: (
      <img
        src="/img/Package Icon.png"
        alt=""
        className="h-5 w-5 object-contain"
      />
    ),
    title: "Sell what you can't transport",
    mobileTitle: "Sell what you can't transport easily",
    description:
      "Heavy winter coats, desk monitors, textbooks, and mini-fridges clear quickly when priced directly for peers.",
  },
  {
    image: (
      <img
        src="/img/Correct.png"
        alt=""
        className="h-5 w-5 object-contain"
      />
    ),
    title: "Zero marketplace randoms",
    mobileTitle: "Zero marketplace randoms or bot solicitations",
    description:
      'Every interested buyer has an authenticated Trent identity. Say goodbye to bots asking if "this is still available".',
  },
];

export default function HeroBanner() {
  return (
    <section className="bg-[#ffffeb] px-2.5 py-14 lg:px-6 lg:py-24">

      {/* MOBILE CARD */}
      <div className="rounded-[32px] border-2 border-[#161616] bg-[#fffff0] p-6 lg:hidden">
        <span className="inline-flex w-fit rounded-full border border-black bg-[#00524a] px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-white">
          For co-op students & grads
        </span>

        <h2 className="mt-3 font-serif text-[32px] leading-[1.15] text-[#161616]">
          Leaving for a term? Graduating? We've got you.
        </h2>

        <ul className="mt-5 flex flex-col gap-3 text-[15px] leading-snug text-[#161616]">
          {features.map(({ mobileTitle }) => (
            <li key={mobileTitle} className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-[#00524a]">✓</span>
              {mobileTitle}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2.5">
          <button className="h-[50px] w-full rounded-2xl border-2 border-black bg-[#00524a] text-[15px] font-medium text-white">
            List your room
          </button>
          <button className="h-[50px] w-full rounded-2xl border-2 border-black bg-[#fffff0] text-[15px] font-medium">
            Sell an item
          </button>
        </div>
      </div>

      {/* DESKTOP CARD */}
      <div className="mx-auto hidden max-w-6xl overflow-hidden rounded-3xl bg-[#161616] lg:block">
        <div className="grid grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col justify-center gap-6 px-12 py-12">
            {features.map(({ image, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl bg-[#ffffeb] p-4"
              >
                <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-md">
                  {image}
                </div>

                <div>
                  <h3 className="text-[15px] font-medium leading-snug text-[#161616]">
                    {title}
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-black/50">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center gap-6 px-12 py-16">

            <span className="w-fit rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide">
              For co-op students & grads
            </span>

            <h2 className="font-serif text-[40px] font-medium leading-[1.15] text-white">
              Leaving for a term?
              <br />
              Graduating? We've got you.
            </h2>

            <p className="max-w-sm text-[15px] leading-relaxed text-white/55">
              Stop paying rent on an empty room while you complete a
              placement in Toronto, Ottawa, or beyond. Pass on your
              furnishings to the student body that's already vetted.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="rounded-xl bg-[#f0d7ff] px-5 py-4 text-[17px] font-medium">
                List your room
              </button>

              <button className="rounded-xl bg-white px-5 py-4 text-[17px] font-medium">
                Sell an item
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}