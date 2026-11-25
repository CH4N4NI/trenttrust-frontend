import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

// ---- Mock data (replace with your API later) ----
// each conversation has its own listing card and its own messages
// "tag" picks the little icon before the listing name: /img/Tag <tag>.png
const conversationsData = [
  {
    id: 1,
    name: "Alex M.",
    initials: "AM",
    avatar: "bg-[#6b4a6e] text-white",
    status: "online",
    unread: true,
    time: "10:42 AM",
    tag: "Crib",
    preview: "Hi! Yes, the room is still available for Sept 1. We can set up a viewing call.",
    listing: {
      kind: "Housing · West Bank",
      title: "Bright private room near campus",
      sub: "Includes all utilities · Available Sept 1",
      price: "$850",
      per: "/mo",
      image: "/img/Bright Private Room Near Campus.jpg",
      path: "/browse-housing/listing",
    },
    day: "Today, October 15",
    messages: [
      { id: 1, from: "me", text: "Hi Alex! I saw your room listing near West Bank. Is it still available for the Fall term? Also wanted to ask if utilities include heat and high-speed internet.", time: "10:35 AM", status: "Delivered" },
      { id: 2, from: "them", text: "Hi! Yes, the room is still available for Sept 1. We can set up a viewing call or in-person walk-through at your convenience.", time: "10:42 AM" },
      { id: 3, from: "them", text: "And yes, all utilities are 100% included in the $850/month rent — high-speed WiFi, heat, water, and hydro. There are no extra monthly bills.", time: "10:43 AM" },
      { id: 4, type: "notice" },
      { id: 5, from: "me", text: "That's great to hear! Would this Thursday afternoon around 3:30 PM work for a quick tour?", time: "10:46 AM", status: "Sent" },
    ],
  },
  {
    id: 2,
    name: "Jordan T.",
    initials: "JT",
    avatar: "bg-[#ebe8e6] text-neutral-700",
    status: "away",
    unread: false,
    time: "Yesterday",
    tag: "Apparel",
    preview: "Sounds good, I can meet by Bata Library tomorrow at 2 PM.",
    listing: {
      kind: "Apparel · Student Centre",
      title: "Columbia Omni-Heat Winter Parka (M)",
      sub: "Excellent · Student Centre pickup",
      price: "$65",
      per: "",
      image: "/img/Columbia Omni-Heat Winter Parka.jpg",
      path: "/marketplace/item",
    },
    day: "Yesterday",
    messages: [
      { id: 1, from: "them", text: "Sounds good, I can meet by Bata Library tomorrow at 2 PM.", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    name: "Maya S.",
    initials: "MS",
    avatar: "bg-[#8fdcc8] text-[#02503f]",
    status: "online",
    unread: true,
    time: "Oct 12",
    tag: "Book",
    preview: "Is the price negotiable to $40?",
    listing: {
      kind: "Textbooks · Bata Library",
      title: "Intro Psychology 11th Ed (PSYC 1020H)",
      sub: "Like new · Bata Library foyer",
      price: "$45",
      per: "",
      image: "/img/Intro Psychology 11th Ed.jpg",
      path: "/marketplace/item",
    },
    day: "Oct 12",
    messages: [
      { id: 1, from: "them", text: "Is the price negotiable to $40?", time: "Oct 12" },
    ],
  },
  {
    id: 4,
    name: "Liam K.",
    initials: "LK",
    avatar: "bg-[#ebe8e6] text-neutral-700",
    status: "none",
    unread: false,
    time: "Oct 8",
    tag: "Furniture",
    preview: "Thanks for picking it up! Good luck with exams.",
    listing: {
      kind: "Furniture · West Bank / Symons",
      title: "Ergonomic Mesh Desk Chair (Adjustable)",
      sub: "Good · West Bank / Symons",
      price: "$40",
      per: "",
      image: "/img/Ergonomic Mesh Desk Chair.jpg",
      path: "/marketplace/item",
    },
    day: "Oct 8",
    messages: [
      { id: 1, from: "them", text: "Thanks for picking it up! Good luck with exams.", time: "Oct 8" },
    ],
  },
];

// small avatar dot (online = green, away = grey, none = no dot)
function StatusDot({ status, className = "" }) {
  if (status === "none") return null;
  return (
    <span
      className={`absolute rounded-full border-2 border-white ${
        status === "online" ? "bg-[#02503f]" : "bg-neutral-400"
      } ${className}`}
    />
  );
}

export default function MessagesContent() {
  const [convs, setConvs] = useState(conversationsData);
  const [activeId, setActiveId] = useState(1);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [showChat, setShowChat] = useState(false); // phones only: list or chat
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const active = convs.find((c) => c.id === activeId);
  const unreadCount = convs.filter((c) => c.unread).length;

  const q = query.trim().toLowerCase();
  const visible = convs.filter(
    (c) =>
      (tab === "all" || c.unread) &&
      (!q || `${c.name} ${c.listing.title} ${c.preview}`.toLowerCase().includes(q))
  );

  // jump to the newest message when the chat changes or a message is sent
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeId, active.messages.length]);

  const openConversation = (id) => {
    setActiveId(id);
    setShowChat(true);
    // opening a chat marks it as read
    setConvs((list) => list.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setConvs((list) =>
      list.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, { id: Date.now(), from: "me", text, time, status: "Sent" }] }
          : c
      )
    );
    setDraft("");
  };

  const TABS = [
  { label: "Home", icon: "/img/Home.png", to: "/" },
  { label: "Housing", icon: "/img/Housing.png", to: "/browse-housing" },
  { label: "Market", icon: "/img/Market.png", to: "/marketplace" },
  { label: "Messages", icon: "/img/Messages.png", to: "/messages" },
  { label: "Post/Sell", icon: "/img/Post,Sell.png", to: "#" },
  ];

  return (
    <div className="bg-[#fdf9f6] px-4 pb-24 pt-6 text-neutral-900 lg:pt-14" style={sans}>
      <div className="mx-auto flex h-[calc(100vh-170px)] min-h-[560px] max-h-[780px] max-w-[1168px] overflow-hidden rounded-2xl border border-[#e6e0dc] bg-white">
        {/* ---------- LEFT: conversation list ---------- */}
        <aside
          className={`${showChat ? "hidden" : "flex"} w-full shrink-0 flex-col border-r border-[#e6e0dc] lg:flex lg:w-[360px]`}
        >
          <div className="px-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-[26px] font-bold leading-none">Messages</h1>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-[#02503f] px-3 py-1 text-[12.5px] font-medium text-white">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <button aria-label="New message">
                <img src="/img/Compose.png" alt="" />
              </button>
            </div>

            {/* Search */}
            <label className="mt-5 flex h-11 items-center gap-3 rounded-xl border border-[#e6e0dc] bg-[#f6f2ef] px-4">
              <img src="/img/Search.png" alt="" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations..."
                className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-neutral-500"
              />
            </label>

            {/* All / Unread */}
            <div className="mt-3 grid grid-cols-2 rounded-xl bg-[#f3efec] p-1 text-[14px]">
              <button
                onClick={() => setTab("all")}
                className={`rounded-lg py-2 ${tab === "all" ? "bg-white font-medium shadow-sm" : "text-neutral-500"}`}
              >
                All ({convs.length})
              </button>
              <button
                onClick={() => setTab("unread")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 ${tab === "unread" ? "bg-white font-medium shadow-sm" : "text-neutral-500"}`}
              >
                Unread <span className="h-1.5 w-1.5 rounded-full bg-[#f5a742]" /> ({unreadCount})
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="mt-3 flex-1 overflow-y-auto border-t border-[#eee9e5]">
            {visible.length === 0 && (
              <p className="px-6 py-10 text-center text-[14px] text-neutral-500">No conversations found.</p>
            )}
            {visible.map((c) => (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`flex w-full gap-3 border-b border-l-4 border-b-[#eee9e5] px-4 py-4 text-left ${
                  c.id === activeId ? "border-l-[#02503f] bg-[#f6f3ef]" : "border-l-transparent hover:bg-[#faf7f4]"
                }`}
              >
                <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[18px] ${c.avatar}`}>
                  {c.initials}
                  <StatusDot status={c.status} className="bottom-0 right-0 h-3 w-3" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span className="text-[16px] font-medium">{c.name}</span>
                      <span className="flex items-center gap-1 text-[12px] text-[#02503f]">
                        <img src="/img/Single Check.png" alt="" /> Verified
                      </span>
                    </span>
                    <span className={`flex items-center gap-2 text-[13px] ${c.unread ? "font-bold text-[#02503f]" : "text-neutral-500"}`}>
                      {c.time}
                      {c.unread && <span className="h-2 w-2 rounded-full bg-[#02503f]" />}
                    </span>
                  </span>
                  {/* little icon before the listing name (Tag Home / Tag Apparel / Tag Book / Tag Furniture) */}
                  <span className={`mt-1 flex items-center gap-1.5 text-[12px] ${c.tag === "Home" ? "text-[#02503f]" : "text-neutral-500"}`}>
                    <img src={`/img/Tag ${c.tag}.png`} alt="" />
                    <span className="truncate">{c.listing.title}</span>
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-[14.5px] leading-snug">{c.preview}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Verification strip at the bottom of the list */}
          <div className="flex shrink-0 items-center justify-center gap-2 border-t border-[#e5e2c4] bg-[#f4f2ef] py-3 text-[13px] text-neutral-500">
            <img src="/img/Green Padlock.png" alt="" />
            Trent ID Verification Guaranteed
          </div>
        </aside>

        {/* ---------- RIGHT: chat ---------- */}
        <section className={`${showChat ? "flex" : "hidden"} min-w-0 flex-1 flex-col bg-[#fcf9f7] lg:flex`}>
          {/* Header */}
          <header className="flex items-center justify-between gap-4 border-b border-[#e6e0dc] bg-white px-4 py-4 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              {/* back to the list (phones only, until the mobile design) */}
              <button onClick={() => setShowChat(false)} aria-label="Back to messages" className="text-[22px] lg:hidden">
                ←
              </button>
              <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[20px] ${active.avatar}`}>
                {active.initials}
                <StatusDot status={active.status} className="bottom-0 right-0 h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[22px] font-semibold leading-tight">{active.name}</h2>
                  <span className="flex items-center gap-1.5 rounded-full border border-[#02503f]/40 bg-[#e3efe9] px-3 py-0.5 text-[12.5px] text-[#02503f]">
                    <img src="/img/Double Check.png" alt="" /> Verified Trent member
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-[14px] text-neutral-500">
                  Listing:
                  <span className="max-w-[260px] truncate font-medium text-neutral-900">{active.listing.title}</span>
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-4 md:flex">
              <button
                onClick={() => navigate(active.listing.path)}
                className="flex items-center gap-2 rounded-xl border border-[#e0d9d3] bg-[#f3efe9] p-1.5 pr-3 text-[13px]"
              >
                <img src={active.listing.image} alt="" className="h-8 w-8 rounded-md object-cover" />
                View Listing
                <img src="/img/External Link.png" alt="" />
              </button>
              <span className="h-8 w-px bg-neutral-300" />
              <button className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                <img src="/img/Grey Flag.png" alt="" /> Report
              </button>
              <button className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                <img src="/img/Block.png" alt="" /> Block
              </button>
              <button aria-label="More options">
                <img src="/img/More.png" alt="" />
              </button>
            </div>
          </header>

          {/* Safety banner (stays at the top while the messages scroll) */}
          <div className="flex items-start gap-3 rounded-2xl border border-neutral-900 bg-white px-5 py-3.5">
            <img src="/img/Orange Shield.png" alt="" className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4">
                <p className="text-[14px] font-bold">Keep your conversation on TrentTrust</p>
                <a href="#safety" className="flex items-center gap-1 text-[12.5px] font-bold text-[#8a5200]">
                  Read student safety tips <img src="/img/Brown Arrow.png" alt="" />
                </a>
              </div>
              <p className="mt-1 text-[13.5px] leading-snug text-neutral-600">
                Avoid sending deposits, personal phone numbers, or external payment links before verifying the room in person. TrentTrust does not process lease wires.
              </p>
            </div>
          </div>

          {/* Messages (scroll up for older ones) */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-4 pt-3 lg:px-8">
            {/* Listing card */}
            <button
              onClick={() => navigate(active.listing.path)}
              className="mx-auto flex w-full max-w-[448px] items-center gap-4 rounded-2xl border border-[#e6e0dc] bg-white p-3.5 text-left"
            >
              <img src={active.listing.image} alt="" className="h-[78px] w-[78px] shrink-0 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold uppercase tracking-wide text-[#02503f]">{active.listing.kind}</span>
                <span className="mt-0.5 block truncate text-[15px] font-bold">{active.listing.title}</span>
                <span className="mt-0.5 block truncate text-[12.5px] text-neutral-500">{active.listing.sub}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[18px] font-bold leading-none">
                  {active.listing.price}
                  <span className="text-[13px] font-normal text-neutral-500">{active.listing.per}</span>
                </span>
                <span className="flex h-8 w-5 items-center justify-center rounded-full bg-[#f3efe9]">
                  <img src="/img/Chevron Right.png" alt="" />
                </span>
              </span>
            </button>

            {/* Day */}
            <p className="mx-auto mt-5 w-fit rounded-full border border-[#e6e0dc] bg-[#f6f2ef] px-4 py-1 text-[13px] text-neutral-500">
              {active.day}
            </p>

            {active.messages.map((m, i) => {
              // safety reminder in the middle of the chat
              if (m.type === "notice") {
                return (
                  <p key={m.id} className="mx-auto mt-5 flex w-fit max-w-full items-center gap-2 rounded-full border border-[#e8e3a6] bg-[#fffbe0] px-4 py-2 text-[13px]">
                    <img src="/img/Green Shield User.png" alt="" />
                    Safety check: Never wire funds or e-transfer deposits before an on-campus or live video walkthrough.
                  </p>
                );
              }

              // my messages: lavender bubble on the right
              if (m.from === "me") {
                return (
                  <div key={m.id} className="mt-5 flex flex-col items-end">
                    <p className="max-w-[88%] rounded-2xl rounded-br-md bg-[#F0D7FF] px-5 py-4 text-[17px] leading-relaxed lg:max-w-[560px]">
                      {m.text}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-neutral-500">
                      {m.time} • {m.status === "Delivered" ? (
                        <span className="flex items-center gap-1 text-[#02503f]">
                          Delivered <img src="/img/Double Check.png" alt="" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          Sent <img src="/img/Sent Tick.png" alt="" />
                        </span>
                      )}
                    </p>
                  </div>
                );
              }

              // their messages: white bubble on the left, avatar only on the first of a run
              const first = active.messages[i - 1]?.from !== "them";
              return (
                <div key={m.id} className="mt-5 flex items-start gap-3">
                  {first ? (
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] ${active.avatar}`}>
                      {active.initials}
                    </span>
                  ) : (
                    <span className="w-8 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="max-w-[560px] rounded-2xl rounded-bl-md border border-[#ece6e1] bg-white px-5 py-4 text-[17px] leading-relaxed">
                      {m.text}
                    </p>
                    <p className="mt-1.5 text-[12.5px] text-neutral-500">{m.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <form onSubmit={sendMessage} className="flex items-center gap-3 border-t border-[#e6e0dc] bg-white px-4 py-4 lg:px-6">
            <button type="button" aria-label="Attach a file" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6e0dc] bg-white">
              <img src="/img/Attach.png" alt="" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="h-12 min-w-0 flex-1 rounded-2xl bg-[#f3efec] px-5 text-[16px] outline-none placeholder:text-neutral-500"
            />
            <button type="submit" className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#F0D7FF] px-6 text-[15px] font-bold transition hover:brightness-95">
              <img src="/img/Send.png" alt="" /> Send
            </button>
          </form>
        </section>
        
        {/* Bottom tab bar (mobile only) */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 sm:hidden">
          <ul className="grid grid-cols-5">
            {TABS.map((tab) => (
              <li key={tab.label}>
                <Link
                  to={tab.to}
                  className={`flex flex-col items-center gap-1 py-1.5 text-[13px] ${
                    tab.label === "Messages"
                      ? "font-medium text-[#02503f]"
                      : "text-neutral-800"
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
    </div>
  );
}