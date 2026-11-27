import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
// same serif as the "What are you listing?" heading. Swap for whatever font your headings already use.
const serif = { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" };

// ---- Mobile bottom tab bar (same as the one on the Messages page) ----
const TABS = [
  { label: "Home", icon: "/img/Home.png", to: "/" },
  { label: "Housing", icon: "/img/Housing.png", to: "/browse-housing" },
  { label: "Market", icon: "/img/Market.png", to: "/marketplace" },
  { label: "Messages", icon: "/img/Messages.png", to: "/messages" },
  { label: "Post/Sell", icon: "/img/Post,Sell.png", to: "/listings" },
];
// which tab is highlighted green on this page (your design shows "Housing"; use "Post/Sell" if you prefer)
const ACTIVE_TAB = "Housing";

// ---- The steps shown in the progress pills ----
const STEPS = ["Type", "Details", "Confirm"];
const CURRENT_STEP = 1; // 1-based

const OPTIONS = [
  {
    id: "housing",
    icon: "/img/Sublet.png",
    title: "Housing or sublet",
    text: "A room, apartment, or house for a verified student to take over. Includes structured rent, distance, utilities, and amenities — plus optional video tours.",
    to: "/post/housing",
  },
  {
    id: "marketplace",
    icon: "/img/Box.png",
    title: "Marketplace item",
    text: "Textbooks, winter apparel, electronics, or furniture. List with photos, condition, price, and a safe public pickup spot.",
    badge: "30-day verified cycle",
    to: "/post/marketplace",
  },
];

export default function ListingTypeContent() {
  const [choice, setChoice] = useState("housing");
  const navigate = useNavigate();

  const selected = OPTIONS.find((o) => o.id === choice);
  const goNext = () => navigate(selected.to);

  return (
    <div
      // the navbar is its own component, so this only fills the space under it
      className="flex min-h-[calc(100vh-100px)] flex-col bg-[#fffff7] pb-20 text-neutral-900 md:pb-0"
      style={sans}
    >
      <main className="flex-1 px-4 pb-8 pt-6 md:pb-0 md:pt-12 lg:pt-14">
        {/* ---------- Progress pills (full width on phones, centred on desktop) ---------- */}
        <ol className="flex w-full items-center md:mx-auto md:w-fit" aria-label="Progress">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const isCurrent = n === CURRENT_STEP;
            return (
              <li
                key={label}
                className={`flex items-center ${i > 0 ? "flex-1 md:flex-none" : ""}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {i > 0 && <span className="mx-2 h-px flex-1 bg-[#dedcc8] md:mx-3 md:w-8 md:flex-none" />}
                <span
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] md:text-[12.5px] ${
                    isCurrent
                      ? "border-neutral-900/30 bg-[#F0D7FF] font-medium text-neutral-900 md:border-neutral-900"
                      : "border-[#e6e4cf] bg-white/60 text-neutral-500"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                      isCurrent ? "bg-neutral-900 text-white" : "bg-[#e3e2cc] text-neutral-500"
                    }`}
                  >
                    {n}
                  </span>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* ---------- Heading ---------- */}
        <h1
          className="mt-8 text-[34px] font-semibold leading-tight tracking-tight md:mt-14 md:text-center md:text-[50px] md:font-normal"
          style={serif}
        >
          What are you listing?
        </h1>

        {/* ---------- Choice cards ---------- */}
        <div
          role="radiogroup"
          aria-label="Listing type"
          className="mx-auto mt-6 grid max-w-[896px] gap-4 md:mt-12 md:grid-cols-2 md:gap-8"
        >
          {OPTIONS.map((o) => {
            const on = o.id === choice;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setChoice(o.id)}
                className={`flex flex-col rounded-3xl border-2 bg-[#fffff9] p-5 text-left transition md:min-h-[300px] md:rounded-[40px] md:p-10 ${
                  on ? "border-[#0b4f45]" : "border-[#e6e6d0] hover:border-[#cfcfb4]"
                }`}
              >
                <span className="flex w-full items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl md:h-12 md:w-12 ${
                      on ? "bg-[#e3ece8]" : "bg-[#ecebdc]"
                    }`}
                  >
                    <img src={o.icon} alt="" className="h-6 w-6 object-contain" />
                  </span>
                  {/* phones only */}
                  {o.badge && <span className="text-[12px] text-neutral-500 md:hidden">{o.badge}</span>}
                </span>

                <span className="mt-5 block text-[20px] font-medium leading-tight md:mt-10 md:text-[22px]">{o.title}</span>
                <span className="mt-3 block text-[14.5px] leading-[1.65] text-neutral-700 md:text-[16px]">{o.text}</span>

                {/* phones only: divider at the bottom of the card */}
                <span className="mt-5 block border-t border-[#ecebd8] md:hidden" />
              </button>
            );
          })}
        </div>
      </main>

      {/* ---------- Actions: full-width bar on phones, plain row on desktop ---------- */}
      <div className="mt-6 border-t border-[#e6e4c8] bg-[#fffee9] px-4 py-4 md:mt-12 md:border-0 md:bg-transparent md:pb-16 md:pt-0">
        <div className="mx-auto max-w-[896px] md:border-t md:border-[#e6e4d2] md:pt-4">
          {/* phone */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={goNext}
              className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-neutral-900/30 bg-[#F0D7FF] text-[16px] font-medium transition active:brightness-95"
            >
              Continue <img src="/img/Arrow Right.png" alt="" />
            </button>
            <p className="mt-3 text-center text-[12px] text-neutral-500">
              You can cancel or switch categories at any time without losing draft info.
            </p>
          </div>

          {/* desktop */}
          <div className="hidden items-center justify-between md:flex">
            <p className="text-[12px] text-neutral-500">
              You can cancel or switch categories at any time without losing draft information.
            </p>
            <div className="flex items-center gap-6">
              <button type="button" className="text-[14px] text-neutral-500 hover:text-neutral-800">
                Save as draft
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-[46px] items-center gap-2 rounded-xl border border-neutral-900 bg-[#F0D7FF] px-8 text-[14.5px] font-medium transition hover:brightness-95"
              >
                Continue <img src="/img/Arrow Right.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Bottom info bar (desktop only) ---------- */}
      <footer className="hidden border-t border-[#e6e4c8] bg-[#fffee9] px-16 py-3.5 text-[12px] text-neutral-500 md:block">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#02503f]" />
            Trent University Verified Peer Network · Symons &amp; Durham GTA Campuses
          </p>
          <p>
            Step {CURRENT_STEP} of {STEPS.length} · Choosing listing category
          </p>
        </div>
      </footer>

      {/* ---------- Bottom tab bar (mobile) ---------- */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 md:hidden">
        <ul className="grid grid-cols-5">
          {TABS.map((t) => (
            <li key={t.label}>
              <Link
                to={t.to}
                className={`flex flex-col items-center gap-1 py-1.5 text-[13px] ${
                  t.label === ACTIVE_TAB ? "font-medium text-[#02503f]" : "text-neutral-800"
                }`}
              >
                <img src={t.icon} alt="" className="h-6 w-6 object-contain" />
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}