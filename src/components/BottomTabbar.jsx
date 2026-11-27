import { Link } from "react-router-dom";

const TABS = [
  { label: "Home", icon: "/img/Home.png", to: "/" },
  { label: "Housing", icon: "/img/Housing.png", to: "/browse-housing" },
  { label: "Market", icon: "/img/Market.png", to: "/marketplace" },
  { label: "Messages", icon: "/img/Messages.png", to: "/messages" },
  { label: "Post/Sell", icon: "/img/Post,Sell.png", to: "/listings" },
];

export default function BottomTabBar({ active, hideAt = "md" }) {
  // "md" = hidden from 768px up, "lg" = hidden from 1024px up
  const hide = hideAt === "lg" ? "lg:hidden" : "md:hidden";
  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 ${hide}`}
    >
      <ul className="grid grid-cols-5">
        {TABS.map((t) => (
          <li key={t.label}>
            <Link
              to={t.to}
              className={`flex flex-col items-center gap-1 py-1.5 text-[13px] ${
                t.label === active ? "font-medium text-[#02503f]" : "text-neutral-800"
              }`}
            >
              <img src={t.icon} alt="" className="h-6 w-6 object-contain" />
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}