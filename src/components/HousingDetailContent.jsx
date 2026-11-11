import { useState } from "react";
import { Link } from "react-router-dom";

// mobile uses the sans font, desktop (sm and up) uses the serif one
const fontClass =
  "[font-family:'Plus_Jakarta_Sans',system-ui,sans-serif] sm:[font-family:'EB_Garamond',Georgia,serif]";

// ---- Page data ----
// rename the photos to match your files in public/img
const photos = [
  "/img/Listing Room.jpg",
  "/img/Housing Kitchen.jpg",
  "/img/Housing Bathroom.jpg",
  "/img/Housing Living Room.jpg",
  "/img/Housing Exterior.jpg",
];

const chips = ["Private room", "Furnished", "Available Sept 1, 2024", "12-month lease"];
const mobileChips = ["Private room", "Furnished", "Available Sept 1"];

const leaseTiles = [
  { label: "Monthly rent", value: "$850 CAD", sub: "All-inclusive", green: true },
  { label: "Move-in date", value: "Sept 1, 2024", sub: "Fall Academic Term" },
  { label: "Lease type", value: "12 Months", sub: "Student tenancy" },
  { label: "Required deposit", value: "1st & Last", sub: "Standard Ontario RTA" },
];

const mobileLease = [
  { label: "Monthly Rent", value: "$850 / mo" },
  { label: "Move-in date", value: "Sept 1, 2025" },
  { label: "Lease term", value: "12 Months" },
  { label: "Deposit", value: "First & last" },
];

const trust = [
  { ok: true, text: "Trent community verified (Authenticated via Trent NetID)" },
  { ok: true, text: "Profile information provided by authenticated student" },
  { ok: false, text: "Property ownership not verified by TrentTrust" },
  { ok: false, text: "Financial transactions are not processed or guaranteed" },
];

const mobileTrust = [
  { ok: true, text: "Trent community verified", status: "Active student ID" },
  { ok: true, text: "Profile information provided", status: "Confirmed" },
  { ok: false, text: "Property ownership not verified", status: "Sublet listing" },
  { ok: false, text: "Transaction not verified", status: "Off-platform lease" },
];

// ---- Icons ----
const Icon = ({ className = "h-4 w-4", children }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const ArrowLeft = (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>;
const ArrowRight = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const Info = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></Icon>;
const Clock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const Flag = (p) => <Icon {...p}><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></Icon>;
const CheckCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></Icon>;
const EmptyCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /></Icon>;
const Shield = (p) => <Icon {...p}><path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6z" /></Icon>;
const Warning = (p) => <Icon {...p}><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17v.5" /></Icon>;
const Target = (p) => <Icon {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill="currentColor" /></Icon>;


// icons from img folder (no default size, so they show at their natural size)
const Pic = ({ name, className = "" }) => (
  <img src={`/img/${name}.png`} alt="" className={`shrink-0 object-contain ${className}`} />
);

// ---- Lists that have icons ----
const utilities = [
  { icon: <Pic name="Heating & Gas" />, label: "Heating & Gas" },
  { icon: <Pic name="Water & Sewage" />, label: "Water & Sewage" },
  { icon: <Pic name="WiFi" />, label: "High-Speed WiFi (1 Gbps)" },
  { icon: <Pic name="Electricity" />, label: "Electricity / Hydro" },
];

const mobileUtilities = [
  { icon: <Pic name="Heating & Gas" />, label: "Heat" },
  { icon: <Pic name="Water & Sewage" />, label: "Water" },
  { icon: <Pic name="WiFi" />, label: "High-speed WiFi" },
  { icon: <Pic name="Electricity" />, label: "Hydro / Electric" },
];

const transit = [
  { icon: <Pic name="Green Cap" className="h-5 w-10" />, title: "Campus Proximity", text: "1.8 km to Trent Symons Campus. 7-minute cycle along the river trail." },
  { icon: <Pic name="Coastal Bus" className="h-5 w-10" />, title: "Transit Direct Route", text: "Route 7 stop is a 3-minute walk; departs every 15 min direct to Bata Library terminal." },
  { icon: <Pic name="Tree" className="h-5 w-10" />, title: "Riverview Park & Zoo", text: "5-minute walk to green spaces, walking paths, and Otonabee River access." },
  { icon: <Pic name="Local Convenience" className="h-5 w-10" />, title: "Local Convenience", text: "Pharmacy, local grocery, and coffee shop located within an 8-minute walk." },
];

const mobileTransit = [
  { icon: <Pic name="Green Cap" />, label: "Symons Campus", meta: "1.8 km (5 min drive)" },
  { icon: <Pic name="Coastal Bus" />, label: "Route 7 Trent Bus Stop", meta: "3 min walk" },
  { icon: <Pic name="Otonabee" />, label: "Otonabee River Rotary Trail", meta: "4 min bike" },
];

const amenities = [
  { icon: <Pic name="Washing Machine" />, text: "In-suite laundry (free, non-coin operated)" },
  { icon: <Pic name="Unlimited" />, text: "Unlimited Gigabit WiFi (1000 Mbps)" },
  { icon: <Pic name="bed" />, text: "Furnished bedroom (desk, chair, double bed)" },
  { icon: <Pic name="Sink" />, text: "Shared fully-equipped modern kitchen & dishwasher" },
  { icon: <Pic name="Frost" />, text: "Central air conditioning & climate control" },
  { icon: <Pic name="Motorcycle" />, text: "Secure indoor bike storage in locked garage" },
  { icon: <Pic name="Car" />, text: "Driveway parking space available (+$40/mo)" },
  { icon: <Pic name="Plant" />, text: "Backyard patio with study seating & BBQ" },
];

const mobileAmenities = [
  { icon: <Pic name="Washing Machine" />, text: "In-suite laundry" },
  { icon: <Pic name="Sofa" />, text: "Fully furnished" },
  { icon: <Pic name="Car" />, text: "1 parking space" },
  { icon: <Pic name="Private Lock" />, text: "Private bedroom lock" },
  { icon: <Pic name="Kitchen Access" />, text: "Full kitchen access" },
  { icon: <Pic name="Plant" />, text: "Backyard patio" },
];

const guidelines = [
  { icon: <Pic name="Mute" />, text: "Quiet hours after 10:00 PM" },
  { icon: <Pic name="Green Cap" />, text: "Trent students preferred" },
  { icon: <Pic name="Cigarette" />, text: "No indoor smoking or vaping" },
  { icon: <Pic name="Paw" />, text: "No pets (severe resident allergies)" },
  { icon: <Pic name="Chore Rotation" />, text: "Shared weekly chore rotation" },
];

const mobilePrefs = [
  { icon: <Pic name="Moon" />, text: "Quiet hours observed on weeknights after 10:00 PM" },
  { icon: <Pic name="Cigarette" />, text: "Strictly non-smoking / non-vaping indoor policy" },
  { icon: <Pic name="Green Cap" />, text: "Upper-year or postgraduate Trent students preferred" },
  { icon: <Pic name="Paw" />, text: "No pets allowed due to housemate allergies" },
];

const card = "rounded-2xl bg-white p-4 sm:p-8";
const tile = "rounded-xl bg-[#f5f2f0]";
const guidelineChip = "flex items-center gap-2 rounded-md bg-[#f5f2f0] px-3 py-1.5 text-[14px] leading-tight";
const h2 = "text-[26px] font-bold sm:text-[22px]";

export default function HousingDetailContent({ onMessage = () => {}, onReport = () => {} }) {
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState(0); // mobile photo

  return (
    <div className={`bg-[#fdf9f6] text-neutral-900 ${fontClass}`}>
      <main className="mx-auto max-w-[1152px] px-4 pb-10 pt-4 sm:px-8 sm:pb-4 sm:pt-8 lg:px-0">
        {/* Mobile top row: back + share + save */}
        <div className="flex items-center justify-between sm:hidden">
          <Link to="/browse-housing" className="flex items-center gap-2 text-[17px] font-medium text-[#02503f]">
            <ArrowLeft className="h-4 w-4" /> Back to housing
          </Link>
          <div className="flex gap-3">
            <button aria-label="Share listing" className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-[#f0eded]">
              <img src="/img/Share.png" alt="" />
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              aria-label="Save listing"
              aria-pressed={saved}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-[#f0eded]"  
            >
              <img src="/img/Bigger Save.png" alt="" />
            </button>
          </div>
        </div>

        {/* Breadcrumb (desktop) */}
        <div className="hidden flex-wrap items-center justify-between gap-3 text-[15px] sm:flex">
          <nav className="flex flex-wrap items-center gap-x-2 text-neutral-500">
            <Link to="/browse-housing" className="hover:text-neutral-900">Housing</Link>
            <span>/</span>
            <span>Peterborough</span>
            <span>/</span>
            <span className="text-neutral-900">Listing #TR-8492</span>
          </nav>
          <Link to="/browse-housing" className="flex items-center gap-1.5 text-[14px] text-[#02503f]">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to listings
          </Link>
        </div>

        {/* Gallery (mobile): big photo + thumbnails */}
        <div className="mt-4 sm:hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <img src={photos[active]} alt="Room photo" className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[14px] text-white">
              <img src="/img/Camera 2.png" alt="" /> {active + 1} / {photos.length}
            </span>
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[15px] font-bold">
              <img src="/img/Verified Badge.png" alt="" /> Trent Student Sublet
            </span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`overflow-hidden rounded-md ${i === active ? "ring-2 ring-[#02503f]" : ""}`}
              >
                <img src={src} alt="" className="h-12 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Gallery (desktop) */}
        <div className="mt-5 hidden gap-2 overflow-hidden rounded-2xl sm:grid sm:h-[460px] sm:grid-cols-4 sm:grid-rows-2">
          <div className="relative sm:col-span-2 sm:row-span-2">
            <img src={photos[0]} alt="Bedroom" className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-[#02503f]">
              <CheckCircle className="h-3.5 w-3.5" /> Student listing
            </span>
          </div>
          {photos.slice(1).map((src, i) => (
            <div key={src} className="relative">
              <img src={src} alt="" className="h-full w-full object-cover" />
              {i === 3 && (
                <button className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-[14px]">
                  <Pic name="Photos" className="h-4 w-4" /> View all 5 photos
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_368px] lg:items-start lg:gap-6">
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="contents lg:block lg:space-y-6">
            {/* Title */}
            <section className={`${card} order-1 lg:order-none`}>
              {/* chips (desktop) */}
              <div className="hidden flex-wrap gap-2 sm:flex">
                {chips.map((c) => (
                  <span key={c} className="rounded-full bg-[#f1eeec] px-3 py-1 text-[12.5px]">{c}</span>
                ))}
              </div>

              {/* price + utilities pill (mobile) */}
              <div className="flex items-center justify-between gap-3 sm:hidden">
                <p className="flex items-baseline gap-2">
                  <span className="text-[30px] font-bold leading-none">$850</span>
                  <span className="text-[17px] text-neutral-500">/ month</span>
                </p>
                <span className="flex items-center gap-1.5 rounded-full bg-[#aaf0d9] px-3 py-1.5 text-[14px] font-bold text-[#02503f]">
                  <CheckCircle className="h-4 w-4" /> Utilities included
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mt-5">
                <h1 className="text-[26px] font-bold leading-tight sm:text-[34px]">Bright private room near campus</h1>
                <p className="hidden items-baseline gap-1.5 sm:flex">
                  <span className="text-[34px] font-bold text-[#02503f]">$850</span>
                  <span className="text-[14px] text-neutral-500">/ month</span>
                </p>
              </div>

              {/* chips (mobile) */}
              <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
                {mobileChips.map((c) => (
                  <span key={c} className="rounded-full bg-[#f1eeec] px-3.5 py-1.5 text-[14px]">{c}</span>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-2 text-[17px] leading-snug sm:mt-5 sm:text-[16px]">
                <Pic name="Green Location Pin" className="mt-1" />
                <span className="sm:hidden">Peterborough, West Bank (near campus) • 12 min by transit</span>
                <span className="hidden sm:inline">Peterborough (West Bank area), near campus · 12 min by transit (Direct Route 7 bus)</span>
              </p>

              {/* address note (mobile) */}
              <p className="mt-3 flex items-start gap-3 rounded-xl bg-[#f1eeec] p-3.5 text-[15px] leading-snug text-neutral-600 sm:hidden">
                <Pic name="Green Padlock" className="mt-0.5" />
                Exact street address is shielded and only provided once viewing details are verified through TrentTrust.
              </p>
              {/* address note (desktop) */}
              <p className="mt-2 hidden items-start gap-2 pl-6 text-[12.5px] text-neutral-500 sm:flex">
                <Info className="mt-0.5 h-3.5 w-3.5" />
                Approximate location only — exact address provided upon verified viewing arrangement.
              </p>
            </section>

            {/* Lease & Availability */}
            <section className={`${card} order-4 lg:order-none`}>
              <h2 className={h2}>
                <span className="sm:hidden">Lease &amp; availability</span>
                <span className="hidden sm:inline">Lease &amp; Availability</span>
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
                {mobileLease.map((t) => (
                  <div key={t.label} className={`${tile} p-3.5`}>
                    <p className="text-[14px] text-neutral-500">{t.label}</p>
                    <p className="mt-1 text-[21px] font-bold leading-tight">{t.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
                {leaseTiles.map((t) => (
                  <div key={t.label} className={`${tile} p-4`}>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-neutral-500">{t.label}</p>
                    <p className="mt-1.5 text-[22px] font-bold leading-tight">{t.value}</p>
                    <p className={`mt-1 text-[13px] ${t.green ? "text-[#02503f]" : "text-neutral-500"}`}>{t.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section className={`${card} order-3 lg:order-none`}>
              <h2 className={h2}>About this place</h2>
              {/* mobile text */}
              <div className="mt-4 space-y-4 sm:hidden">
                <p className="text-[18px] leading-relaxed">
                  Quiet, south-facing second-floor room in a clean, non-smoking 4-bedroom student house. Filled with direct natural light throughout the day, complete with a study desk, supportive chair, double bed frame with clean mattress, and full built-in double closet.
                </p>
                <p className="text-[15px] leading-relaxed text-neutral-600">
                  You will be sharing kitchen and laundry facilities with three friendly, upper-year Trent peers (biology and business). The household keeps a cooperative cleaning schedule and respects quiet hours for studying and exams.
                </p>
              </div>
              {/* desktop text */}
              <div className="mt-4 hidden space-y-4 text-[17px] leading-relaxed text-neutral-800 sm:block">
                <p>
                  Looking for a respectful, quiet Trent student to join our home starting September 1st. This sunny, south-facing room is situated on the second floor of a well-maintained 4-bedroom detached house in the peaceful West Bank neighborhood.
                </p>
                <p>
                  The bedroom comes furnished with a solid wooden desk and ergonomic chair, double mattress and frame, and a generous closet. You will share a modern, updated kitchen and clean common areas with three upper-year Trent undergraduate students (two in Environmental Studies, one in Biology).
                </p>
                <p>
                  Our household maintains a calm, focused atmosphere during the academic year with agreed-upon quiet hours for studying and exams. Shared responsibilities are kept tidy through a lightweight weekly chore rotation.
                </p>
              </div>
            </section>

            {/* Utilities */}
            <section className={`${card} order-5 lg:order-none`}>
              {/* mobile */}
              <div className="sm:hidden">
                <h2 className={h2}>Utilities included</h2>
                <p className="mt-2 text-[16px] leading-snug text-neutral-600">
                  Zero surprise monthly utility bills. All essentials are covered in the monthly rate.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {mobileUtilities.map((u) => (
                    <div key={u.label} className={`${tile} flex items-center gap-3 px-3.5 py-3`}>
                      {u.icon}
                      <div>
                        <p className="text-[15px] font-medium leading-tight">{u.label}</p>
                        <p className="mt-0.5 text-[14px] text-[#02503f]">Included</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* desktop */}
              <div className="hidden sm:block">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className={h2}>Utilities Breakdown</h2>
                  <span className="rounded-full bg-[#e3efe9] px-3 py-1 text-[12px] font-bold text-[#02503f]">Included in rent</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {utilities.map((u) => (
                    <div key={u.label} className={`${tile} flex items-center justify-between gap-3 px-4 py-3.5`}>
                      <span className="flex items-center gap-3 text-[16px]">{u.icon}{u.label}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-[#02503f]">
                        <CheckCircle className="h-3.5 w-3.5" /> Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Location & Transit */}
            <section className={`${card} order-6 lg:order-none`}>
              {/* mobile */}
              <div className="sm:hidden">
                <h2 className={h2}>Location &amp; transit</h2>
                <p className="mt-2 text-[16px] leading-snug text-neutral-600">
                  Convenient West Bank location with fast direct transit to Symons Campus.
                </p>
                <div className="relative mt-4 h-[180px] overflow-hidden rounded-xl bg-[#b4cdbd]">
                  <img src="/img/Housing Map.png" alt="Map of the West Bank area" className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#3f4642] px-4 py-2 text-[14px] text-white">
                    <img src="/img/Navigate.png" alt="" /> General neighborhood boundary
                  </span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {mobileTransit.map((t) => (
                    <div key={t.label} className={`${tile} flex items-center justify-between gap-3 px-3.5 py-3`}>
                      <span className="flex items-center gap-3 text-[16px]">{t.icon}{t.label}</span>
                      <span className="shrink-0 text-[14px] text-neutral-600">{t.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* desktop */}
              <div className="hidden sm:block">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className={h2}>Location &amp; Transit Access</h2>
                  <span className="text-[13px] text-neutral-500">West Bank / University Heights</span>
                </div>
                <div className="relative mt-5 h-[224px] overflow-hidden rounded-xl bg-[#b4cdbd]">
                  <img src="/img/Housing Map.png" alt="Map of the West Bank area" className="h-full w-full object-cover" />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-[#02503f] px-4 py-2 text-[13px] text-white">
                    <Target className="h-4 w-4" /> Approximate Area Radius (~300m)
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {transit.map((t) => (
                    <div key={t.title} className={`${tile} flex gap-3 p-4`}>
                      <span className="mt-0.5">{t.icon}</span>
                      <div>
                        <h3 className="text-[15px] font-bold">{t.title}</h3>
                        <p className="mt-1 text-[15px] leading-snug text-neutral-700">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className={`${card} order-7 lg:order-none`}>
              <h2 className={h2}>
                <span className="sm:hidden">Amenities &amp; features</span>
                <span className="hidden sm:inline">Amenities &amp; Inclusions</span>
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:hidden">
                {mobileAmenities.map((a) => (
                  <li key={a.text} className="flex items-center gap-3 text-[16px] leading-snug">
                    {a.icon}
                    {a.text}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 hidden gap-x-8 gap-y-3.5 sm:grid sm:grid-cols-2">
                {amenities.map((a) => (
                  <li key={a.text} className="flex items-center gap-3 text-[15px]">
                    {a.icon}
                    {a.text}
                  </li>
                ))}
              </ul>
            </section>

            {/* House guidelines */}
            <section className={`${card} order-8 lg:order-none`}>
              <h2 className={h2}>
                <span className="sm:hidden">House preferences</span>
                <span className="hidden sm:inline">House Guidelines &amp; Compatibility</span>
              </h2>
              {/* mobile list */}
              <ul className="mt-4 space-y-3.5 sm:hidden">
                {mobilePrefs.map((g) => (
                  <li key={g.text} className="flex items-start gap-3 text-[17px] leading-snug">
                    {g.icon}
                    {g.text}
                  </li>
                ))}
              </ul>
              {/* desktop chips: first 3 on one row, last 2 on the next, like the design */}
              <div className="hidden sm:block">
                <div className="mt-4 flex flex-wrap gap-3">
                  {guidelines.slice(0, 3).map((g) => (
                    <span key={g.text} className={guidelineChip}>
                      {g.icon}
                      {g.text}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {guidelines.slice(3).map((g) => (
                    <span key={g.text} className={guidelineChip}>
                      {g.icon}
                      {g.text}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <aside className="contents lg:block lg:space-y-6">
            {/* Price + actions */}
            <section className="order-2 rounded-2xl bg-white p-4 sm:p-6 lg:order-none">
              {/* price (desktop) */}
              <div className="hidden items-start justify-between gap-3 sm:flex">
                <p className="flex items-baseline gap-1.5">
                  <span className="text-[36px] font-bold leading-none">$850</span>
                  <span className="text-[14px] text-neutral-500">/ mo</span>
                </p>
                <span className="rounded-full bg-[#e3efe9] px-3 py-1 text-[12px] font-bold text-[#02503f]">Utilities included</span>
              </div>
              <button
                onClick={onMessage}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#F0D7FF] text-[20px] font-bold transition hover:brightness-95 sm:mt-5 sm:h-12 sm:gap-2 sm:text-[15px]"
              >
                <img src="/img/Message.png" alt="" className="sm:hidden" />
                <img src="/img/Messages.png" alt="" className="hidden sm:block" />
                Message about this listing
              </button>
              {/* save + report (mobile) */}
              <div className="mt-4 flex items-center justify-between px-1 sm:hidden">
                <button
                  onClick={() => setSaved((s) => !s)}
                  aria-pressed={saved}
                  className="flex items-center gap-2 text-[16px]"
                >
                  <img src="/img/Saveless.png" alt="" />
                  {saved ? "Saved" : "Save listing"}
                </button>
                <button onClick={onReport} className="flex items-center gap-2 text-[16px] text-[#c0392b]">
                  <img src="/img/Red Flag.png" alt="" />
                  Report listing
                </button>
              </div>
              {/* save + report (desktop) */}
              <div className="mt-3 hidden grid-cols-2 gap-3 sm:grid">
                <button
                  onClick={() => setSaved((s) => !s)}
                  aria-pressed={saved}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#f1eeec] text-[14px]"
                >
                  <img src="/img/Save.png" alt=""  />
                  {saved ? "Saved" : "Save listing"}
                </button>
                <button
                  onClick={onReport}
                  className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#f1eeec] text-[14px]"
                >
                  <Flag className="h-4 w-4" /> Report listing
                </button>
              </div>
              <p className="mt-5 hidden items-center gap-2 border-t border-neutral-200 pt-4 text-[13px] text-neutral-500 sm:flex">
                <Clock className="h-4 w-4 text-[#02503f]" /> Alex typically replies within 2 hours
              </p>
            </section>

            {/* Seller */}
            <section className="order-9 rounded-2xl bg-white p-4 sm:p-6 lg:order-none">
              {/* header (mobile) */}
              <div className="flex items-center gap-4 sm:hidden">
                <img src="/img/Alex.jpg" alt="Alex M." className="h-14 w-14 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <h3 className="text-[26px] font-bold leading-tight">Alex M.</h3>
                  <p className="text-[17px] text-neutral-600">3rd Year Environmental Science</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#e3efe9] px-3 py-1.5 text-[14px] font-bold text-[#02503f]">
                    <img src="/img/Double Check.png" alt="" /> 
                      <span>
                      <img src="/img/Double Check.png" alt="" />
                      </span> Verified Trent member
                  </span>
                </div>
              </div>
              {/* header (desktop) */}
              <div className="hidden items-center gap-4 sm:flex">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a6ead8] text-[20px] font-bold text-[#02503f]">AM</span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight">Alex M.</h3>
                  <p className="text-[12.5px] text-neutral-500">Trent Undergraduate Student</p>
                </div>
              </div>
              <span className="mt-4 hidden items-center gap-1.5 rounded-full bg-[#e3efe9] px-3 py-1.5 text-[12px] font-bold text-[#02503f] sm:inline-flex">
                <CheckCircle className="h-3.5 w-3.5" /> Verified Trent member
              </span>
              <ul className="mt-4 hidden space-y-2.5 text-[15px] sm:block">
                <li className="flex items-center gap-3"><Pic name="Grey Cap" /> B.Sc. Environmental Science, 3rd Year</li>
                <li className="flex items-center gap-3"><img src="/img/Whale.png" alt="" className="shrink-0" /> TrentTrust member since Fall 2022</li>
              </ul>
              {/* privacy note (mobile) */}
              <p className="mt-4 flex items-start gap-3 rounded-xl bg-[#f1eeec] p-3.5 text-[14px] leading-snug text-neutral-600 sm:hidden">
                <img src="/img/Grey Shield.png" alt="" className="mt-0.5" />
                Protected student communication. Phone numbers, student ID numbers, and personal email addresses remain shielded within the TrentTrust platform.
              </p>
              {/* privacy note (desktop) */}
              <p className="mt-4 hidden items-start gap-2.5 rounded-lg bg-[#f1eeec] p-3 text-[12.5px] leading-snug text-neutral-500 sm:flex">
                <Pic name="Padlock" />
                Student privacy protected. Personal email, student ID, and direct phone number are never made public.
              </p>
              <button onClick={onMessage} className="mx-auto mt-4 hidden items-center gap-2 text-[14px] font-bold text-[#02503f] sm:flex">
                <Pic name="Green Letter" /> Message Alex
              </button>
            </section>

            {/* Trust details */}
            <section className="order-10 rounded-2xl bg-white p-4 sm:p-6 lg:order-none">
              {/* mobile */}
              <div className="sm:hidden">
                <h3 className={h2}>Trust details</h3>
                <p className="mt-2 text-[16px] leading-snug text-neutral-600">
                  Factual transparency based on verified institutional accounts and platform safety audits.
                </p>
                <ul className="mt-4 space-y-2.5">
                  {mobileTrust.map((t) => (
                    <li key={t.text} className={`${tile} flex items-center justify-between gap-3 px-3.5 py-3`}>
                      <span className="flex items-center gap-3 text-[15px]">
                        {t.ok ? (
                          <CheckCircle className="h-5 w-5 text-[#02503f]" />
                        ) : (
                          <EmptyCircle className="h-5 w-5 text-neutral-400" />
                        )}
                        {t.text}
                      </span>
                      <span className={`shrink-0 text-[13px] ${t.ok ? "font-bold text-[#02503f]" : "text-neutral-600"}`}>{t.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* desktop */}
              <div className="hidden sm:block">
                <h3 className="flex items-center gap-2.5 text-[20px] font-bold">
                  <Shield className="h-5 w-5 text-[#02503f]" /> Trust details
                </h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-snug">
                  {trust.map((t) => (
                    <li key={t.text} className={`flex items-start gap-3 ${t.ok ? "" : "text-neutral-500"}`}>
                      {t.ok ? (
                        <CheckCircle className="mt-0.5 h-4 w-4 text-[#02503f]" />
                      ) : (
                        <EmptyCircle className="mt-0.5 h-4 w-4 text-neutral-400" />
                      )}
                      {t.text}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-neutral-200 pt-3 text-[12.5px] leading-snug text-neutral-500">
                  TrentTrust verifies university community identity, not physical lease contracts or landlord property titles.
                </p>
              </div>
            </section>

            {/* Before you send money */}
            <section className="order-11 rounded-2xl bg-[#fdeee3] p-4 sm:bg-white sm:p-6 lg:order-none">
              <h3 className="flex items-center gap-2.5 text-[24px] font-bold text-[#8a5200] sm:text-[20px] sm:text-neutral-900">
                <Warning className="h-5 w-5 text-[#8a5200]" /> Before you send money
              </h3>
              <p className="mt-3 text-[17px] leading-snug text-neutral-800 sm:text-[15px] sm:text-neutral-700">
                <span className="sm:hidden">
                  Verify the property in-person, review the standard lease terms, and meet the person you are dealing with before making any deposit or e-transfer.
                </span>
                <span className="hidden sm:inline">
                  Verify the property, lease terms, and person you are dealing with before making any payment. Always schedule an in-person or live video tour of the actual room.
                </span>
              </p>
              <p className="mt-3 rounded-xl bg-white px-3 py-3 text-[14px] font-medium leading-snug sm:rounded-lg sm:bg-[#fff1e3] sm:px-3 sm:py-2.5 sm:text-[12.5px] sm:font-normal sm:text-[#8a5200]">
                <span className="sm:hidden">TrentTrust does not process deposits, hold escrow, or guarantee rental transactions.</span>
                <span className="hidden sm:inline">TrentTrust does not process deposits, hold funds in escrow, or guarantee rental transactions.</span>
              </p>
              <a href="#safety" className="mt-4 flex items-center gap-1.5 text-[16px] font-bold text-[#02503f] sm:text-[14px] sm:text-[#8a5200]">
                <span className="sm:hidden">Read student safety tips</span>
                <span className="hidden sm:inline">Read student housing safety tips</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </section>
          </aside>
        </div>
      </main>

      {/* Footer (not on mobile) */}
      <footer className="mt-16 hidden border-t border-[#ece3d8] sm:block">
        <div className="mx-auto flex max-w-[1152px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-[14px] text-neutral-600 sm:px-8 lg:px-0">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {["Safety", "Reporting", "Privacy", "Terms", "Help"].map((l) => (
              <a key={l} href="#" className="hover:text-neutral-900">{l}</a>
            ))}
          </nav>
          <p className="flex items-center gap-2 text-[12.5px]">
            <Pic name="Green Padlock" />
            Trent Institutional Verification · Official Student Directory Protocol
          </p>
        </div>
      </footer>
    </div>
  );
}