import { ArrowRight } from "lucide-react";

const mobileListings = [
  {
    label: "Available May 1",
    image: "/img/WaterStreet.jpg",
    caption: "14 Photos + 1080p Walkthrough",
    title: "Water Street Collegiate Row",
    price: "$780",
    blurb: "~14 min direct bus route to Symons Campus on Route 2",
    tags: ["All Utilities Inc.", "Furnished Available", "Female-Identified Shared"],
    cta: "Inspect Verified Specs",
    arrow: true,
  },
  {
    image: "/img/GeorgreStreet.jpg",
    caption: "Recorded Live Tour Nov 2024",
    title: "George Street North Residence",
    price: "$825",
    blurb: "2 min walk to Traill College & Queen Street Corridor", // check
    cta: "Request Live Tour",
  },
];

function RoomFinderSection() {
  return (
    <section className="bg-[#ffffeb] px-2.5 py-8 lg:bg-[#e3e2d0] lg:px-16 lg:py-16">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-16">

        {/* left column */}
        <div>
          <span className="inline-flex h-8 w-fit items-center justify-center gap-1.5 rounded-full bg-[#034F46] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-white lg:h-10 lg:w-70 lg:text-[12px] border-2 border-black  ">
            For students arriving at Trent
          </span>

          <h2 className="mt-4 font-serif text-[28px] leading-tight text-black lg:text-4xl">
            Find your room before you land.
          </h2>

          {/* mobile copy */}
          <p className="mt-3 text-sm leading-relaxed text-gray-700 lg:hidden">
            Can't visit Peterborough in person? Browse rooms with verified
            floorplans, schedule live video walkthroughs, and secure
            transparent student agreements.
          </p>

          {/* desktop copy */}
          <p className="mt-4 hidden max-w-md text-[15px] leading-relaxed text-gray-700 lg:block">
            Can't visit Peterborough in person? Browse rooms with verified
            floorplans, schedule live video walkthroughs, and connect
            directly with existing student tenants without exposing private
            telephone numbers.
          </p>

          {/* desktop image */}
          <div className="relative mt-6 hidden h-[324px] w-[472px] overflow-hidden rounded-[32px] border-2 border-black lg:block">
            <img
              src="/img/House.png"
              alt="Peterborough Heritage Collegiate Row"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/70 px-3 py-1.5 text-[11px] text-white">
              Peterborough Heritage Collegiate Row &bull; Near Symons Line 2
            </div>
          </div>
        </div>

        {/* right column: desktop cards */}
        <div className="hidden flex-col gap-5 lg:flex">

          {/* listing card */}
          <div className="rounded-2xl border border-[2px] bg-[#fdfcf3] p-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                ✓ Video Tour On-File
              </span>
              <p className="text-lg font-semibold">
                $825 CAD <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>

            <h3 className="mt-4 font-serif text-xl">George Street North Residence</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
              Sunlit corner room adjacent to Traill College. Full continuous
              video walkthrough captured October 2024 showing water
              pressure, window seals, and common spaces.
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[13px]">
              <span className="text-gray-600">Available for Winter Term</span>
              <a href="#" className="flex items-center gap-1 font-medium">
                Request live tour
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* shielded comms card */}
          <div className="rounded-2xl border border-[2px] bg-[#fdfcf3] p-6">
            <div className="flex items-center gap-2">
              <img src="/img/PrivacyCheck.png" alt="" />
              <h3 className="text-[15px] font-semibold">Shielded Student Communication</h3>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
              Arrange virtual meetups, clarify house guidelines, and exchange
              Ontario Standard Lease PDFs securely inside the platform
              without revealing personal WhatsApp or cellular numbers.
            </p>
          </div>

        </div>

        {/* right column: mobile cards */}
        <div className="mt-6 flex flex-col gap-4 lg:hidden">

          {mobileListings.map((item) => (
            <div
              key={item.title}
              className="rounded-[32px] border-2 border-black bg-[#fffff0] p-5"
            >
              {item.label && (
                <p className="mb-6 text-xs font-semibold uppercase text-[#006b62]">
                  {item.label}
                </p>
              )}

              <div className="relative h-[234px] overflow-hidden rounded-2xl border-2 border-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 rounded-lg border border-black/20 bg-[#fffff0] px-3 py-2 text-xs">
                  {item.caption}
                </span>
              </div>

              <div className="mt-5 flex items-start gap-2">
                <h3 className="flex-1 font-serif text-[22px] font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="shrink-0 leading-tight">
                  <span className="text-[22px] font-bold text-[#006b62]">{item.price}</span>{" "}
                  <span className="text-xs text-gray-600">CAD</span>
                  <br />
                  <span className="text-xs text-gray-600">/mo</span>
                </p>
              </div>

              <p className="mt-3 text-[13px] leading-snug text-gray-600">{item.blurb}</p>

              {item.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border-2 border-black bg-[#e8e8d5] px-3 py-1 text-[13px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-black text-[15px]">
                {item.cta}
                {item.arrow && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default RoomFinderSection;