import { useState } from "react";
import Layout from "../components/Layout"; // Layout renders the Navbar

const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* ---------- Mock data (replace with your API data later) ---------- */

const CATEGORIES = [
  "All Items",
  "Textbooks",
  "Winter Apparel",
  "Electronics",
  "Furniture & Decor",
  "Study Essentials",
];

const LISTINGS = [
  {
    id: 1,
    image: "/img/Intro Psychology 11th Ed.jpg",
    condition: "Like new",
    price: 45,
    label: "Textbooks",
    group: "Textbooks",
    title: "Intro Psychology 11th Ed (PSYC 1020H)",
    pickup: "Bata Library foyer",
  },
  {
    id: 2,
    image: "/img/Columbia Omni-Heat Winter Parka.jpg",
    condition: "Excellent",
    price: 65,
    label: "Winter Gear",
    group: "Winter Apparel",
    title: "Columbia Omni-Heat Winter Parka (Men's M)",
    pickup: "Student Centre pickup",
  },
  {
    id: 3,
    image: "/img/Ergonomic Mesh Desk Chair.jpg",
    condition: "Good",
    price: 40,
    label: "Furniture",
    group: "Furniture & Decor",
    title: "Ergonomic Mesh Desk Chair (Adjustable)",
    pickup: "West Bank / Symons",
  },
  {
    id: 4,
    image: "/img/TI-84 Plus Graphing Calculator.jpg",
    condition: "Good",
    price: 35,
    label: "Electronics",
    group: "Electronics",
    title: "TI-84 Plus Graphing Calculator",
    pickup: "Science Complex",
  },
  {
    id: 5,
    image: "/img/Organic Chemistry Molecular Model Kit.jpg",
    condition: "Like new",
    price: 20,
    label: "Course Supplies",
    group: "Study Essentials",
    title: "Organic Chemistry Molecular Model Kit",
    pickup: "DNA Building foyer",
  },
  {
    id: 6,
    image: "/img/Apple AirPods Pro.jpg",
    condition: "Excellent",
    price: 110,
    label: "Electronics",
    group: "Electronics",
    title: "Apple AirPods Pro (2nd Gen, USB-C)",
    pickup: "Bata Library foyer",
  },
  {
    id: 7,
    image: "/img/Trent University Classic Green.jpg",
    condition: "Like new",
    price: 25,
    label: "Apparel",
    group: "Winter Apparel",
    title: "Trent University Classic Green Hoodie (L)",
    pickup: "Athletics Centre",
  },
  {
    id: 8,
    image: "/img/Compact Mini Fridge with Freezer.jpg",
    condition: "Good",
    price: 55,
    label: "Furniture",
    group: "Furniture & Decor",
    title: "Compact Mini Fridge with Freezer (1.7 cu ft)",
    pickup: "Champlain College",
  },
];

// Mobile cards (below 640px) come from the mobile design, so they have their own data
const MOBILE_LISTINGS = [
  {
    id: 101,
    image: "/img/COIS 1010 Textbook.jpg",
    isNew: true,
    photos: 3,
    price: 40,
    code: "COIS 1010",
    note: "Like new",
    group: "Textbooks",
    title: "COIS 1010 Textbook — 4th ed.",
    pickup: "Symons Campus (Bata Library)",
    chips: ["Listed 2h ago", "Replies ~15m"],
  },
  {
    id: 102,
    image: "/img/Canada Goose Style Winter.jpg",
    photos: 5,
    price: 60,
    tag: "Winter Apparel",
    note: "Excellent",
    group: "Winter Apparel",
    title: "Canada Goose Style Winter Parka (Medium)",
    pickup: "Otonabee College Quad",
    chips: ["Listed 2 days ago", "Replies ~1h"],
  },
  {
    id: 103,
    image: "/img/CE Graphing Calculator.jpg",
    photos: 2,
    price: 45,
    code: "MATH 1110",
    note: "Mint / cable inc.",
    group: "Electronics",
    title: "TI-84 Plus CE Graphing Calculator",
    pickup: "Symons Student Centre",
    chips: ["Listed 1 day ago", "Replies ~30m"],
  },
  {
    id: 104,
    image: "/img/Danby Compact Dorm Mini Fridge.jpg",
    photos: 4,
    price: 50,
    tag: "Appliances",
    note: "Clean interior",
    group: "Furniture & Decor",
    title: "Danby Compact Dorm Mini-Fridge (3.2 cu ft)",
    pickup: "Champlain College Residence",
    chips: ["Listed 4 days ago", "Tested & chilled"],
  },
  {
    id: 105,
    image: "/img/Minimalist Solid Pine Study Desk.jpg",
    photos: 3,
    price: 30,
    tag: "Furniture",
    note: "Van required",
    noteWarn: true,
    group: "Furniture & Decor",
    title: "Minimalist Solid Pine Study Desk",
    pickup: "East City (Ground Floor)",
    chips: ["Listed 5 days ago", "Disassembled"],
  },
];

/* ---------- Icons ---------- */

const Svg = ({ className = "h-4 w-4", children, stroke = "currentColor", sw = 2 }) => (
  <svg
    viewBox="0 0 24 24"
    className={`shrink-0 ${className}`}
    fill="none"
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SearchIcon = () => (
  <Svg className="h-[18px] w-[18px] text-neutral-600">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Svg>
);

const PlusIcon = () => (
  <Svg className="h-[18px] w-[18px]">
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

const PlusCircleIcon = () => (
  <Svg className="h-5 w-5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </Svg>
);

const ShieldCheck = ({ className = "h-3.5 w-3.5 text-[#02503f]" }) => (
  <Svg className={className} sw={1.8}>
    <path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Svg>
);

const ChevronIcon = ({ dir = "right" }) => (
  <Svg className="h-4 w-4">
    <path d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
  </Svg>
);

const ChevronDown = () => (
  <Svg className="h-4 w-4">
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

const WarningIcon = () => (
  <Svg className="h-5 w-5" sw={1.8}>
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4M12 17v.5" />
  </Svg>
);

const MapIcon = () => (
  <Svg className="h-4 w-4" sw={1.8}>
    <path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5z" />
    <path d="M9 4v13M15 6.5v13" />
  </Svg>
);

const CameraIcon = () => (
  <Svg className="h-3.5 w-3.5" sw={1.8}>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
    <circle cx="12" cy="13" r="3.2" />
  </Svg>
);

const TickIcon = () => (
  <Svg className="h-3 w-3" sw={3}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

const ArrowRight = () => (
  <Svg className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

/* ---------- Desktop / tablet card ---------- */

function ListingCard({ item, onMessage }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-400/70 bg-[#fffff7]">
      <div className="relative aspect-[4/3] bg-neutral-200">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11.5px] font-medium">
          {item.condition}
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save item"}
          aria-pressed={saved}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 ${
            saved ? "bg-[#efd6ff]" : "bg-white"
          }`}
        >
          <img src="/img/Save.png" alt="" />
        </button>
      </div>

      <div className="flex flex-1 flex-col border-t border-neutral-300 px-4 pb-4 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[24px] font-medium leading-none">${item.price}</span>
          <span className="truncate text-[11.5px] uppercase tracking-wide text-neutral-500">
            {item.label}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[2.9em] text-[18px] font-medium leading-snug">
          {item.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 border-b border-neutral-200 pb-1.5 text-[13px] text-neutral-600">
          <img src="/img/Location Pin.png" alt="" />
          <span className="truncate">{item.pickup}</span>
        </p>

        <span className="mt-3 flex w-fit max-w-full items-center gap-1.5 rounded-full border border-[#02503f] bg-[#e3efe9] px-2.5 py-0.5 text-[12px] font-medium text-[#02503f]">
          <img src="/img/Spiky Check.png" alt="" />
          <span className="truncate">Verified Trent member</span>
        </span>

        <button
          type="button"
          onClick={() => onMessage(item)}
          className="mt-4 w-full rounded-lg border border-neutral-300 bg-white py-2.5 text-[13.5px] font-medium text-[#02503f] transition hover:bg-[#f4f4e2]"
        >
          Message seller
        </button>
      </div>
    </article>
  );
}

/* ---------- Mobile card (below 640px) ---------- */

function MobileListingCard({ item, onView }) {
  return (
    <article className="rounded-[28px] border-[1.5px] border-neutral-900 bg-[#fffff7] p-5">
      <div className="relative overflow-hidden rounded-[22px] border-2 border-neutral-900 bg-neutral-200">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover"
        />

        {item.isNew ? (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#FF9F43] px-3 py-1 text-[13px] font-semibold text-neutral-900">
            <span className="h-2 w-2 rounded-full bg-neutral-900" />
            New Listing
          </span>
        ) : (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#00403a] px-3 py-1 text-[13px] font-semibold text-white">
            <TickIcon />
            Verified Lister
          </span>
        )}

        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[12.5px] text-white">
          <CameraIcon />
          {item.photos} photos
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[22px] font-semibold leading-none">${item.price} CAD</span>
        <div className="flex shrink-0 items-center gap-2">
          {item.code ? (
            <span className="rounded-lg bg-[#1a1a1a] px-2.5 py-1 text-[12px] font-medium text-white">
              {item.code}
            </span>
          ) : (
            <span className="rounded-lg border-2 border-neutral-900 bg-[#E4E4D0] px-2.5 py-0.5 text-[12px] font-medium">
              {item.tag}
            </span>
          )}
          <span
            className={`rounded-full border-2 border-neutral-900 px-2.5 py-0.5 text-[12px] font-medium ${
              item.noteWarn ? "bg-[#FF9F43]" : "bg-[#fffff0]"
            }`}
          >
            {item.note}
          </span>
        </div>
      </div>

      <h3 className="mt-3 text-[21px] font-bold leading-tight">{item.title}</h3>

      <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-neutral-700">
        <img src="/img/Location Pin.png" alt="" />
        <span>Pickup: {item.pickup}</span>
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-full border-2 border-neutral-900 bg-[#00403a] px-2.5 py-0.5 text-[12.5px] font-medium text-white">
          <img src="/img/Spiky Check.png" alt="" className="brightness-0 invert" />
          Trent ID Verified
        </span>
        {item.chips.map((c) => (
          <span
            key={c}
            className="rounded-full border-2 border-neutral-900 bg-[#E4E4D0]/70 px-2.5 py-0.5 text-[12.5px] text-neutral-700"
          >
            {c}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onView(item)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#fffff0] py-3 text-[16px] transition active:brightness-95"
      >
        View item details
        <ArrowRight />
      </button>
    </article>
  );
}

/* ---------- Pagination ---------- */

function Pagination({ page, setPage, totalPages = 24 }) {
  const pages = [1, 2, 3, "…", totalPages];
  const base =
    "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-900 text-[15px] font-medium";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${base} bg-[#E4E4D0] disabled:opacity-60`}
      >
        <ChevronIcon dir="left" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={i} className="px-1 text-neutral-500">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            aria-current={page === p ? "page" : undefined}
            className={`${base} ${
              page === p
                ? "bg-[#efd6ff] text-neutral-900 sm:bg-[#02503f] sm:text-white"
                : "bg-[#fffff0]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${base} bg-[#fffff0] disabled:opacity-60`}
      >
        <ChevronIcon dir="right" />
      </button>
    </nav>
  );
}

/* Same footer as BrowseHousing (move to components/Footer.jsx to share it) */
function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-4 pb-10 pt-12 sm:pb-14 sm:pt-20 lg:px-[79px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 text-[12px] text-[#8a8a80] md:flex-row md:items-center">
        <p>© 2024 TrentTrust Student Housing Bureau. Bound by Collegiate Trust Protocols.</p>
        <div className="flex items-center gap-3">
          <span>2px Ink Bound System</span>
          <span className="h-1 w-1 rounded-full bg-[#8a8a80]" />
          <span>Lumen Cream Standard</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function MarketplaceContent({
  listings = LISTINGS,
  mobileListings = MOBILE_LISTINGS,
  totalListings = 142,
  onSellItem = () => {},
  onMessageSeller = () => {},
  onViewItem = () => {},
}) {
  const [category, setCategory] = useState("All Items");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const q = query.trim().toLowerCase();
  const prepare = (list) =>
    list
      .filter(
        (l) =>
          (category === "All Items" || l.group === category) &&
          (!q ||
            `${l.title} ${l.pickup} ${l.label ?? l.tag ?? ""} ${l.code ?? ""}`
              .toLowerCase()
              .includes(q))
      )
      .sort((a, b) =>
        sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0
      );

  const visible = prepare(listings); // desktop / tablet cards
  const visibleMobile = prepare(mobileListings); // mobile cards

  const emptyState = (
    <div className="rounded-2xl border-2 border-dashed border-neutral-400 px-6 py-14 text-center">
      <p className="text-[18px] font-medium">No items match your search</p>
      <p className="mt-1 text-[14px] text-neutral-600">
        Try another category or search by a different course code or pickup spot.
      </p>
    </div>
  );

  return (
    <Layout flatOnMobile>
      <div className="overflow-x-hidden bg-[#fffff7] text-neutral-900" style={sans}>
        <main className="mx-auto w-full max-w-[1280px] px-4 pb-14 pt-8 sm:pt-12 md:pt-20 lg:px-10">
          {/* Heading */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:border-b-2 sm:border-neutral-900 sm:pb-6">
            <div>
              <h1 className="text-[36px] leading-none sm:text-[52px]" style={serif}>
                Student marketplace.
              </h1>
              <p className="mt-3 max-w-[640px] text-[16px] leading-snug sm:text-[20px]">
                Textbooks, winter gear, electronics, furniture —{" "}
                <span className="sm:hidden">verified peer-to-peer exchange.</span>
                <span className="hidden sm:inline">from verified students.</span>
              </p>
            </div>
            <span className="mb-1 hidden w-fit items-center gap-1.5 rounded-full border-2 border-neutral-900 bg-[#efefd8] px-3.5 py-1.5 text-[12.5px] font-medium sm:flex">
              <ShieldCheck />
              Trent Central Authenticated
            </span>
          </header>

          {/* Controls: mobile order = search, sell, categories, status. Desktop = categories, search */}
          <div className="flex flex-col">
            {/* Categories (scrolls sideways on mobile) */}
            <div className="-mx-4 order-2 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:order-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  aria-pressed={category === c}
                  className={`shrink-0 whitespace-nowrap rounded-full border-2 border-neutral-900 px-4 py-2 text-[14px] font-medium transition sm:px-[18px] ${
                    category === c ? "bg-[#efd6ff]" : "bg-[#fffff0] hover:bg-[#f1efd9]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search + sell */}
            <div className="order-1 mt-5 flex flex-col gap-3 sm:order-2 sm:mt-6 sm:flex-row">
              <label className="flex h-[50px] min-w-0 flex-1 items-center gap-3 rounded-xl border-2 border-neutral-900 bg-[#fffff0] px-4">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by course code, item, or campus pickup..."
                  className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-neutral-500"
                />
              </label>
              <button
                type="button"
                onClick={onSellItem}
                className="flex h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] px-6 text-[17px] font-medium transition hover:brightness-95 sm:text-[16px]"
              >
                <span className="sm:hidden">
                  <PlusCircleIcon />
                </span>
                <span className="hidden sm:block">
                  <PlusIcon />
                </span>
                Sell an item
              </button>
            </div>

            {/* Mobile status + sort */}
            <div className="order-3 mt-5 flex flex-col items-end gap-3 border-b border-neutral-300 pb-4 sm:hidden">
              <p className="self-start text-[13px]">
                Showing <span className="font-semibold">{visibleMobile.length}</span> of {totalListings}{" "}
                listings across Symons &amp; Downtown
              </p>
              <label className="relative">
                <span className="sr-only">Sort listings</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-full border-2 border-neutral-900 bg-[#fffff0] py-1.5 pl-4 pr-9 text-[13.5px]"
                >
                  <option value="recent">Sort: Recent</option>
                  <option value="price-asc">Sort: Price low to high</option>
                  <option value="price-desc">Sort: Price high to low</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <ChevronDown />
                </span>
              </label>
            </div>
          </div>

          {/* Listings: different card designs for mobile and desktop */}
          <div className="mt-6 sm:hidden">
            {visibleMobile.length > 0 ? (
              <div className="flex flex-col gap-5">
                {visibleMobile.map((l) => (
                  <MobileListingCard key={l.id} item={l} onView={onViewItem} />
                ))}
              </div>
            ) : (
              emptyState
            )}
          </div>

          <div className="mt-8 hidden sm:block">
            {visible.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((l) => (
                  <ListingCard key={l.id} item={l} onMessage={onMessageSeller} />
                ))}
              </div>
            ) : (
              emptyState
            )}
          </div>

          {/* Bottom: mobile order = safety box, pagination. Desktop = pagination, safety box */}
          <div className="flex flex-col">
            {/* Mobile safety charter */}
            <section className="order-1 mt-8 rounded-[28px] bg-[#1a1a1a] px-6 py-7 text-white sm:hidden">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fffff0]">
                  <ShieldCheck className="h-5 w-5 text-[#02503f]" />
                </span>
                <h2 className="text-[24px] font-medium leading-tight">
                  Safe Student Trading Charter
                </h2>
              </div>
              <p className="mt-5 text-[16px] leading-relaxed text-white/90">
                All marketplace listings are restricted to authenticated Trent University students.
                TrentTrust never handles payments, holding fees, or e-Transfers. Inspect items and
                complete transactions in person at designated daylight campus safe exchange zones
                (Bata Library atrium or Student Centre).
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#FF9F43] px-4 py-3 text-[14px] font-semibold leading-snug text-neutral-900">
                <WarningIcon />
                <p>
                  Never send non-refundable deposits prior to seeing the item on campus. Report
                  suspicious requests to Campus Security.
                </p>
              </div>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white py-3 text-[16px] font-medium text-white"
              >
                <MapIcon />
                View Campus Safe Zones Map
              </button>
            </section>

            {/* Pagination */}
            <div className="order-2 mt-8 sm:order-1 sm:mt-12 sm:border-t-2 sm:border-neutral-900 sm:pt-8 md:mt-24 lg:mt-[226px]">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <p className="hidden text-[15px] sm:block">
                  Showing {visible.length} of {totalListings} student listings across Peterborough
                  &amp; Durham campuses.
                </p>
                <Pagination page={page} setPage={setPage} />
              </div>
            </div>

            {/* Desktop safety box */}
            <section className="mt-12 hidden rounded-[2rem] bg-[#1a1a1a] px-8 py-7 text-white sm:order-2 sm:block">
              <h2 className="flex items-center gap-2 text-[22px] font-semibold">
                <img src="/img/Orange Shield.png" alt="" className="h-5 w-5 object-contain" />
                Safe Student Trading
              </h2>
              <p className="mt-3 max-w-[1000px] text-[16px] leading-relaxed text-white/85">
                All marketplace listings are restricted to authenticated Trent University students.
                TrentTrust never handles payments, holding fees, or e-Transfers. Inspect items in
                person and complete all physical exchanges inside designated daylight campus safe
                exchange zones.
              </p>
            </section>
          </div>

          {/* Mobile footer text */}
          <div className="mt-8 px-2 text-center sm:hidden">
            <p className="text-[13px] leading-snug text-neutral-700">
              Made for the Trent University community • Peterborough, Ontario
            </p>
            <p className="mt-2 text-[12.5px] leading-snug text-neutral-500">
              In association with the Student Housing and Safety Syndicate.
            </p>
          </div>
        </main>

        {/* Desktop footer (same as BrowseHousing) */}
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>

    </Layout>
  );
}