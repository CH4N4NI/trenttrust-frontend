import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout"; // Layout renders the Navbar

const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

/* ---------- Mock data (replace with your API data later) ---------- */

const DEFAULT_FILTERS = {
  min: "600",
  max: "1200",
  campuses: ["Peterborough (Symons)"],
  roomTypes: ["Private room"],
  furnished: "Yes",
  availability: "Sept 1",
  transit: "near",
  amenities: ["Laundry (In-unit/building)", "High-Speed WiFi"],
};

// the mobile design words some of the cards differently, so those have a "mobile" block
const LISTINGS = [
  {
    id: 1,
    image: "/img/Bright Private Room.jpg",
    badge: "Available Sept 1",
    price: "$850",
    per: "month",
    title: "Bright private room near Symons Campus",
    meta: "Private room · Furnished · All utilities incl.",
    location: "Near Symons Campus · 12 min by transit",
    icon: "bus",
    mobile: {
      badge: "Available Sept 1",
      title: "Bright private room near West Bank",
      meta: "Private room · Furnished · Utilities incl.",
      location: "Near Peterborough campus · 12 min transit",
    },
  },
  {
    id: 2,
    image: "/img/Summer Sublet.jpg",
    badge: "Available May 1 (Sublet)",
    price: "$780",
    per: "month",
    title: "Summer Sublet in Downtown Peterborough",
    meta: "Private room · Furnished · Utilities incl.",
    location: "Downtown Peterborough · Direct bus to campus",
    icon: "bus",
    mobile: {
      badge: "Summer sublet (May-Aug)",
      title: "Summer Sublet in Downtown Student House",
      meta: "Private room · Furnished · In-suite laundry",
      location: "Downtown Peterborough · Direct bus to Trent",
    },
  },
  {
    id: 3,
    image: "/img/Ensuite Room.jpg",
    badge: "Available Sept 1",
    price: "$920",
    per: "month",
    title: "Ensuite room with private bath",
    meta: "Private room · In-suite laundry · Parking incl.",
    location: "North Peterborough · 8 min bike / transit",
    icon: "bike",
    mobile: {
      badge: "Available Sept 1",
      title: "Ensuite master room with private bath",
      meta: "Private room · Parking incl. · High-speed WiFi",
      location: "North Peterborough · 8 min bike / transit",
    },
  },
  {
    id: 4,
    image: "/img/Quiet Room.jpg",
    badge: "Available Sept 1",
    price: "$750",
    per: "month",
    title: "Quiet study-friendly room in East Bank",
    meta: "Private room · High-speed WiFi · Quiet hours",
    location: "East Bank area · 15 min walk to campus",
    icon: "walk",
  },
  {
    id: 5,
    image: "/img/Upper-floor Bedroom.jpg",
    badge: "Available Sept 1",
    price: "$825",
    per: "month",
    title: "Upper-floor bedroom in 4-bedroom house",
    meta: "Private room · Furnished · Central AC",
    location: "Near Trent Athletics Centre · 10 min trail walk",
    icon: "gym",
  },
  {
    id: 6,
    image: "/img/2-bedroom Flat.jpg",
    badge: "Available Sept 1",
    price: "$1,350",
    per: "total",
    title: "2-Bedroom Flat for Student",
    meta: "Entire place · Unfurnished · Water incl.",
    location: "Peterborough Central · Route 7 Direct",
    icon: "bus",
  },
];

// mobile quick filter chips
const CHIPS = ["All", "Under $850", "Sept 1", "Furnished", "Sublets"];

// mobile bottom tab bar
const TABS = [
  { label: "Home", icon: "/img/Home.png", to: "/" },
  { label: "Housing", icon: "/img/Housing.png", to: "/browse-housing" },
  { label: "Market", icon: "/img/Market.png", to: "/marketplace" },
  { label: "Messages", icon: "/img/Messages.png", to: "#" },
  { label: "Post/Sell", icon: "/img/Post,Sell.png", to: "#" },
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
  <Svg className="h-5 w-5 text-neutral-600">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Svg>
);

const PlusIcon = () => (
  <Svg>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

const ShieldIcon = () => (
  <img src="/img/Orange Shield.png" alt=""  />
);

const SlidersIcon = () => (
  <img src="/img/Green Filters.png" alt=""  />
);

const BookmarkIcon = () => (
  <img src="/img/Save.png" alt="" />
);

const CheckCircle = () => (
  <img src="/img/Spiky Check.png" alt=""  />
);

const ChevronIcon = ({ dir = "right", className = "h-4 w-4" }) => (
  <Svg className={className}>
    <path d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
  </Svg>
);

const ChevronDown = () => (
  <Svg className="h-4 w-4 text-neutral-600">
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

const TRANSIT_ICONS = {
  bus: "/img/Bus.png",
  walk: "/img/Walking.png",
  bike: "/img/Motorcycle.png",
  gym: "/img/Dumbell.png",
};

const TransitIcon = ({ type }) => (
  <img
    src={TRANSIT_ICONS[type] ?? TRANSIT_ICONS.bus}
    alt=""
    
  />
);

/* ---------- Form controls ---------- */

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px]">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      {/* No tick: the box just fills green when checked */}
      <span
        className={`h-[18px] w-[18px] shrink-0 rounded border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#02503f] peer-focus-visible:ring-offset-2 ${
          checked ? "border-[#02503f] bg-[#02503f]" : "border-neutral-400 bg-white"
        }`}
      />
      <span>{label}</span>
    </label>
  );
}

function Radio({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug">
      <input type="radio" className="peer sr-only" checked={checked} onChange={onChange} />
      <span
        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#02503f] peer-focus-visible:ring-offset-2 ${
          checked ? "border-[#02503f]" : "border-neutral-400"
        } bg-white`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-[#02503f]" />}
      </span>
      <span>{label}</span>
    </label>
  );
}

function FilterGroup({ title, aside, children, first = false }) {
  return (
    <div className={`${first ? "" : "border-t border-neutral-300/70 pt-5"} pb-5`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-[14px] font-medium">{title}</h3>
        {aside}
      </div>
      {children}
    </div>
  );
}

const money = (v) => (v ? `$${Number(v).toLocaleString()}` : "$0");

/* ---------- Filters sidebar ---------- */

function FiltersPanel({ filters, setFilters, onApply, onReset }) {
  const toggle = (key, value) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  const campuses = ["Peterborough (Symons)", "Peterborough Downtown", "Durham GTA (Oshawa)"];
  const roomTypes = ["Private room", "Shared room", "Entire place"];
  const availability = ["Immediate", "Sept 1", "May 1 (Sublet)", "Jan 1"];
  const amenities = [
    "Laundry (In-unit/building)",
    "High-Speed WiFi",
    "Vehicle Parking Spot",
    "Wheelchair Accessible",
  ];

  return (
    <div className="rounded-[28px] border-2 border-neutral-400/80 bg-[#fffff7] px-5 pb-6 pt-5">
      <div className="flex items-center justify-between border-b border-neutral-300/70 pb-4">
        <h2 className="flex items-center gap-2 text-[18px] font-medium">
          <SlidersIcon />
          Filters
        </h2>
        <button
          onClick={onReset}
          className="text-[13px] text-neutral-500 underline underline-offset-2"
        >
          Clear all
        </button>
      </div>

      <div className="pt-5">
        <FilterGroup
          first
          title="Rent Range"
          aside={
            <span className="text-[12.5px] font-medium text-[#02503f]">
              {money(filters.min)} - {money(filters.max)}
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              ["MIN", "min"],
              ["MAX", "max"],
            ].map(([label, key]) => (
              <label
                key={key}
                className="block rounded-lg border border-neutral-300 bg-[#fffbe0] px-3 py-2"
              >
                <span className="block text-[10px] tracking-wide text-neutral-500">{label}</span>
                <span className="flex items-center text-[14px]">
                  $
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={filters[key]}
                    onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full min-w-0 bg-transparent outline-none"
                  />
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Trent Campus">
          <div className="space-y-3">
            {campuses.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={filters.campuses.includes(c)}
                onChange={() => toggle("campuses", c)}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Room Type">
          <div className="space-y-3">
            {roomTypes.map((r) => (
              <Checkbox
                key={r}
                label={r}
                checked={filters.roomTypes.includes(r)}
                onChange={() => toggle("roomTypes", r)}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Furnished">
          <div className="grid grid-cols-3 rounded-lg border border-neutral-300 bg-[#f4f4e2] p-1 text-[13px]">
            {["Any", "Yes", "No"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFilters((f) => ({ ...f, furnished: opt }))}
                className={`rounded-md py-1.5 transition ${
                  filters.furnished === opt
                    ? "border border-neutral-900 bg-white font-medium"
                    : "text-neutral-500"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Availability">
          <div className="flex flex-wrap gap-2">
            {availability.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setFilters((f) => ({ ...f, availability: a }))}
                className={`rounded-lg border px-3 py-1.5 text-[12.5px] transition ${
                  filters.availability === a
                    ? "border-[#02503f] bg-[#02503f] font-medium text-white"
                    : "border-neutral-300 bg-white"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Transit & Distance">
          <div className="space-y-3">
            <Radio
              label="Near campus (< 15 min walk/bus)"
              checked={filters.transit === "near"}
              onChange={() => setFilters((f) => ({ ...f, transit: "near" }))}
            />
            <Radio
              label="Direct bus corridor (Route 7/8)"
              checked={filters.transit === "bus"}
              onChange={() => setFilters((f) => ({ ...f, transit: "bus" }))}
            />
          </div>
        </FilterGroup>

        <FilterGroup title="Amenities Included">
          <div className="space-y-3">
            {amenities.map((a) => (
              <Checkbox
                key={a}
                label={a}
                checked={filters.amenities.includes(a)}
                onChange={() => toggle("amenities", a)}
              />
            ))}
          </div>
        </FilterGroup>

        <div className="border-t border-neutral-300/70 pt-5">
          <button
            onClick={onApply}
            className="w-full rounded-xl bg-[#F0D7FF] py-3 text-[14px] font-medium transition hover:brightness-95"
          >
            Apply filters
          </button>
          <button
            onClick={onReset}
            className="mx-auto mt-4 block text-[12.5px] text-neutral-500"
          >
            Reset default preferences
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Listing card ---------- */

function ListingCard({ listing, onView, onMessage }) {
  const [saved, setSaved] = useState(false);
  const m = listing.mobile ?? {}; // mobile wording, falls back to the desktop text

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white">
      <div className="relative aspect-[3/2] bg-neutral-200 sm:aspect-[4/3]">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* Badge: dark green + uppercase on mobile, white on desktop */}
        <span className="absolute left-3 top-3 rounded-full bg-[#00403a] px-3.5 py-2 text-[12px] font-medium uppercase tracking-wide text-white sm:border sm:border-neutral-300 sm:bg-white sm:px-3 sm:py-1 sm:font-normal sm:normal-case sm:tracking-normal sm:text-neutral-900">
          <span className="sm:hidden">{m.badge ?? listing.badge}</span>
          <span className="hidden sm:inline">{listing.badge}</span>
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save listing"}
          aria-pressed={saved}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 sm:h-8 sm:w-8 ${
            saved ? "bg-[#efd6ff]" : "bg-white"
          }`}
        >
          <BookmarkIcon />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        {/* Price (+ verified pill on mobile) */}
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[28px] font-semibold leading-none sm:text-[24px]">{listing.price}</span>
            <span className="text-[14px] text-neutral-500 sm:text-[13px]">
              /{" "}
              <span className="sm:hidden">{listing.per === "month" ? "mo" : listing.per}</span>
              <span className="hidden sm:inline">{listing.per}</span>
            </span>
          </p>
          <span className="flex items-center gap-1.5 rounded-full border border-[#02503f]/40 bg-[#e3efe9] px-3 py-1 text-[12px] font-medium text-[#02503f] sm:hidden">
            <CheckCircle />
            Verified Trent member
          </span>
        </div>

        <h3 className="mt-3 text-[18px] font-semibold sm:truncate sm:text-[17px]">
          <span className="sm:hidden">{m.title ?? listing.title}</span>
          <span className="hidden sm:inline">{listing.title}</span>
        </h3>
        <p className="mt-2 text-[15px] leading-snug text-neutral-600 sm:text-[14px]">
          <span className="sm:hidden">{m.meta ?? listing.meta}</span>
          <span className="hidden sm:inline">{listing.meta}</span>
        </p>

        <p className="mt-3 flex items-center gap-2 text-[13px] text-neutral-500 sm:border-b sm:border-neutral-200 sm:pb-1.5 sm:text-[12px]">
          <TransitIcon type={listing.icon} />
          <span className="truncate">
            <span className="sm:hidden">{m.location ?? listing.location}</span>
            <span className="hidden sm:inline">{listing.location}</span>
          </span>
        </p>

        {/* Mobile buttons */}
        <div className="mt-4 flex gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => onView(listing)}
            className="flex-1 rounded-xl bg-[#F0D7FF] py-3.5 text-[15px] font-medium transition hover:brightness-95"
          >
            View listing
          </button>
          <button
            type="button"
            onClick={() => onMessage(listing)}
            aria-label="Message lister"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-neutral-300 bg-white"
          >
            <img src="/img/Message.png" alt="" className="h-5 w-5 object-contain" />
          </button>
        </div>

        {/* Desktop bottom row */}
        <div className="mt-auto hidden items-center justify-between gap-2 pt-3 sm:flex">
          <span className="flex min-w-0 items-center gap-1.5 rounded-full border border-[#02503f]/40 bg-[#e3efe9] px-3 py-1 text-[12px] font-medium text-[#02503f]">
            <CheckCircle />
            <span className="truncate">Verified Trent member</span>
          </span>
          <button
            type="button"
            onClick={() => onView(listing)}
            className="shrink-0 rounded-lg bg-[#fffbe0] px-4 py-1.5 text-[13px] font-medium hover:brightness-95"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Pagination ---------- */

function Pagination({ page, setPage, total, shown, totalPages = 24 }) {
  const pages = [1, 2, 3, "…", totalPages];
  const base =
    "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-900 text-[15px] font-medium";

  return (
    <div className="mt-8 hidden flex-col-reverse items-center gap-4 border-t border-neutral-300/70 pt-6 sm:flex sm:flex-row sm:justify-between">
      <p className="text-[13px] text-neutral-500">
        Showing <span className="font-medium text-neutral-900">1–{shown}</span> of{" "}
        <span className="font-medium text-neutral-900">{total}</span> verified listings
      </p>

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
              className={`${base} ${page === p ? "bg-[#02503f] text-white" : "bg-white"}`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className={`${base} bg-white disabled:opacity-60`}
        >
          <ChevronIcon dir="right" />
        </button>
      </nav>
    </div>
  );
}

/* ---------- Page ---------- */

export default function BrowseHousingLocked({
  listings = LISTINGS,
  totalListings = 24,
  onPostListing = () => {},
  onViewListing = () => {},
  onMessageListing = () => {},
  onApplyFilters = () => {},
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile + tablet
  const [chip, setChip] = useState("All"); // mobile chips, just highlights for now
  const [page, setPage] = useState(1);

  // number on the mobile Filters button
  const filterCount =
    filters.campuses.length + filters.roomTypes.length + (filters.furnished !== "Any" ? 1 : 0);

  const applyFilters = () => {
    onApplyFilters(filters);
    setFiltersOpen(false);
  };

  return (
    <Layout>
      <div className="overflow-x-hidden bg-[#fdf9f6] text-neutral-900 sm:bg-[#fffff7]" style={sans}>
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-28 pt-6 sm:pb-14 sm:pt-12 md:pt-20 lg:px-10">
        {/* Heading */}
        <h1 className="text-[28px] font-semibold leading-tight sm:hidden">Find housing</h1>
        <h1 className="hidden text-[45px] font-semibold leading-none sm:block" style={serif}>
          Find housing
        </h1>
        <p className="mt-2 text-[15px] text-neutral-500 sm:mt-3 sm:text-[17px]">
          <span className="sm:hidden">Verified student housing &amp; sublets in Peterborough</span>
          <span className="hidden sm:inline">
            Compare verified-community listings by rent, location, availability and more.
          </span>
        </p>

        {/* Mobile search (with mic) */}
        <label className="mt-5 flex h-[52px] items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 sm:hidden">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area, campus, keyword..."
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-neutral-500"
          />
          <img src="/img/Microphone.png" alt="" className="h-5 w-5 shrink-0 object-contain" />
        </label>

        {/* Mobile filters + sort */}
        <div className="mt-4 flex gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            className="flex h-12 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-[15px] font-medium text-[#02503f]"
          >
            <SlidersIcon />
            Filters
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#02503f] text-[12px] text-white">
              {filterCount}
            </span>
          </button>
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Sort listings</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-neutral-300 bg-white pl-4 pr-9 text-[14.5px]"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Sort: Price low to high</option>
              <option value="price-desc">Sort: Price high to low</option>
              <option value="newest">Sort: Newest</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown />
            </span>
          </label>
        </div>

        {/* Mobile filters panel (opens under the buttons) */}
        {filtersOpen && (
          <div className="mt-4 sm:hidden">
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              onApply={applyFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>
        )}

        {/* Quick filter chips (scroll sideways on mobile) */}
        <div className="-mx-4 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChip(c)}
              aria-pressed={chip === c}
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-[14.5px] font-medium ${
                chip === c
                  ? "border-[#02503f] bg-[#02503f] text-white"
                  : "border-neutral-300 bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search + post (tablet / desktop) */}
        <div className="mt-6 hidden flex-col gap-3 sm:flex sm:flex-row">
          <label className="flex h-[50px] min-w-0 flex-1 items-center gap-3 rounded-xl border-2 border-neutral-900 bg-white px-4">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course code, item, or campus pickup…"
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-neutral-500"
            />
          </label>
          <button
            onClick={onPostListing}
            className="flex h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] px-6 text-[15px] font-medium transition hover:brightness-95"
          >
            <PlusIcon />
            Post a Listing
          </button>
        </div>

        {/* Mobile notice */}
        <div className="mt-5 flex items-start gap-3 rounded-lg border border-l-4 border-neutral-200 border-l-[#f5a742] bg-white px-4 py-3 sm:hidden">
          <img src="/img/Orange Shield Check.png" alt="" className="mt-0.5 object-contain" />
          <p className="text-[14px] leading-relaxed text-neutral-600">
            Listings are posted by verified Trent community members. Always verify lease terms
            before making payments.
          </p>
        </div>

        {/* Safety notice (tablet / desktop) */}
        <div className="mt-5 hidden items-start gap-3 rounded-xl border-2 border-neutral-900 bg-white px-4 py-4 sm:flex sm:px-5">
          <span className="mt-0.5">
            <ShieldIcon />
          </span>
          <p className="text-[13px] leading-relaxed text-neutral-600 sm:text-[14px]">
            Listings are posted by verified Trent community members. Always verify lease terms in
            person or on official student channels before transferring deposits.{" "}
            <a href="#safety" className="font-medium text-[#02503f] underline underline-offset-2">
              Read renter safety guidelines
            </a>
            .
          </p>
        </div>

        {/* Sidebar + results */}
        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden sm:block">
            {/* Tablet toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="filters-panel"
              className="flex w-full items-center justify-between rounded-xl border-2 border-neutral-900 bg-white px-4 py-3 text-[15px] font-medium lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersIcon />
                Filters
              </span>
              <span className={`transition ${filtersOpen ? "rotate-180" : ""}`}>
                <ChevronDown />
              </span>
            </button>

            <div
              id="filters-panel"
              className={`${filtersOpen ? "mt-4 block" : "hidden"} lg:mt-0 lg:block`}
            >
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                onApply={applyFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            </div>
          </aside>

          <section className="min-w-0">
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-stretch sm:border-b sm:border-neutral-300/70 sm:pb-3 md:flex-row md:items-center">
              <h2 className="text-[17px] font-semibold sm:text-[20px] sm:font-medium">
                {totalListings} housing listings{" "}
                <span className="hidden text-[12px] font-normal text-neutral-500 sm:inline">
                  in Peterborough (Symons &amp; Downtown)
                </span>
              </h2>

              {/* Mobile: last updated */}
              <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#02503f] sm:hidden">
                <span className="h-2 w-2 rounded-full bg-[#02503f]" />
                Updated 12m ago
              </p>

              <label className="hidden items-center gap-2 text-[12.5px] text-neutral-500 sm:flex">
                Sort by:
                <span className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-lg border border-neutral-300 bg-white py-2 pl-3 pr-9 text-[13px] text-neutral-900"
                  >
                    <option value="recommended">Recommended (Verified)</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <ChevronDown />
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-5 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} onView={onViewListing} onMessage={onMessageListing} />
              ))}
            </div>

            {/* Roommate card (mobile only) */}
            <div className="mt-5 rounded-2xl border border-neutral-200 bg-[#f4f1ee] px-5 py-6 text-center sm:hidden">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#bfeee0]">
                <img src="/img/RMLocation.png" alt="" />
              </span>
              <h3 className="mt-3 text-[16px] font-semibold">Looking for a Trent roommate?</h3>
              <p className="mt-2 text-[13.5px] leading-snug text-neutral-500">
                Post your sublet or find students looking for joint leases on Nassau campus or East
                Bank.
              </p>
              <button
                type="button"
                className="mt-4 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#02503f]"
              >
                Browse Roommate Requests
              </button>
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              total={totalListings}
              shown={listings.length}
            />
          </section>
        </div>
      </main>

      {/* Footer (not on mobile, the tab bar is there instead) */}
      <footer className="hidden bg-[#1a1a1a] px-4 pb-10 pt-12 sm:block sm:pb-14 sm:pt-20 lg:px-[79px]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 text-[12px] text-[#8a8a80] md:flex-row md:items-center">
          <p>© 2024 TrentTrust Student Housing Bureau. Bound by Collegiate Trust Protocols.</p>
          <div className="flex items-center gap-3">
            <span>2px Ink Bound System</span>
            <span className="h-1 w-1 rounded-full bg-[#8a8a80]" />
            <span>Lumen Cream Standard</span>
          </div>
        </div>
      </footer>

      {/* Bottom tab bar (mobile only) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 sm:hidden">
        <ul className="grid grid-cols-5">
          {TABS.map((tab) => (
            <li key={tab.label}>
              <Link
                to={tab.to}
                className={`flex flex-col items-center gap-1 py-1.5 text-[13px] ${
                  tab.label === "Housing" ? "font-medium text-[#02503f]" : "text-neutral-800"
                }`}
              >
                <img src={tab.icon} alt="" className="h-6 w-6 object-contain" />
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </Layout>
  );
}