import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "./BottomTabbar";

const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
const serif = { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" };

const SHOW_TAB_BAR = false;


const STEPS = [{ label: "Type" }, { label: "Details", full: "Details (Marketplace)" }, { label: "Confirm" }];
const CURRENT_STEP = 2; // 1-based

const CATEGORIES = [
  { id: "Textbooks", icon: "/img/Cat Textbooks.png", photos: ["Front", "Spine", "Pages", "Extra"] },
  { id: "Winter Apparel", mobileLabel: "Winter Wear", icon: "/img/Cat Apparel.png", photos: ["Front", "Back", "Tag", "Extra"] },
  { id: "Electronics", icon: "/img/Cat Electronics.png", photos: ["Front", "Ports", "Screen", "Extra"] },
  { id: "Furniture", icon: "/img/Cat Furniture.png", photos: ["Front", "Side", "Detail", "Extra"] },
];

const CONDITIONS = ["New", "Like new", "Good (Minor highlighting, clean spine)", "Fair", "Well used"];


const INITIAL = {
  title: "Campbell Biology 3rd Canadian Edition (Hardcover)",
  category: "Textbooks",
  price: "65",
  condition: CONDITIONS[2],
  description:
    "Used for BIOL 1020H in Fall term. Minor highlighting in chapters 4-6, but binding is pristine and includes untouched online study portal access code card.",
  courseCode: "BIOL 1020H",
  edition: "3rd Canadian Edition",
  pickup: "Symons campus (Bata Library or Student Centre)",
  availability: "Available now (Can meet between classes)",
};

// no height here: each use adds its own (phones are slightly shorter than desktop)
const inputBase =
  "w-full rounded-xl border border-[#e6e4cf] bg-[#f8f7ee] px-4 text-[14.5px] outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 md:border-2 md:border-[#e6e6d0] md:bg-[#fffff9]";
const inputCls = `${inputBase} h-[42px] md:h-11`;

// ---------- small building blocks ----------
function Section({ icon, mobileIcon, title, children }) {
  return (
    <section className="min-w-0">
      <h2 className="flex items-center gap-2.5 border-b border-[#e6e4cf] pb-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#02503f] md:border-[#e6e6d0] md:text-[14px] md:font-medium md:tracking-[0.08em] md:text-neutral-900">
        <img src={mobileIcon ?? icon} alt="" className="h-4 w-4 object-contain md:hidden" />
        <img src={icon} alt="" className="hidden h-4 w-4 object-contain md:block" />
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, required, hint, hintClass = "", id, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
        {label}
        {required && <span className="text-[#d9480f] md:hidden"> *</span>}
      </label>
      {children}
      {hint && <p className={`mt-2 text-[12px] leading-snug text-neutral-500 ${hintClass}`}>{hint}</p>}
    </div>
  );
}

// the visible box is a div; the real <select> sits invisibly on top (so the native picker still opens)
function Select({ id, value, onChange, options }) {
  return (
    <div className="group relative">
      <div className={`${inputCls} flex items-center pr-10 group-focus-within:border-neutral-900`}>
        <span className="min-w-0 truncate">{value}</span>
      </div>
      {/* design shows the arrow on phones only */}
      <img
        src="/img/Select Chevron.png"
        alt=""
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 object-contain md:hidden"
      />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------- the page ----------
export default function ListingMarketplace() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [photos, setPhotos] = useState([null, null, null, null]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const category = CATEGORIES.find((c) => c.id === form.category) ?? CATEGORIES[0];
  const isTextbook = form.category === "Textbooks";

  const setPhoto = (i, file) => {
    if (!file) return;
    setPhotos((list) =>
      list.map((p, idx) => {
        if (idx !== i) return p;
        if (p) URL.revokeObjectURL(p.url);
        return { url: URL.createObjectURL(file), name: file.name };
      })
    );
  };

  return (
    <div className="w-full min-w-0 bg-[#fffff7] px-4 pb-40 pt-4 text-neutral-900 md:pb-16 md:pt-8 lg:pt-10" style={sans}>
      <div className="mx-auto w-full min-w-0 max-w-[1152px]">
        {/* ---------- Progress ---------- */}
        <ol aria-label="Progress" className="flex w-full items-center md:mx-auto md:w-fit md:max-w-full">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = n < CURRENT_STEP;
            const current = n === CURRENT_STEP;
            return (
              <li
                key={s.label}
                className={`flex items-center ${i > 0 ? "min-w-0 flex-1 md:flex-none" : ""}`}
                aria-current={current ? "step" : undefined}
              >
                {i > 0 && (
                  <span
                    className={`mx-2 h-px min-w-[12px] flex-1 md:mx-3 md:w-8 md:flex-none ${
                      n <= CURRENT_STEP ? "bg-[#02503f]" : "bg-[#dedcc8]"
                    }`}
                  />
                )}
                <span
                  className={`flex shrink-0 items-center gap-2 rounded-full text-[13px] md:border md:px-3 md:py-1.5 md:text-[12.5px] ${
                    done
                      ? "font-semibold text-neutral-800 md:border-[#02503f] md:bg-[#02503f] md:font-medium md:text-white"
                      : current
                      ? "border border-[#d9b6f3] bg-[#F0D7FF] py-1 pl-1 pr-3 font-semibold text-neutral-900 md:border-neutral-900 md:font-medium"
                      : "text-neutral-400 md:border-[#e6e4cf] md:bg-white/60 md:text-neutral-500"
                  }`}
                >
                  {done ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#02503f] md:h-auto md:w-auto md:bg-transparent">
                      <img src="/img/ListingHousing Check.png" alt="" className="h-3 w-3 object-contain" />
                    </span>
                  ) : (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] md:h-4 md:w-4 md:text-[10px] ${
                        current
                          ? "bg-neutral-900 text-white"
                          : "border border-[#dedcc8] bg-white text-neutral-400 md:border-0 md:bg-[#e3e2cc] md:text-neutral-500"
                      }`}
                    >
                      {n}
                    </span>
                  )}
                  <span className="md:hidden">{s.label}</span>
                  <span className="hidden md:inline">{s.full ?? s.label}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {/* ---------- Title row ---------- */}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 md:mt-10 md:items-start md:gap-y-1">
          <h1 className="text-[32px] font-semibold leading-tight tracking-tight md:text-[46px] md:font-normal" style={serif}>
            Sell your item.
          </h1>
          <div className="flex items-center gap-2 md:row-span-2 md:mt-4">
            <span className="flex items-center gap-1.5 rounded-full bg-[#02503f] px-3 py-1 text-[12px] font-medium text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Draft
            </span>
            <span className="hidden rounded-full border border-[#e0e0cc] px-3 py-1 text-[12px] text-neutral-500 md:inline">
              Category: Marketplace
            </span>
          </div>
          <p className="col-span-2 mt-2 text-[14px] leading-snug text-neutral-500 md:col-span-1 md:mt-0 md:max-w-[560px] md:text-[14.5px]">
            List books, winter coats, calculators, or desk gear for verified Trent students.
          </p>
        </div>

        {/* ---------- The form card ---------- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/listing-review");
          }}
          className="mt-5 min-w-0 rounded-3xl border border-[#e6e4cf] bg-[#fffff9] p-3.5 md:mt-6 md:rounded-[40px] md:border-2 md:border-neutral-900/55 md:p-10"
        >
          <div className="grid grid-cols-1 gap-6 md:gap-y-8 lg:grid-cols-2 lg:gap-x-10">
            {/* ===== LEFT COLUMN ===== */}
            <div className="min-w-0 space-y-6 md:space-y-8">
              <Section icon="/img/Marketplace Basics.png" mobileIcon="/img/Mobile Marketplace Basics.png" title="Basics">
                <Field label="Item title" required id="title">
                  <input id="title" value={form.title} onChange={(e) => set("title")(e.target.value)} className={inputCls} />
                </Field>

                <Field label="Category">
                  <div role="radiogroup" aria-label="Category" className="grid grid-cols-2 gap-2.5 md:gap-x-2 md:gap-y-2">
                    {CATEGORIES.map((c) => {
                      const on = c.id === form.category;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => set("category")(c.id)}
                          className={`relative flex h-[42px] items-center gap-2 rounded-xl border px-3 text-left text-[13px] transition md:h-10 ${
                            on
                              ? "border-2 border-neutral-900 bg-[#F0D7FF] font-medium text-neutral-900"
                              : "border-[#e6e4cf] bg-white text-neutral-800 hover:border-neutral-400 md:border-[#e6e6d0] md:bg-white/50 md:text-neutral-500"
                          }`}
                        >
                          <img src={c.icon} alt="" className="h-3.5 w-3.5 shrink-0 object-contain" />
                          <span className="md:hidden">{c.mobileLabel ?? c.id}</span>
                          <span className="hidden md:inline">{c.id}</span>
                          {on && <span className="absolute right-3.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#02503f] md:h-1.5 md:w-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="Price (CAD)" id="price" hint="Agree on payment in person — TrentTrust never handles money">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-neutral-600 md:text-neutral-500">$</span>
                    <input
                      id="price"
                      inputMode="numeric"
                      value={form.price}
                      onChange={(e) => set("price")(e.target.value.replace(/\D/g, ""))}
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </Field>
              </Section>

              <Section icon="/img/Marketplace Details.png" mobileIcon="/img/Mobile Marketplace Details.png" title="Details">
                <Field label="Condition" id="condition">
                  <Select id="condition" value={form.condition} onChange={set("condition")} options={CONDITIONS} />
                </Field>

                <Field label="Description" id="description">
                  <textarea
                    id="description"
                    rows={4}
                    value={form.description}
                    onChange={(e) => set("description")(e.target.value)}
                    className={`${inputBase} min-h-[104px] resize-none py-3 leading-relaxed md:min-h-[108px]`}
                  />
                </Field>

                {/* only for textbooks */}
                {isTextbook && (
                  <div className="rounded-2xl border border-[#a8cbbb] bg-[#f6faf6] p-4 md:border-2 md:border-[#b9d0d4] md:bg-[#fffff9] md:p-[18px]">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                      <p className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-[#02503f] md:text-[12.5px]">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#02503f]" />
                        <span className="md:hidden">Course-Code Search Optimization</span>
                        <span className="hidden md:inline">Course-Code Search Optimization (Textbook Detected)</span>
                      </p>
                      <span className="shrink-0 rounded-full bg-[#F0D7FF] px-3 py-1 text-[11.5px] font-semibold text-neutral-700 md:bg-transparent md:p-0 md:font-normal md:text-neutral-500">
                        Boosts buyer search
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Field label="Course code" id="courseCode" hint="e.g. COIS 1010 - makes it searchable" hintClass="hidden md:block">
                        <input
                          id="courseCode"
                          value={form.courseCode}
                          onChange={(e) => set("courseCode")(e.target.value)}
                          className={`${inputBase} h-10`}
                        />
                      </Field>
                      <Field label="Textbook edition" id="edition">
                        <input
                          id="edition"
                          value={form.edition}
                          onChange={(e) => set("edition")(e.target.value)}
                          className={`${inputBase} h-10`}
                        />
                      </Field>
                    </div>
                    <p className="mt-3 text-[12px] text-neutral-500 md:hidden">e.g. COIS 1010 - makes it searchable by course timetable</p>
                  </div>
                )}
              </Section>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="min-w-0 space-y-6 md:space-y-8">
              <Section icon="/img/Section Location.png" mobileIcon="/img/Mobile Location.png" title="Exchange">
                <Field label="Pickup area (Safe campus meetup)" id="pickup">
                  <input id="pickup" value={form.pickup} onChange={(e) => set("pickup")(e.target.value)} className={inputCls} />
                </Field>
                <Field label="Availability" id="availability">
                  <input id="availability" value={form.availability} onChange={(e) => set("availability")(e.target.value)} className={inputCls} />
                </Field>
                <div className="flex items-start gap-3 rounded-2xl border border-[#f6d3b0] bg-[#fff4ec] px-4 py-3.5 md:rounded-xl">
                  <img src="/img/Orange Exclamation.png" alt="" className="mt-0.5 h-4 w-4 shrink-0 object-contain" />
                  {/* phones */}
                  <p className="text-[13px] leading-snug text-neutral-800 md:hidden">
                    <b className="font-semibold">Exchange safe zone:</b> Meet on campus or in public. Bring a friend. We recommend the Bata
                    Library circulation desk or Student Centre Atrium.
                  </p>
                  {/* desktop */}
                  <p className="hidden text-[13px] font-semibold leading-snug md:block">
                    Exchange safe zone: Meet on campus or in public. Bring a friend. We recommend the Bata Library circulation desk or Student Centre Atrium.
                  </p>
                </div>
              </Section>

              <Section icon="/img/Media.png" mobileIcon="/img/Mobile Media.png" title="Media">
                <Field label="Add photos">
                  <div className="grid grid-cols-4 gap-2.5 md:gap-3">
                    {photos.map((p, i) => (
                      <label
                        key={i}
                        className={`relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed text-center text-[12px] transition md:border-2 ${
                          i === 0
                            ? "border-2 border-[#02503f] bg-[#eef5f3] text-[#02503f] md:bg-[#eef3ee]"
                            : "border-[#dcdac4] bg-[#faf8f0] text-neutral-500 hover:border-neutral-400 md:border-[#e3e1c8] md:bg-white/50"
                        }`}
                      >
                        {p ? (
                          <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <>
                            <span className={i === 0 ? "font-semibold md:font-medium" : ""}>+ {category.photos[i]}</span>
                            {i === 0 && <span className="mt-1 text-[10px] text-neutral-500">Cover</span>}
                          </>
                        )}
                        <input type="file" accept="image/*" className="sr-only" onChange={(e) => setPhoto(i, e.target.files?.[0])} />
                      </label>
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] italic text-neutral-500 md:mt-2 md:not-italic">Items with 3+ photos sell ~2x faster.</p>
                </Field>

                <div className="flex items-center gap-4 rounded-2xl border border-[#e8e1c8] bg-[#faf6ea] px-4 py-4 md:border-[#e3e1cc] md:bg-[#edede0] md:px-5 md:py-5">
                  <img src="/img/Mobile Clock.png" alt="" className="h-5 w-5 shrink-0 object-contain md:hidden" />
                  <img src="/img/Clock Green.png" alt="" className="hidden h-5 w-5 shrink-0 object-contain md:block" />
                  {/* phones */}
                  <p className="text-[13px] leading-snug text-neutral-800 md:hidden">
                    <b className="font-semibold">Listing duration:</b> Unsold listings archive after 30 days. You can renew anytime from your
                    profile with one click.
                  </p>
                  {/* desktop */}
                  <p className="hidden text-[14px] font-semibold leading-snug md:block">
                    Listing duration: Unsold listings archive after 30 days. You can renew anytime from your profile with one click.
                  </p>
                </div>
              </Section>
            </div>
          </div>
        </form>

        {/* ---------- Actions: fixed bar on phones, a row under the card on desktop ---------- */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6e4cf] bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-6px_18px_rgba(0,0,0,0.06)] md:static md:mt-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
          <div className="mx-auto flex max-w-[1152px] flex-col gap-3 md:flex-row-reverse md:items-center md:justify-between md:gap-4">
            <div className="flex gap-3">
              <button
                type="button"
                className="h-[50px] w-[40%] rounded-full border border-neutral-900 bg-white text-[15px] font-medium hover:bg-neutral-50 md:h-[46px] md:w-auto md:rounded-xl md:px-6 md:text-[14.5px]"
              >
                Save as draft
              </button>
              <button
                type="button"
                onClick={() => navigate("/listing-review")}
                className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-full border border-[#e0c3f7] bg-[#F0D7FF] text-[15px] font-semibold text-[#02503f] transition hover:brightness-95 md:h-[46px] md:flex-none md:rounded-xl md:border-neutral-900 md:px-6 md:text-[14.5px] md:font-medium md:text-neutral-900"
              >
                Continue to review <img src="/img/Rightarrow.png" alt="" className="h-4 w-4 object-contain" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate("/listing-type")}
              className="flex items-center justify-center gap-2 text-[13.5px] text-neutral-500 hover:text-neutral-800 md:text-[14px]"
            >
              <img src="/img/Back Arrow.png" alt="" className="h-4 w-4 object-contain opacity-60" />
              Back to category select
            </button>
          </div>
        </div>
      </div>

      {SHOW_TAB_BAR && <BottomTabBar active="Post/Sell" />}
    </div>
  );
}