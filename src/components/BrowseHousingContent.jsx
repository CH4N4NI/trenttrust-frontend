import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Check({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

const listings = [
  {
    id: 1,
    image: "/img/WaterStreetCollegiate.png",
    zone: "4 Bed Heritage",
    title: "Water Street Collegiate Row",
    transit: "~14 min direct bus to Symons Campus",
    transitIcon: "/img/Bus.png",
    description:
      "Private second-floor bedroom in an upper-year undergraduate house with a shared kitchen and fast Wi-Fi.",
    price: 780,
    term: "Lease to Apr 2026",
    tags: [
      { label: "Verified Lister", check: true },
      { label: "Video tour", check: true },
      { label: "All utilities inc." },
    ],
  },
  {
    id: 2,
    image: "/img/GeorgeStreetNorth.jpg",
    zone: "Traill College Zone",
    title: "George Street North Residence",
    transit: "~12 min walk to Trail College downtown",
    transitIcon: "/img/Walking.png",
    description:
      "Spacious corner unit with tall ceilings and transit stop right outside. Quiet, bright and close to downtown.",
    price: 825,
    term: "Sublet May – Aug 2025",
    tags: [
      { label: "Verified Lister", check: true },
      { label: "Recorded live tour" },
      { label: "Female identified shared" },
    ],
  },
  {
    id: 3,
    image: "/img/StewartStreetHeritage.jpg",
    zone: "Ground Floor Flat",
    title: "Stewart Street Heritage Flat",
    transit: "Direct bus to Symons on Route 11",
    transitIcon: "/img/Bus.png",
    description:
      "Comfortable quiet bedroom in a preserved brick duplex. Private closet and a desk by the window.",
    price: 740,
    term: "Flexible academic term",
    tags: [
      { label: "Verified Lister", check: true },
      { label: "4 photos" },
      { label: "Private in-app relay" },
    ],
  },
];

const filters = [
  { label: "Under $850 CAD" },
  { label: "Route 2 direct", icon: "/img/Bus.png" },
  { label: "Fall 2025" },
  { label: "Video tour on file", icon: "/img/Camera.png" },
];

function GuestBanner() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border-2 border-[#161616] bg-[#e4e2cd] px-6 py-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <img src="/img/Lock Shield.png" alt="" />
        <p className="text-[15px] font-medium text-[#161616]">
          You’re browsing as a guest — verify to message and list.
        </p>
      </div>
      <Link
        to="/student-verification"
        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-[#161616] bg-[#efd6ff] px-5 py-1.5 text-[14px] font-medium text-[#161616] transition hover:brightness-95"
      >
        Verify now
        <img src="/img/rightarrow.png" alt="" className="h-3.5 w-3.5 object-contain" />
      </Link>
    </div>
  );
}

function ListingCard({ item }) {
  return (
    <article className="flex flex-col rounded-[28px] border border-[#161616]/50 p-5 sm:rounded-[40px] sm:p-8">
      <div className="relative overflow-hidden rounded-[28px] border-2 border-[#161616]">
        <img src={item.image} alt={item.title} className="h-[209px] w-full object-cover" />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full border-2 border-black bg-[#00403a] px-3 py-1 text-[12px] font-medium text-white">
          <Check className="h-3 w-3" /> Trent ID Verified
        </span>
        <span className="absolute bottom-3 right-3 rounded-lg border-2 bg-[#fffff0] px-2.5 py-0.5 text-[12px] font-medium text-[#161616]">
          {item.zone}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag.label}
            className="flex items-center gap-1 rounded-full border-2 border-[#161616] bg-[#fffff0] px-2.5 py-0.5 text-[12px] font-medium text-[#161616]"
          >
            {tag.check && <Check className="h-2.5 w-2.5" />}
            {tag.label}
          </span>
        ))}
      </div>

      <h3 className="mt-5 text-[24px] font-medium leading-tight text-[#161616]">{item.title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-[#00524a]">
        <img src={item.transitIcon} alt="" className="h-4 w-4 object-contain" />
        {item.transit}
      </p>
      <p className="mt-1 line-clamp-2 text-[15px] leading-snug text-[#161616]/70">{item.description}</p>

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-3 border-t-2 border-[#161616]/15 pt-5">
          <p className="text-[22px] font-semibold text-[#161616]">
            ${item.price} CAD <span className="text-[15px] font-normal text-[#161616]/50">/mo</span>
          </p>
          <span className="max-w-[130px] text-right text-[11px] uppercase leading-tight tracking-wide text-[#161616]/50">
            {item.term}
          </span>
        </div>

        <button className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-[#161616] bg-[#fffff0] py-3 text-[15px] font-medium text-[#161616] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#161616] active:translate-y-0 active:shadow-none">
          <img src="/img/BlackPadlock.png" alt="" className="h-4 w-4 object-contain" />
          Verify to contact subletter
        </button>
      </div>
    </article>
  );
}

function ProtocolBox() {
  return (
    <section className="mt-10 rounded-[2rem] bg-[#1a1a1a] px-6 py-10 text-white sm:rounded-[3rem] sm:px-8 sm:py-12 lg:px-14">
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-[#00524a] px-3 py-1 text-[12px] font-medium">
        <Check className="h-3 w-3" /> Official Bureau Protocol
      </span>
      <h2 className="mt-5 font-serif text-[24px] leading-tight sm:text-[32px]">Why are direct messages locked for guests?</h2>
      <p className="mt-4 max-w-[950px] text-[16px] leading-snug text-white/85 sm:text-[18px]">
        TrentTrust maintains a zero-fraud collegiate perimeter. To safeguard student deposits and curb rental
        marketplace predators, sub-lease communication requires verified Trent University credentials (@trentu.ca).
      </p>
    </section>
  );
}

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

function BrowseHousing() {
  return (
    <Layout>
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-8 pt-8 md:pt-16 lg:px-10">
        <GuestBanner />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:mt-12 md:flex-row md:items-center">
          <h1 className="font-serif text-[32px] leading-none text-[#161616] sm:text-[40px] md:text-[56px]">
            Verified Student Housing
          </h1>
          <span className="flex items-center gap-2 rounded-lg border-2 border-[#161616] px-4 py-2 text-[12px] font-medium text-[#161616]">
            <img src="/img/Verified Seal.png" alt="" className="h-4 w-4 object-contain" />
            100% Student-Verified Sublets Only
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[#161616] bg-[#00524a] px-4 py-2 text-[14px] font-medium text-white">
            All Prices
            <img src="/img/Chevron Down.png" alt="" />
          </button>
          {filters.map((filter) => (
            <button
              key={filter.label}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[#161616] bg-[#fffff0] px-4 py-2 text-[14px] font-medium text-[#161616] transition hover:bg-[#f1efd9]"
            >
              {filter.icon && <img src={filter.icon} alt="" className="h-3.5 w-3.5 object-contain" />}
              {filter.label}
            </button>
          ))}
        </div>

        <hr className="mt-6 border-t-2 border-[#161616]" />

        <div className="relative mt-6">
          <img
            src="/img/Search.png"
            alt=""
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 object-contain"
          />
          <input
            type="text"
            placeholder="Search by course code, item, or campus pickup..."
            className="w-full rounded-xl border-2 border-[#161616] bg-[#fffff0] py-4 pl-12 pr-4 text-[15px] text-[#161616] outline-none placeholder:text-[#161616]/50 focus:border-[#00524a]"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} item={listing} />
          ))}
        </div>

        <ProtocolBox />
      </main>

      <Footer />
    </Layout>
  );
}

export default BrowseHousing;