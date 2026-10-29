import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Housing", to: "/browse-housing" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Messages", to: "/messages", dot: true },
  { label: "Saved", to: "/saved" },
  { label: "Listings", to: "/listings" },
];

// flat = the marketplace mobile design: logo icon only (the home button) below md
function Logo({ flat }) {
  return (
    <Link to="/" aria-label="TrentTrust home" className="flex items-center gap-1.5 sm:gap-3">
      <img
        src="/img/logo.png"
        alt=""
        className={`shrink-0 object-contain ${flat ? "h-10 w-10 md:h-auto md:w-auto" : "h-8 w-8 sm:h-auto sm:w-auto"}`}
      />

      <span
        className={`whitespace-nowrap font-serif text-[18px] leading-none text-[#161616] sm:text-[26px] ${
          flat ? "hidden md:inline" : ""
        }`}
      >
        Trent<span className="font-semibold text-[#00524a]">Trust</span>
      </span>
    </Link>
  );
}

// flatOnMobile: below md the bar is a flat full-width strip (no rounded pill).
// Pass flatOnMobile={false} to keep the rounded pill on mobile.
const Navbar = ({ children, flatOnMobile = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const flat = flatOnMobile;
  const btn = flat ? "h-10 w-10 md:h-11 md:w-11" : "h-9 w-9 sm:h-11 sm:w-11";
  const gap = flat ? "gap-2 md:gap-3" : "gap-2.5 sm:gap-3";

  return (
    <div className="min-h-screen bg-[#fffff7] text-[#161616]">
      <header className={flat ? "mx-0 mt-0 md:mx-4 md:mt-6 lg:mx-16" : "mx-4 mt-6 lg:mx-16"}>
        <nav
          className={`mx-auto flex max-w-[1280px] items-center justify-between py-3 ${
            flat
              ? "border-b-2 border-[#161616] bg-[#fffff7] px-4 md:rounded-full md:border-2 md:bg-white md:px-6"
              : "rounded-full border-2 border-[#161616] bg-white px-3 sm:px-6"
          }`}
        >
          <Logo flat={flat} />

          {/* desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className="flex cursor-pointer items-center gap-2 text-[15px] font-medium text-[#161616] hover:text-[#00524a]"
                >
                  {link.label}
                  {link.dot && <span className="h-2 w-2 rounded-full bg-[#00524a]" />}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={`flex items-center ${gap}`}>
            <button
              aria-label="Notifications"
              className={`flex ${btn} cursor-pointer items-center justify-center rounded-full bg-[#f1efd9]`}
            >
              <img src="/img/Notifications.png" alt="" />
            </button>

            <button
              aria-label="Profile"
              className={`flex ${btn} cursor-pointer items-center justify-center rounded-full bg-[#00403a]`}
            >
              <img src="/img/User.png" alt="" />
            </button>

            {/* hamburger button, phones and small tablets only */}
            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex ${btn} cursor-pointer items-center justify-center rounded-full border-2 border-[#161616] bg-white md:hidden`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="#161616"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* mobile dropdown */}
        {menuOpen && (
          <ul
            className={`flex flex-col md:hidden ${
              flat
                ? "border-b-2 border-[#161616] bg-[#fffff7] px-2 py-2"
                : "mx-auto mt-2 max-w-[1280px] rounded-3xl border-2 border-[#161616] bg-white p-2"
            }`}
          >
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-medium text-[#161616] hover:bg-[#f1efd9]"
                >
                  {link.label}
                  {link.dot && <span className="h-2 w-2 rounded-full bg-[#00524a]" />}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </header>

      {children}
    </div>
  );
};

export default Navbar;