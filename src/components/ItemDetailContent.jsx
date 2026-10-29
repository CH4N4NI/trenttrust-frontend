import { useState } from "react";
import { Link } from "react-router-dom";

const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

// ---- Page data ----
const item = {
  title: "COIS 1010 Textbook — 4th ed.",
  price: 40,
  originalPrice: 128,
  listedAgo: "Listed 4h ago",
  views: 46,
  tags: ["Like new", "Textbooks", "COIS 1010"],
  seller: {
    initials: "DK",
    name: "Daniel K.",
    program: "B.Sc. Computer Science ’25",
    college: "Champlain College",
    reply: "Replies ~30m",
  },
  meetup: "East City — public meetup spot",
  meetupAlt: "(or Bata Library foyer weekdays 10am–4pm)",

  mainPhoto: "/img/Priamry Plate 01.jpg",
  photos: [
    { src: "/img/cover.jpg", label: "Cover" },
    { src: "/img/spine.jpg", label: "Spine" },
    { src: "/img/margins.jpg", label: "Margins" },
    { src: "/img/back slip.jpg", label: "Back slip" },
  ],
  attributes: ["Like New", "Clean Margins", "Original Binding Intact"],
  mobileAttributes: ["Like New", "Clean Margins", "Smoke-free Home", "Original Binding Intact", "No Missing Pages"],
};

// ---- Footer data ----
const footerColumns = [
  {
    title: "Gazette Volumes",
    links: [
      "Symons West Bank Leases",
      "East Bank Collegiate Rooms",
      "Official Course Materials",
      "Campus Gear & Artifacts",
      "Sublet Ledger: Fall & Winter",
    ],
  },
  {
    title: "Trust Standard",
    links: [
      "The Broadsheet Verification Oath",
      "Standard Student Tenancy Form",
      "Escrow & Deposit Safety Shield",
      "Landlord Authenticity Index",
      "Dispute Gazette & Ombudsperson",
    ],
  },
];

// ---- Mobile tab bar ----
const tabs = [
  { label: "Housing", icon: "/img/Housing.png", to: "/browse-housing" },
  { label: "Market", icon: "/img/Market.png", to: "/marketplace" },
  { label: "Safety", icon: "/img/Safety.png", to: "#" },
  { label: "Messages", icon: "/img/Messages.png", to: "#" },
];

// ---- Icons ----
const Icon = ({ className = "h-4 w-4", children, strokeWidth = 1.8 }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const ArrowLeft = (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>;
const ArrowRight = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const Clock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const Eye = (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>;
const Zoom = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></Icon>;
const Camera = (p) => <Icon {...p}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></Icon>;
const CheckCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></Icon>;
const Tick = (p) => <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>;
const Book = (p) => <Icon {...p}><path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5z" /><path d="M12 6v13.5" /></Icon>;
const Pin = (p) => <Icon {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Icon>;
const Flag = (p) => <Icon {...p}><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></Icon>;
const ShieldCheck = (p) => <Icon {...p}><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></Icon>;
const WarningOutline = (p) => <Icon {...p}><path d="M12 3L2 20h20z" /><path d="M12 10v4M12 17h.01" /></Icon>;
const Warning = (p) => (
  <Icon {...p}>
    <path d="M12 3L2 20h20z" fill="currentColor" />
    <path d="M12 10v4M12 17h.01" stroke="#FFA64D" />
  </Icon>
);
const Bookmark = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

// ---- Small pieces ----
const Eyebrow = ({ children, className = "" }) => (
  <p className={`text-[12px] uppercase tracking-[0.08em] text-neutral-500 ${className}`}>{children}</p>
);

const card = "rounded-[32px] border-2 border-neutral-900";

export default function ItemDetailContent({ onMessage = () => {}, onReport = () => {} }) {
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(false);

  // First thumbnail = the primary photo; the others swap the big image
  const mainSrc = active === 0 ? item.mainPhoto : item.photos[active].src;

  return (
    <div className="bg-[#fffff7] pt-5 text-neutral-900 lg:pt-6" style={sans}>
      {/* Peer alert banner (desktop only, mobile has its own advisory card) */}
      <div className="hidden border-b-2 border-neutral-900 bg-[#FFA64D] px-16 py-5 lg:block">
        <p className="mx-auto flex max-w-[1152px] items-center gap-3 text-[15px] font-semibold">
          <Warning className="h-5 w-5" />
          TrentTrust peer alert: Never send deposits or e-Transfers before inspecting items. Complete trades in person on campus
        </p>
      </div>

      <div className="mx-auto max-w-[640px] px-4 pb-32 lg:max-w-[1152px] lg:px-0 lg:pb-16">
        {/* Breadcrumb row */}
        <div className="flex flex-col gap-2 border-b border-neutral-300 pb-3 text-[17px] lg:mt-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-2 lg:text-[14px]">
          <nav className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <Link to="/marketplace" className="flex items-center gap-1 font-medium">
              <ArrowLeft className="h-4 w-4 lg:h-3.5 lg:w-3.5" /> Marketplace
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-600">
              <span className="lg:hidden">Textbooks</span>
              <span className="hidden lg:inline">Textbooks &amp; Academics</span>
            </span>
            <span className="text-neutral-400">/</span>
            <span className="font-medium">
              <span className="lg:hidden">COIS 1010</span>
              <span className="hidden lg:inline">COIS 1010 Textbook — 4th ed.</span>
            </span>
          </nav>
          <div className="flex items-center gap-2 text-[14px] text-neutral-500 lg:gap-4 lg:text-[13px]">
            <span className="flex items-center gap-1.5">
              <Clock className="hidden h-3.5 w-3.5 lg:block" />
              {item.listedAgo}
            </span>
            <span className="lg:hidden">·</span>
            <span className="flex items-center gap-1.5">
              <Eye className="hidden h-3.5 w-3.5 lg:block" />
              {item.views} views
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-6 lg:mt-6 lg:grid lg:grid-cols-[minmax(0,658fr)_minmax(0,460fr)] lg:items-start lg:gap-8">
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="contents lg:block lg:space-y-6">
            {/* Gallery */}
            <section className="order-1 lg:order-none lg:rounded-[32px] lg:border-2 lg:border-neutral-900 lg:bg-white lg:p-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] border-2 border-neutral-900 bg-neutral-200 lg:aspect-[3/2] lg:rounded-3xl">
                <img src={mainSrc} alt={`Textbook photo: ${item.photos[active].label}`} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-3 py-1.5 text-[13px] font-medium text-white lg:py-1 lg:text-[12px]">
                  {active === 0 ? "Primary Plate 01" : `Plate 0${active + 1}`}
                </span>
                <button className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-neutral-900 bg-[#fffff7] px-3 py-1.5 text-[13px] font-medium lg:bottom-3 lg:top-auto lg:border-0 lg:bg-[#f3f1e4] lg:text-[12px]">
                  <Zoom className="h-3.5 w-3.5" /> Inspect binding
                </button>
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#02503f] px-3 py-1.5 text-[13px] font-medium text-white lg:hidden">
                  <Tick className="h-3 w-3" /> Verified daylight photos (4)
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-[#fffff7] px-3 py-1 text-[13px] lg:hidden">
                  {active + 1} of 4
                </span>
              </div>

              <p className="mt-4 flex items-start gap-2 text-[14px] leading-snug lg:hidden">
                <CheckCircle className="mt-0.5 h-4 w-4 text-[#02503f]" />
                Captured on Symons Campus · Unfiltered raw photographic evidence
              </p>

              <div className="mt-4 grid grid-cols-4 gap-3">
                {item.photos.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${p.label} photo`}
                    className={`text-center lg:rounded-2xl lg:border-2 lg:p-[3px] ${i === active ? "lg:border-[#02503f]" : "lg:border-transparent"}`}
                  >
                    <span className={`block aspect-square overflow-hidden rounded-xl border-2 bg-[#f3f1d8] lg:relative lg:aspect-auto lg:h-24 lg:border lg:border-neutral-900 lg:bg-transparent ${i === active ? "border-neutral-900" : "border-transparent"}`}>
                      <img src={p.src} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-1 left-1 hidden rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white lg:block">{p.label}</span>
                    </span>
                    <span className={`mt-1.5 block text-[14px] lg:hidden ${i === active ? "font-semibold" : "text-neutral-500"}`}>{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 hidden flex-wrap items-center justify-between gap-3 border-t border-neutral-300 pt-4 lg:flex">
                <span className="flex items-center gap-1.5 rounded-full bg-[#02503f] px-3 py-1.5 text-[12px] font-medium text-white">
                  <CheckCircle className="h-3.5 w-3.5" /> Verified daylight photos (4)
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-neutral-500">
                  <Camera className="h-3.5 w-3.5" /> Captured on Symons Campus · Unfiltered
                </span>
              </div>
            </section>

            {/* About */}
            <section className={`${card} order-3 bg-[#fffff7] p-5 lg:order-none lg:p-8`}>
              <p className="hidden items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#02503f] lg:flex">
                <Book className="h-4 w-4" /> Course syllabus matching index
              </p>
              <h2 className="text-[40px] leading-tight lg:hidden" style={serif}>
                About this item
              </h2>
              <h2 className="mt-2 hidden border-b-2 border-neutral-900 pb-4 text-[32px] leading-tight lg:block" style={serif}>
                About this item &amp; academic course context
              </h2>

              <div className="mt-4 space-y-4 px-3 text-[17px] leading-relaxed lg:mt-5 lg:px-0 lg:text-[16px]">
                <p>
                  Used specifically for COIS 1010H (Fall/Winter academic term at Trent University). Book is in immaculate condition — zero torn or missing pages, exceptionally tight binding, and minimal pencil annotations restricted exclusively to Chapter 2 review questions.
                </p>
                <p className="text-neutral-600 lg:text-neutral-900">
                  Comes with the companion student study guide inserts untouched. Picked this volume up brand new at the Bata Library bookstore last year for{" "}
                  <span className="lg:line-through">${item.originalPrice} CAD</span>. Selling ahead of the term start to another Trent CS student.
                </p>
              </div>

              {/* Registry data (desktop only) */}
              <div className="mt-6 hidden rounded-2xl border-2 border-neutral-900 bg-[#efefe0] p-5 lg:block">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-300 pb-3">
                  <h3 className="text-[18px]">Trent Academic Registry Data</h3>
                  <span className="rounded-md border border-[#9fd0bd] bg-[#dff1ea] px-2 py-0.5 text-[12px] text-[#02503f]">Fall 2024 Approved</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                  <div>
                    <Eyebrow>Course code</Eyebrow>
                    <p className="mt-1"><span className="rounded-md bg-neutral-900 px-2 py-1 text-[14px] text-white">COIS 1010</span></p>
                  </div>
                  <div>
                    <Eyebrow>Course name</Eyebrow>
                    <p className="mt-1 text-[15px] font-semibold leading-snug">Cybersecurity &amp; Info Systems</p>
                  </div>
                  <div>
                    <Eyebrow>Department</Eyebrow>
                    <p className="mt-1 text-[15px] font-medium leading-snug">Computer Science Dept.</p>
                  </div>
                  <div>
                    <Eyebrow>Campus location</Eyebrow>
                    <p className="mt-1 text-[15px] font-medium">Symons Campus</p>
                  </div>
                  <div>
                    <Eyebrow>Required edition</Eyebrow>
                    <p className="mt-1 text-[15px] font-semibold">4th Canadian Edition</p>
                  </div>
                  <div>
                    <Eyebrow>ISBN-13 registry</Eyebrow>
                    <p className="mt-1 break-all font-mono text-[14px]">978-1-119-74221-0</p>
                  </div>
                </div>
              </div>

              {/* Physical attributes */}
              <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-700 lg:text-[12px] lg:font-normal lg:text-neutral-500">
                Verified physical attributes
              </p>
              <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                {item.mobileAttributes.map((a) => (
                  <span key={a} className="flex items-center gap-1.5 rounded-full border border-neutral-900 bg-[#fffff7] px-3 py-1 text-[14px]">
                    <Tick className="h-3 w-3" /> {a}
                  </span>
                ))}
              </div>
              <div className="mt-3 hidden flex-wrap gap-2 lg:flex">
                {item.attributes.map((a) => (
                  <span key={a} className="flex items-center gap-1.5 rounded-full border-2 border-neutral-900 px-3 py-1 text-[14px] font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-[#02503f]" /> {a}
                  </span>
                ))}
                <span className="rounded-full border-2 border-neutral-900 bg-[#e4e4d0] px-3 py-1 text-[14px] font-medium">No Missing Pages</span>
              </div>
            </section>

            {/* Provenance */}
            <section className="order-6 flex items-start gap-4 rounded-2xl border-2 border-neutral-900 bg-[#f0efdc] p-4 lg:order-none lg:rounded-3xl lg:bg-[#eeeedd] lg:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#02503f] text-white lg:rounded-full lg:border-0">
                <img src="/img/Whale icon.png" alt="" className="h-5 w-5 object-contain" />
              </span>
              <div>
                <h3 className="text-[18px] font-medium leading-tight lg:text-[17px] lg:font-semibold">Single-Owner Academic Provenance</h3>
                <p className="mt-1 text-[15px] leading-snug text-neutral-700 lg:text-[14px]">
                  <span className="lg:hidden">
                    Purchased brand new in September 2023 with verified receipt on file with the TrentTrust registry. This copy has not circulated through multiple rental pools or commercial resellers.
                  </span>
                  <span className="hidden lg:inline">
                    Purchased in September 2023 with receipt on file. This copy has not circulated through multiple rental pools or commercial resellers.
                  </span>
                </p>
              </div>
            </section>
          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <aside className="contents lg:block lg:space-y-6">
            <section className="order-2 rounded-[32px] border border-neutral-900 bg-[#fffff7] p-5 lg:order-none lg:border-2 lg:p-8">
              {/* Tags (mobile) */}
              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                <span className="rounded-lg border-2 border-neutral-900 bg-[#02503f] px-3 py-1 text-[14px] font-medium text-white">COIS 1010</span>
                <span className="rounded-lg border-2 border-neutral-900 bg-[#f3f1d8] px-3 py-1 text-[14px]">Textbooks</span>
                <span className="rounded-lg border-2 border-neutral-900 bg-[#f3f1d8] px-3 py-1 text-[14px]">Like new</span>
                <span className="ml-auto rounded-lg border border-neutral-900 bg-[#b9f0df] px-3 py-1 text-[14px]">In Stock</span>
              </div>

              {/* Price (desktop) */}
              <div className="hidden items-start justify-between gap-3 lg:flex">
                <div>
                  <Eyebrow>Settlement price</Eyebrow>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-[44px] font-bold leading-none">${item.price}</span>
                    <span className="text-[18px] font-medium text-neutral-500">CAD</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full border border-neutral-900 bg-[#e4e4d0] px-3 py-1 text-[12px] font-medium">Firm student price</span>
                  <p className="mt-1 text-[12px] text-neutral-500">Orig. bookstore ${item.originalPrice}</p>
                </div>
              </div>
              <hr className="mt-4 hidden border-t-2 border-neutral-900 lg:block" />

              {/* Title + price (mobile) */}
              <h1 className="mt-4 text-[38px] leading-[1.1] lg:hidden" style={serif}>{item.title}</h1>
              <p className="mt-3 text-[16px] leading-snug text-neutral-600 lg:hidden">
                Foundations of Information Systems &amp; Applied Cyber Security
              </p>
              <hr className="mt-4 border-neutral-300 lg:hidden" />
              <div className="mt-3 flex items-baseline justify-between gap-3 lg:hidden">
                <p className="flex items-baseline gap-2">
                  <span className="text-[40px] font-semibold leading-none">${item.price}</span>
                  <span className="text-[16px] text-neutral-600">CAD</span>
                </p>
                <span className="text-[15px] text-neutral-500 line-through">Orig. bookstore ${item.originalPrice}</span>
              </div>

              {/* Title + tags (desktop) */}
              <h1 className="mt-5 hidden text-[26px] leading-snug lg:block">{item.title}</h1>
              <div className="mt-3 hidden flex-wrap gap-2 lg:flex">
                {item.tags.map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-full border-2 border-neutral-900 px-3 py-0.5 text-[13px] font-medium ${i === item.tags.length - 1 ? "bg-neutral-900 text-white" : ""}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Seller */}
              <div className="mt-5 rounded-2xl border-2 border-neutral-900 bg-[#f5f5e0] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#02503f] text-[22px] text-white lg:h-12 lg:w-12 lg:text-[18px] lg:font-semibold">
                    {item.seller.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[22px] font-medium leading-none lg:text-[18px] lg:font-normal">{item.seller.name}</span>
                      <span className="flex items-center gap-1 rounded-full bg-[#02503f] px-2.5 py-1 text-[13px] text-white lg:px-2 lg:py-0.5 lg:text-[11px] lg:font-medium">
                        <Tick className="h-3 w-3" strokeWidth={2.4} />
                        <span className="lg:hidden">Trent Student</span>
                        <span className="hidden lg:inline">Verified Trent Student</span>
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-[14px] text-neutral-600 lg:mt-0 lg:overflow-visible lg:whitespace-normal lg:text-neutral-500">
                      {item.seller.program}
                      <span className="lg:hidden"> · {item.seller.college}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-neutral-300 pt-3 text-[14px] lg:text-[13px]">
                  <span className="hidden items-center gap-1.5 lg:flex"><img src="/img/Champlain College icon.png" alt="" className="h-3.5 w-3.5 object-contain" />{item.seller.college}</span>
                  <span className="flex items-center gap-2 lg:gap-1.5"><img src="/img/flash.png" alt="" className="h-4 w-4 object-contain lg:h-3.5 lg:w-3.5" />{item.seller.reply}</span>
                  <span className="flex items-center gap-2 lg:hidden">
                    <CheckCircle className="h-4 w-4 text-[#02503f]" />
                    <span className="leading-tight">Trent Directory<br />Sync</span>
                  </span>
                </div>
              </div>

              {/* Meetup */}
              <div className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-neutral-900 bg-white p-4 lg:bg-[#fffff7]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-900 bg-[#e4e4d0] lg:mt-1 lg:h-auto lg:w-auto lg:border-0 lg:bg-transparent">
                  <Pin className="h-5 w-5 text-[#02503f] lg:h-4 lg:w-4" />
                </span>
                <div>
                  <p className="text-[18px] font-medium uppercase leading-tight lg:text-[12px] lg:font-normal lg:tracking-[0.08em] lg:text-neutral-500">
                    Designated meetup zone
                  </p>
                  <p className="mt-1 text-[16px] leading-snug text-neutral-700 lg:text-[15px] lg:text-neutral-900">
                    {item.meetup} <span className="lg:text-neutral-500">{item.meetupAlt}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={onMessage}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] py-4 text-[17px] font-medium transition hover:brightness-95 lg:text-[16px]"
              >
                <img src="/img/Envelope.png" alt="" className="h-5 w-5 object-contain lg:hidden" />
                <img src="/img/Message.png" alt="" className="hidden h-5 w-5 object-contain lg:block" /> Message {item.seller.name.split(" ")[0]}
              </button>
              <button className="mt-3 hidden w-full rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] py-4 text-[16px] font-medium transition hover:brightness-95 lg:block">
                View Profile
              </button>
              <button
                onClick={() => setSaved((s) => !s)}
                aria-pressed={saved}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#fbfbdc] py-3.5 text-[16px] font-medium transition hover:brightness-95 lg:bg-[#fffff7] lg:py-3 lg:text-[15px] lg:hover:bg-[#f3f1e4]"
              >
                <Bookmark filled={saved} />
                <span className="lg:hidden">{saved ? "Saved to watchlist" : "Save item to watchlist"}</span>
                <span className="hidden lg:inline">{saved ? "Saved" : "Save item"}</span>
              </button>
              <button
                onClick={onReport}
                className="mx-auto mt-4 flex items-center gap-1.5 text-[13px] text-neutral-700 underline hover:text-neutral-900 lg:text-[12px] lg:text-neutral-500 lg:no-underline"
              >
                <Flag className="h-3 w-3" />
                <span className="lg:hidden">Report inaccurate listing or syllabus mismatch</span>
                <span className="hidden lg:inline">Report inaccurate listing or spam</span>
              </button>
            </section>

            {/* Peer advisory (mobile only) */}
            <section className="order-4 flex items-start gap-3 rounded-2xl border-2 border-neutral-900 bg-[#FFA64D] p-4 lg:hidden">
              <WarningOutline className="mt-1.5 h-5 w-5" />
              <div>
                <h2 className="text-[18px] font-semibold leading-tight">TrentTrust Peer Advisory</h2>
                <p className="mt-1 text-[14px] leading-snug">
                  Never send deposits or e-Transfers before inspecting items. Complete trades in person at designated campus zones.
                </p>
              </div>
            </section>

            {/* Safety card */}
            <section className="order-5 rounded-[32px] border-2 border-neutral-900 bg-[#02503f] p-6 text-white lg:order-none">
              <div className="flex items-start gap-4 lg:items-center lg:gap-3 lg:border-b lg:border-white/20 lg:pb-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#fffff7] lg:h-10 lg:w-10 lg:border-0 lg:bg-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 lg:h-5 lg:w-5">
                    <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" fill="#02503f" />
                    <path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lg:hidden" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-[28px] font-semibold leading-tight lg:text-[20px] lg:font-medium">Meeting someone in person?</h2>
                  <p className="mt-1 text-[13px] text-[#8fd8c0] lg:hidden">Trent Campus Safety Guidelines</p>
                </div>
              </div>
              <p className="mt-5 text-[18px] leading-relaxed lg:mt-4 lg:text-[14px] lg:text-white/90">
                Meet on campus or in public, and bring a friend. Trent campus safety recommends daylight exchanges at{" "}
                <strong className="font-normal lg:font-bold lg:text-white">Bata Library atrium</strong> or the Student Centre foyer. Never exchange cash in isolated parking zones.
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/15 bg-black/20 p-4 text-[14px] leading-snug lg:hidden">
                <ShieldCheck className="mt-0.5 h-4 w-4" />
                Both parties hold authenticated @trentu.ca academic directory credentials.
              </div>
              <a href="#" className="mt-5 hidden items-center gap-1.5 text-[14px] font-medium lg:inline-flex">
                Trent Campus Safety Protocols <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </section>
          </aside>
        </div>
      </div>

      {/* Footer (desktop only) */}
      <footer className="hidden bg-[#1a1a1a] px-8 py-16 text-white lg:block">
        <div className="mx-auto grid max-w-[1152px] grid-cols-4 gap-10">
          <div>
            <p className="text-[28px]" style={serif}>TrentTrust</p>
            <p className="mt-3 text-[12px] uppercase tracking-wider text-neutral-400">
              Collegiate Housing &amp; Trade Gazette
            </p>
            <p className="mt-5 text-[16px] leading-relaxed">
              The verified journal of record for student housing, sublets, textbooks, and collegiate trade within the Symons Valley basin.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-[#02503f] px-3 py-1.5 text-[12px] font-medium">
              <CheckCircle className="h-3.5 w-3.5" /> Trent ID Protocol 4.2
            </span>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[24px] font-medium">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-[16px] text-neutral-200">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[24px] font-medium">Peterborough Registry</h3>
            <p className="mt-5 text-[16px] leading-relaxed text-neutral-200">
              1600 West Bank Drive<br />
              Symons Campus, Champlain Quad<br />
              Peterborough, ON K9L 0G2
            </p>
            <p className="mt-4 text-[12px] text-neutral-400">
              Operating under the Collegiate Broadsheet Charter of Student Governance.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1152px] flex-wrap items-center justify-between gap-4 border-t border-neutral-600 pt-6 text-[13px] text-neutral-400">
          <p>© 2024 TrentTrust Gazette Corporation. All collegiate broadsheet records verified.</p>
          <div className="flex flex-wrap gap-6 underline">
            <a href="#">Ombudsperson Protocol</a>
            <a href="#">Registry Bylaws</a>
            <a href="#">Student Data Dignity</a>
          </div>
        </div>
      </footer>

      {/* Bottom tab bar (mobile only) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-300 bg-[#fffff0] px-3 pb-[env(safe-area-inset-bottom)] pt-2 lg:hidden">
        <ul className="grid grid-cols-4">
          {tabs.map((tab) => (
            <li key={tab.label} className="flex justify-center">
              <Link
                to={tab.to}
                className={`flex min-w-[76px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[14px] ${tab.label === "Market" ? "bg-[#F0D7FF]" : ""}`}
              >
                <img src={tab.icon} alt="" className="h-6 w-6 object-contain" />
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}