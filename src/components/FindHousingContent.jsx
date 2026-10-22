import { useState } from "react";
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

const LISTINGS = [
  {
    id: 1,
    image: "/img/housing-1.jpg",
    badge: "Available Sept 1",
    price: "$850",
    per: "month",
    title: "Bright private room near Symons Campus",
    meta: "Private room · Furnished · All utilities incl.",
    location: "Near Symons Campus · 12 min by transit",
    icon: "bus",
  },
  {
    id: 2,
    image: "/img/housing-2.jpg",
    badge: "Available May 1 (Sublet)",
    price: "$780",
    per: "month",
    title: "Summer Sublet in Downtown Peterborough",
    meta: "Private room · Furnished · Utilities incl.",
    location: "Downtown Peterborough · Direct bus to campus",
    icon: "bus",
  },
  {
    id: 3,
    image: "/img/housing-3.jpg",
    badge: "Available Sept 1",
    price: "$920",
    per: "month",
    title: "Ensuite room with private bath",
    meta: "Private room · In-suite laundry · Parking incl.",
    location: "North Peterborough · 8 min bike / transit",
    icon: "bike",
  },
  {
    id: 4,
    image: "/img/housing-4.jpg",
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
    image: "/img/housing-5.jpg",
    badge: "Available Sept 1",
    price: "$825",
    per: "month",
    title: "Upper-floor bedroom in 4-bedroom house",
    meta: "Private room · Furnished · Central AC",
    location: "Near Trent Athletics Centre · 10 min trail walk",
    icon: "walk",
  },
  {
    id: 6,
    image: "/img/housing-6.jpg",
    badge: "Available Sept 1",
    price: "$1,350",
    per: "total",
    title: "2-Bedroom Flat for Student",
    meta: "Entire place · Unfurnished · Water incl.",
    location: "Peterborough Central · Route 7 Direct",
    icon: "bus",
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
  <Svg className="h-5 w-5" stroke="#E8912D">
    <path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3z" />
  </Svg>
);

const SlidersIcon = () => (
  <Svg>
    <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="8" cy="17" r="2" />
  </Svg>
);

const BookmarkIcon = ({ filled }) => (
  <Svg className="h-4 w-4" sw={1.8}>
    <path
      d="M7 4h10a1 1 0 011 1v15l-6-4-6 4V5a1 1 0 011-1z"
      fill={filled ? "currentColor" : "none"}
    />
  </Svg>
);

const CheckCircle = () => (
  <Svg className="h-3.5 w-3.5" sw={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.3l2.4 2.4 4.6-4.9" />
  </Svg>
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

const TransitIcon = ({ type }) => {
  const color = "#02503f";
  if (type === "bike")
    return (
      <Svg className="h-4 w-4" stroke={color} sw={1.8}>
        <circle cx="6" cy="16" r="3.2" />
        <circle cx="18" cy="16" r="3.2" />
        <path d="M6 16l4-8h4l4 8M10 8H8M13 12H8.5" />
      </Svg>
    );
  if (type === "walk")
    return (
      <Svg className="h-4 w-4" stroke={color} sw={1.8}>
        <circle cx="13" cy="5" r="1.8" />
        <path d="M12 9l-2.5 4 3 2.5L11 21M12 9l4 2.5 2 3M9.5 13L7 15" />
      </Svg>
    );
  return (
    <Svg className="h-4 w-4" stroke={color} sw={1.8}>
      <rect x="5" y="4" width="14" height="13" rx="2" />
      <path d="M5 11h14M8 20v-3M16 20v-3" />
      <circle cx="9" cy="14" r="0.6" fill={color} />
      <circle cx="15" cy="14" r="0.6" fill={color} />
    </Svg>
  );
};

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

function ListingCard({ listing, onView }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white">
      <div className="relative aspect-[4/3] bg-neutral-200">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full border border-neutral-300 bg-white px-3 py-1 text-[12px]">
          {listing.badge}
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save listing"}
          aria-pressed={saved}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white"
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[24px] font-semibold leading-none">{listing.price}</span>
          <span className="text-[13px] text-neutral-500">/ {listing.per}</span>
        </p>
        <h3 className="mt-3 truncate text-[17px] font-semibold">{listing.title}</h3>
        <p className="mt-2 text-[14px] leading-snug text-neutral-600">{listing.meta}</p>

        <p className="mt-3 flex items-center gap-2 border-b border-neutral-200 pb-1.5 text-[12px] text-neutral-500">
          <TransitIcon type={listing.icon} />
          <span className="truncate">{listing.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
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
    <div className="mt-8 flex flex-col-reverse items-center gap-4 border-t border-neutral-300/70 pt-6 sm:flex-row sm:justify-between">
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

export default function FindHousingContent({
  listings = LISTINGS,
  totalListings = 24,
  onPostListing = () => {},
  onViewListing = () => {},
  onApplyFilters = () => {},
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile only
  const [page, setPage] = useState(1);

  const applyFilters = () => {
    onApplyFilters(filters);
    setFiltersOpen(false);
  };

  return (
    <Layout>
      <div className="overflow-x-hidden bg-[#fffff7] text-neutral-900" style={sans}>
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-14 pt-12 md:pt-20 lg:px-10">
        {/* Heading */}
        <h1 className="text-[40px] font-semibold leading-none sm:text-[52px]" style={serif}>
          Find housing
        </h1>
        <p className="mt-3 text-[15px] text-neutral-500 sm:text-[17px]">
          Compare verified-community listings by rent, location, availability and more.
        </p>

        {/* Search + post */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

        {/* Safety notice */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border-2 border-neutral-900 bg-white px-4 py-4 sm:px-5">
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
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <aside>
            {/* Mobile toggle */}
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
            <div className="flex flex-col gap-3 border-b border-neutral-300/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[20px] font-medium">
                {totalListings} housing listings{" "}
                <span className="block text-[12px] font-normal text-neutral-500 sm:inline">
                  in Peterborough (Symons &amp; Downtown)
                </span>
              </h2>

              <label className="flex items-center gap-2 text-[12.5px] text-neutral-500">
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

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} onView={onViewListing} />
              ))}
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

      {/* Footer (move this into your shared layout if other pages use it) */}
      <footer className="bg-[#1a1a1a] px-4 py-8 text-[12.5px] text-neutral-400 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 TrentTrust Student Housing Bureau. Bound by Collegiate Trust Protocols.</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>2px Ink Bound System</span>
            <span aria-hidden="true">•</span>
            <span>Lumen Cream Standard</span>
          </p>
        </div>
      </footer>
      </div>
    </Layout>
  );
}