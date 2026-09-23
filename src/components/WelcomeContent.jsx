const features = [
  {
    icon: "/img/Find Housing.png",
    thumb: "/img/FindHouse.jpg",
    title: "Find Housing",
    tag: "Symons & Downtown",
    body: "Rooms, apartments, and seasonal sublets near Symons and downtown Peterborough.",
    mobileBody: "Rooms, apartments, and sublets.",
    mobileTag: "100% Lease-checked",
    mobileTagColor: "#034F46",
  },
  {
    icon: "/img/Get Essentials.png",
    thumb: "/img/Essentials.jpg",
    title: "Get Essentials",
    tag: "Peer Marketplace",
    body: "Textbooks, furniture, electronics, and durable Canadian winter gear.",
    mobileBody: "Textbooks, furniture, electronics, and durable Canadian winter gear.",
    mobileTag: "Campus handoffs",
    mobileTagColor: "#B7791F",
  },
  {
    icon: "/img/Connect.png",
    thumb: "/img/ConnectMobile.jpg",
    title: "Connect",
    tag: "Authenticated Circle",
    body: "Message verified members of the Trent community privately without spam or broker markups.",
    mobileBody: "Message verified members of the Trent community privately without spam or broker markups.",
    mobileTag: "Verified student ID",
    mobileTagColor: "#034F46",
  },
];

// Clipped corners only apply at md and up
const CORNER_CLIP =
  "md:[clip-path:polygon(16px_0,calc(100%_-_16px)_0,100%_16px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,16px_100%,0_calc(100%_-_16px),0_16px)]";

export default function WelcomeContent() {
  return (
    <div className="md:mx-8 md:my-12 md:drop-shadow-xl">
      <div
        className={`grid grid-cols-1 overflow-hidden bg-[#FFFFF8] md:grid-cols-[3fr_2fr] md:divide-x-2 md:border-2 ${CORNER_CLIP}`}
      >
        {/* Left column */}
        <div className="flex flex-col gap-6 px-4 py-6 md:p-10">
          <div className="flex items-center justify-center gap-2">
            <img src="/img/Logo.png" alt="" />
            <span className="font-serif text-lg text-neutral-900">
              Trent<span className="font-bold text-[#0E6B5C]">Trust</span>
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-2xl capitalize text-neutral-900 md:text-4xl md:normal-case">
              Welcome to TrentTrust
            </h1>
            <p className="mx-auto mt-3 text-[13px] text-[#8A8A80] md:text-lg">
              Find housing, student essentials, and connections
              <br />
              before and after you arrive.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {features.map((f) => (
              <div key={f.title}>
                {/* MOBILE card */}
                <div className="flex items-center gap-3 rounded-[10px] bg-[#E4E4D0] p-2.5 md:hidden">
                  <img
                    src={f.thumb}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-[8px] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-serif text-base text-neutral-900">{f.title}</p>
                      <img src="/img/Textarrow.png" alt="" />
                    </div>
                    <p className="truncate text-xs text-neutral-600">{f.mobileBody}</p>
                    <p
                      className="mt-1 flex items-center gap-1 text-[10px]"
                      style={{ color: f.mobileTagColor }}
                    >
                      <span>●</span> {f.mobileTag}
                    </p>
                  </div>
                </div>

                {/* DESKTOP card (unchanged) */}
                <div className="hidden h-24 w-172 rounded-[12px] bg-[#E4E4D0] p-4 shadow-sm md:block">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">
                      <img src={f.icon} alt="" />
                    </div>
                    <div>
                      <p className="text-lg text-neutral-900">
                        <span className="font-semibold">{f.title}</span>{" "}
                        <span className="text-sm text-[#8A8A80]">· {f.tag}</span>
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">{f.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#E4D3F5] px-4 py-2.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-80 md:rounded-[12px] md:border-2 md:text-lg md:shadow-sm">
              Create Account <img src="/img/Rightarrow.png" alt="" />
            </button>
            <button className="flex-1 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 md:rounded-[12px] md:border-2 md:bg-[#FFFFF8] md:text-lg md:shadow-sm">
              I already have an account
            </button>
          </div>

          <div className="mt-6 rounded-[12px] bg-[#F5F5E8] p-4 md:mt-0 md:border md:border-dashed md:border-[#8A8A80] md:bg-[#FFFFF8]">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-serif text-base text-neutral-900 md:font-sans md:text-lg md:font-semibold">
                <img src="/img/Lightbulb.png" alt="" className="h-6 w-6 md:hidden" />
                <img src="/img/Grad Cap.png" alt="" className="hidden h-6 w-6 md:block" />
                New to Trent?
              </p>
              <span className="hidden rounded-sm bg-[#e6edde] px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-[#034F46] md:inline">
                Admissions Pathway
              </span>
            </div>
            <p className="mt-2 pl-8 text-[11px] text-neutral-600 md:text-sm">
              You can get started even if you don't have your Trent email or student ID yet.
              Newly admitted students can verify using their official admission letter.
            </p>
          </div>
        </div>

        {/* Right column: desktop only */}
        <div className="hidden flex-col gap-4 p-10 md:flex">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E4E4D0] pb-3">
            <p className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <img src="/img/LIVECAMPUSBOARD.png" alt="" className="h-4 w-4" /> LIVE CAMPUS BOARD
            </p>
            <span className="text-xs text-[#8A8A80]">Peterborough, ON</span>
          </div>

          {/* Housing listing card */}
          <div className="mt-24 overflow-hidden rounded-[12px] border-2 shadow-md">
            <div className="relative aspect-[407.67/176] w-full overflow-hidden bg-neutral-200">
              <img
                src="/img/bedroom.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-xl border border-black bg-[#034F46] px-2 py-1 text-xs text-white">
                <img src="/img/Check.png" alt="" className="h-3 w-3" /> Verified Trent Student
              </span>
              <span className="absolute bottom-2 right-2 rounded-[8px] bg-black/70 px-2 py-1 text-xs font-medium text-white">
                $850 / month
              </span>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <p className="flex items-center gap-1 text-xs font-medium text-[#034F46]">
                <img src="/img/Bus.png" alt="" /> 8-min direct bus to Symons Campus
              </p>
              <p className="max-w-85 font-serif text-xl text-neutral-900">
                Sunlit Upper Room in Quiet Student Home
              </p>
              <p className="text-sm text-[#8A8A80]">Lease: May – Aug 2025 · Water & Wifi Included</p>
            </div>
          </div>

          {/* Marketplace item card */}
          <div className="ml-6 flex rotate-1 items-center gap-3 rounded-[12px] border-2 p-3 shadow-sm">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-neutral-200">
              <img
                src="/img/COIS 1010.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-sm bg-[#F0D7FF] px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-neutral-900">
                  COIS 1010
                </span>
                <p className="whitespace-nowrap text-xl font-bold text-neutral-900">$45 CAD</p>
              </div>
              <p className="mt-1 font-serif text-neutral-900">Foundations of Computing</p>
              <p className="mt-1 text-xs text-[#8A8A80]">
                <span className="text-[#034F46]">●</span> Sold by Marcus L. (3rd Yr CS)
              </p>
            </div>
          </div>

          {/* Winter gear pill */}
          <button className="flex items-center justify-center gap-2 self-start rounded-full border-2 bg-[#F0D7FF] px-3 py-1.5 text-sm font-medium text-neutral-900 shadow-sm transition-opacity hover:opacity-70">
            <img src="/img/Snowflake.png" alt="" /> Canadian Winter Ready Gear Available
            <img src="/img/ExternalLink.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}