import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Housing", to: "/housing" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Messages", to: "/messages", dot: true },
  { label: "Saved", to: "/saved" },
  { label: "Listings", to: "/listings" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1.5 sm:gap-3">
      <img src="/img/logo.png" alt="" className="h-8 w-8 shrink-0 sm:h-auto sm:w-auto" />

      <span className="whitespace-nowrap font-serif text-[18px] leading-none text-[#161616] sm:text-[26px]">
        Trent<span className="font-semibold text-[#00524a]">Trust</span>
      </span>
    </Link>
  );
}

const Navbar = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffff7] text-[#161616]">
      <header className="mx-4 mt-6 lg:mx-16">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border-2 border-[#161616] bg-white px-3 py-3 sm:px-6">
          <Logo />

          {/* desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className="flex cursor-pointer items-center gap-2 text-[15px] font-medium text-[#161616] hover:text-[#00524a]"
                >
                  {link.label}
                  {link.dot && (
                    <span className="h-2 w-2 rounded-full bg-[#00524a]" />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              aria-label="Notifications"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f1efd9] sm:h-11 sm:w-11"
            >
              <img src="/img/Notifications.png" alt="" />
            </button>

            <button
              aria-label="Profile"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#00403a] sm:h-11 sm:w-11"
            >
              <img src="/img/User.png" alt="" />
            </button>

            {/* hamburger button, phones and small tablets only */}
            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#161616] bg-white sm:h-11 sm:w-11 md:hidden"
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
          <ul className="mx-auto mt-2 flex max-w-[1280px] flex-col rounded-3xl border-2 border-[#161616] bg-white p-2 md:hidden">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-medium text-[#161616] hover:bg-[#f1efd9]"
                >
                  {link.label}
                  {link.dot && (
                    <span className="h-2 w-2 rounded-full bg-[#00524a]" />
                  )}
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