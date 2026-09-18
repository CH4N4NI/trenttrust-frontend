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
    description:
      'Every interested buyer has an authenticated Trent identity. Say goodbye to bots asking if "this is still available".',
  },
];

export default function HeroBanner() {
  return (
    <section className="bg-[#ffffeb] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#161616]">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col justify-center gap-4 px-8 py-10 md:gap-6 md:px-12 md:py-12">
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
          <div className="flex flex-col justify-center gap-6 px-8 py-12 md:px-12 md:py-16">

            <span className="w-fit rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-wide">
              For co-op students & grads
            </span>

            <h2 className="font-serif text-[34px] font-medium leading-[1.15] text-white md:text-[40px]">
              Leaving for a term?
              <br />
              Graduating We've got you.
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