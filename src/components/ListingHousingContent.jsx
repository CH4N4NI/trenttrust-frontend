import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "./BottomTabbar";

const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
const serif = { fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif" };

// On phones this page ends with a fixed "Save as draft / Continue" bar (your design shows no tab bar there).
// Set to true to also show the tab bar (then the action bar needs to sit above it).
const SHOW_TAB_BAR = false;

// "full" is the longer label used on desktop
const STEPS = [{ label: "Type" }, { label: "Details", full: "Details (Housing)" }, { label: "Confirm" }];
const CURRENT_STEP = 2; // 1-based

const PROPERTY_TYPES = ["Private room", "Shared room", "Entire apartment", "Entire house", "Studio"];
// options can be plain strings, or { value, label, short } where "short" is what phones show
const LEASE_TYPES = [
  { value: "Sublet (Ontario Standard Lease compatible)", label: "Sublet (Ontario Standard Lease compatible)", short: "Sublet" },
  "Lease takeover",
  "Fixed-term lease",
  "Month-to-month",
];
const CAMPUSES = ["Symons (Main Campus)", "Durham GTA Campus"];
const DISTANCES = ["Under 10 min walk", "10-20 min walk", "20+ min walk", "Short bus ride"];
const BATHROOMS = ["1 private", "1 shared", "2", "3+"];
const UTILITIES = ["Wi-Fi", "Heat", "Water", "Hydro (Split)", "None"];
const AMENITIES = [
  "Kitchen",
  "Laundry",
  "High-speed Internet",
  "Heating",
  "Quiet study space",
  "Air conditioning",
  "Parking",
  "Private bathroom",
  "Accessibility features",
  "Pets allowed",
];

// demo values from the design. Replace with empty values / an API response when you're ready.
const INITIAL = {
  title: "Bright furnished bedroom near Trent Symons Campus",
  rent: "780",
  propertyType: "Private room",
  leaseType: LEASE_TYPES[0].value,
  campus: CAMPUSES[0],
  neighborhood: "Riverdale area",
  distance: "10-20 min walk",
  landmarks: "Near Rotary Greenway Trail & Nassau Mills",
  transit: "Direct Trent East Bank bus stop #4 right in front of corner",
  bedrooms: 3,
  bathrooms: "1 shared",
  furnished: true,
  roommates: 2,
  available: "2027-05-01",
  end: "2027-08-31",
  utilities: ["Wi-Fi", "Heat", "Water"],
  amenities: ["Kitchen", "Laundry", "High-speed Internet", "Heating", "Quiet study space"],
  smoking: "No Smoking",
  pets: "No Pets",
  notes: "",
  liveTours: true,
};

// heights are added where each field is used (phones are shorter than desktop)
const inputCls =
  "w-full rounded-xl border border-[#e6e6d0] bg-[#fffff9] px-4 text-[14px] outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 md:border-2 md:text-[14.5px]";

// same look as an input, but it grows taller when the text wraps (phones)
const areaCls =
  "w-full resize-none overflow-hidden rounded-xl border border-[#e6e6d0] bg-[#fffff9] px-4 text-[14px] outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 md:min-h-[48px] md:border-2 md:py-[10px] md:text-[14.5px] md:leading-6";

// ---------- small building blocks ----------
// On phones every Section is its own numbered card. On desktop they sit inside one big card.
function Section({ n, icon, mobileIcon, title, mobileTitle, children }) {
  return (
    <section className="min-w-0 rounded-3xl border border-[#e6e4cf] bg-[#fffff9] p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0">
      <h2 className="flex items-center gap-2.5 border-b border-[#e6e6d0] pb-3 text-[13.5px] font-medium uppercase tracking-[0.06em] text-[#02503f] md:text-[14px] md:tracking-[0.08em] md:text-neutral-900">
        <img src={mobileIcon ?? icon} alt="" className="h-4 w-4 object-contain md:hidden" />
        <img src={icon} alt="" className="hidden h-4 w-4 object-contain md:block" />
        <span className="md:hidden">
          {n}. {mobileTitle ?? title}
        </span>
        <span className="hidden md:inline">{title}</span>
      </h2>
      <div className="mt-4 space-y-5 md:mt-5">{children}</div>
    </section>
  );
}

function Field({ label, mobileLabel, hint, hintClass = "", aside, id, className = "", children }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-[14px] font-medium">
          {mobileLabel ? (
            <>
              <span className="md:hidden">{mobileLabel}</span>
              <span className="hidden md:inline">{label}</span>
            </>
          ) : (
            label
          )}
        </label>
        {aside && <span className="text-[12.5px] text-neutral-500 md:hidden">{aside}</span>}
      </div>
      {children}
      {hint && <p className={`mt-2 text-[12px] leading-snug text-neutral-500 ${hintClass}`}>{hint}</p>}
    </div>
  );
}

// the visible box is a div (so phones can show a shorter label); the real <select> sits invisibly on top
function Select({ id, value, onChange, options, compact = false }) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const cur = opts.find((o) => o.value === value) ?? opts[0];
  return (
    <div className="group relative">
      <div className={`${inputCls} ${compact ? "h-[38px]" : "h-11"} flex items-center pr-10 md:h-12 group-focus-within:border-neutral-900`}>
        <span className="min-w-0 truncate md:hidden">{cur.short ?? cur.label}</span>
        <span className="hidden min-w-0 truncate md:inline">{cur.label}</span>
      </div>
      <img
        src="/img/Select Chevron.png"
        alt=""
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 object-contain"
      />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function AutoGrow({ id, value, onChange, compact = false, className = "", ...rest }) {
  const ref = useRef(null);
  const fit = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`; // + the borders
  };
  useLayoutEffect(fit, [value]);
  useEffect(() => {
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <textarea
      ref={ref}
      id={id}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\n/g, " "))}
      className={`${areaCls} ${compact ? "min-h-[38px] py-[6px] leading-5" : "min-h-[44px] py-[10px] text-[15px] leading-6"} ${className}`}
      {...rest}
    />
  );
}

function Counter({ value, onChange, min = 0, max = 10, format }) {
  const btn =
    "flex h-[30px] w-[30px] items-center justify-center rounded-md bg-[#e6e6d0] text-[16px] font-medium transition hover:bg-[#dcdcc4] disabled:opacity-40 md:h-8 md:w-8";
  return (
    <div className="flex h-[42px] items-center justify-between rounded-xl border border-[#e6e6d0] bg-[#fffff9] px-[5px] md:h-12 md:border-2 md:px-2">
      <button type="button" aria-label="Decrease" disabled={value <= min} onClick={() => onChange(value - 1)} className={btn}>
        -
      </button>
      <span className="text-[14.5px]">{format ? format(value) : value}</span>
      <button type="button" aria-label="Increase" disabled={value >= max} onClick={() => onChange(value + 1)} className={btn}>
        +
      </button>
    </div>
  );
}

// phones: one rounded track with a green pill inside. desktop: two separate buttons.
function Segmented({ label, options, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex gap-1 rounded-xl border border-[#e6e6d0] bg-[#fffff9] p-[3px] md:gap-2 md:rounded-none md:border-0 md:bg-transparent md:p-0"
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`h-8 flex-1 rounded-lg text-[13.5px] font-medium transition md:h-10 md:border md:text-[13px] ${
              on
                ? "bg-[#02503f] text-white md:border-[#02503f]"
                : "text-neutral-500 md:border-[#e0e0cc] md:bg-white md:text-neutral-600 md:hover:border-neutral-400"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex h-7 items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition md:h-8 md:text-[12.5px] ${
        on
          ? "border-[#02503f] bg-[#02503f] font-medium text-white"
          : "border-[#e0dfc9] bg-[#fffff9] text-neutral-700 hover:border-neutral-400 md:border-[#dedecb] md:bg-transparent md:text-neutral-500"
      }`}
    >
      {on && <img src="/img/ListingHousing Check.png" alt="" className="h-3 w-3 object-contain" />}
      {children}
    </button>
  );
}

function Switch({ on, onClick, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${on ? "bg-[#02503f]" : "bg-neutral-300"}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}

// ---------- the page ----------
export default function ListingHousing() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [photos, setPhotos] = useState([null, null, null, null, null]);
  const [videoName, setVideoName] = useState("");
  const videoRef = useRef(null);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const toggle = (key, value) =>
    setForm((f) => {
      const has = f[key].includes(value);
      let next = has ? f[key].filter((v) => v !== value) : [...f[key], value];
      // "None" and the other utilities cancel each other out
      if (key === "utilities") {
        next = value === "None" && !has ? ["None"] : next.filter((v) => v !== "None");
      }
      return { ...f, [key]: next };
    });

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
        {/* ---------- Progress: a bordered strip on phones, centred pills on desktop ---------- */}
        <ol
          aria-label="Progress"
          className="flex w-full items-center rounded-2xl border border-[#e6e4cf] bg-white/60 px-3 py-3 md:mx-auto md:w-fit md:max-w-full md:rounded-none md:border-0 md:bg-transparent md:p-0"
        >
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = n < CURRENT_STEP;
            const current = n === CURRENT_STEP;
            return (
              <li
                key={s.label}
                className={`flex items-center ${i > 0 ? "flex-1 md:flex-none" : ""}`}
                aria-current={current ? "step" : undefined}
              >
                {i > 0 && (
                  <span
                    className={`mx-2 h-px flex-1 md:mx-3 md:w-8 md:flex-none ${
                      n <= CURRENT_STEP ? "bg-[#02503f]" : "bg-[#dedcc8]"
                    }`}
                  />
                )}
                <span
                  className={`flex shrink-0 items-center gap-2 rounded-full text-[13px] md:border md:px-3 md:py-1.5 md:text-[12.5px] ${
                    done
                      ? "text-neutral-800 md:border-[#02503f] md:bg-[#02503f] md:font-medium md:text-white"
                      : current
                      ? "border border-[#e3c7fa] bg-[#F0D7FF]/70 py-1 pl-1 pr-3 font-semibold text-neutral-900 md:border-neutral-900 md:bg-[#F0D7FF] md:font-medium"
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
                          ? "bg-[#02503f] text-white md:bg-neutral-900"
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
          <h1 className="text-[34px] leading-tight tracking-tight md:text-[46px]" style={serif}>
            List your room.
          </h1>
          <div className="flex items-center gap-2 md:row-span-2 md:mt-4">
            <span className="flex items-center gap-1.5 rounded-full border border-[#bcd5c5] bg-[#e6efe3] px-3 py-1 text-[12px] font-medium text-[#02503f] md:border-transparent md:bg-[#02503f] md:text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#02503f] md:bg-white" /> Draft
            </span>
            <span className="hidden rounded-full border border-[#e0e0cc] px-3 py-1 text-[12px] text-neutral-500 md:inline">
              Category: Housing or Sublet
            </span>
          </div>
          <p className="col-span-2 mt-1 text-[14.5px] leading-snug text-neutral-500 md:col-span-1 md:mt-0 md:max-w-[560px]">
            <span className="md:hidden">Feed comprehensive details into student search filters and safe campus viewing cards.</span>
            <span className="hidden md:inline">
              Comprehensive listing details feed directly into student search filters and safe campus viewing cards.
            </span>
          </p>
        </div>

        {/* ---------- The form: separate cards on phones, one big card on desktop ---------- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/listing-review");
          }}
          className="mt-5 min-w-0 md:mt-6 md:rounded-[40px] md:border-2 md:border-neutral-900 md:bg-[#fffff9] md:p-10"
        >
          <div className="grid grid-cols-1 gap-4 md:gap-y-8 lg:grid-cols-2 lg:gap-x-10">
            {/* ===== LEFT COLUMN (sections 1-4) ===== */}
            <div className="min-w-0 space-y-4 md:space-y-8">
              <Section n={1} icon="/img/Basics.png" mobileIcon="/img/Mobile Basics.png" title="Basics">
                <Field label="Listing title" id="title">
                  <AutoGrow id="title" value={form.title} onChange={set("title")} />
                </Field>
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  <Field label="Monthly rent (CAD)" id="rent">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-neutral-500">$</span>
                      <input
                        id="rent"
                        inputMode="numeric"
                        value={form.rent}
                        onChange={(e) => set("rent")(e.target.value.replace(/\D/g, ""))}
                        className={`${inputCls} h-11 pl-9 md:h-12`}
                      />
                    </div>
                  </Field>
                  <Field label="Room/property type" mobileLabel="Room type" id="propertyType">
                    <Select id="propertyType" value={form.propertyType} onChange={set("propertyType")} options={PROPERTY_TYPES} />
                  </Field>
                </div>
                <Field label="Lease/sublet type" mobileLabel="Lease / Sublet type" id="leaseType">
                  <Select id="leaseType" value={form.leaseType} onChange={set("leaseType")} options={LEASE_TYPES} />
                </Field>
              </Section>

              <Section n={2} icon="/img/Space.png" mobileIcon="/img/Mobile Space.png" title="Space">
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-5">
                  <Field label="Number of bedrooms" mobileLabel="Bedrooms">
                    <Counter value={form.bedrooms} onChange={set("bedrooms")} min={1} max={10} />
                  </Field>
                  <Field label="Number of bathrooms" mobileLabel="Bathrooms" id="bathrooms">
                    <Select id="bathrooms" value={form.bathrooms} onChange={set("bathrooms")} options={BATHROOMS} compact />
                  </Field>
                  <Field label="Furnished" className="col-span-2 md:col-span-1">
                    <Segmented
                      label="Furnished"
                      value={form.furnished}
                      onChange={set("furnished")}
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                    />
                  </Field>
                  <Field label="Current roommates" className="col-span-2 md:col-span-1">
                    <Counter
                      value={form.roommates}
                      onChange={set("roommates")}
                      min={0}
                      max={9}
                      format={(n) => `${n} ${n === 1 ? "student" : "students"}`}
                    />
                  </Field>
                </div>
              </Section>

              <Section n={3} icon="/img/Dates.png" mobileIcon="/img/Mobile Dates.png" title="Dates">
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  <Field label="Available date" id="available">
                    <input
                      id="available"
                      type="date"
                      value={form.available}
                      onChange={(e) => set("available")(e.target.value)}
                      className={`${inputCls} h-9 text-center md:h-12 md:text-left`}
                    />
                  </Field>
                  <Field label="End date" id="end" hint="Leave blank if ongoing" hintClass="hidden md:block">
                    <input
                      id="end"
                      type="date"
                      value={form.end}
                      onChange={(e) => set("end")(e.target.value)}
                      className={`${inputCls} h-9 text-center md:h-12 md:text-left`}
                    />
                  </Field>
                </div>
                <p className="text-center text-[12.5px] italic text-neutral-500 md:hidden">Leave blank if ongoing lease</p>
              </Section>

              <Section n={4} icon="/img/Costs.png" mobileIcon="/img/Mobile Costs.png" title="Costs" mobileTitle="Costs & utilities">
                <Field label="Utilities included" mobileLabel="Utilities included in rent">
                  <div className="flex flex-wrap gap-x-2.5 gap-y-[10px] md:gap-2">
                    {UTILITIES.map((u) => (
                      <Chip key={u} on={form.utilities.includes(u)} onClick={() => toggle("utilities", u)}>
                        {u}
                      </Chip>
                    ))}
                  </div>
                </Field>
                <div className="flex items-start gap-3 rounded-xl border border-[#f6d3b0] bg-[#fff4ec] px-4 py-3.5">
                  <img src="/img/Orange Exclamation.png" alt="" className="mt-0.5 h-4 w-4 shrink-0 object-contain" />
                  {/* phones */}
                  <p className="text-[14px] leading-snug text-neutral-800 md:hidden">
                    <b className="font-semibold text-[#b25e00]">Safety protocol:</b> TrentTrust never processes rent or deposits —
                    arrange payment independently after a verified video tour.
                  </p>
                  {/* desktop */}
                  <p className="hidden text-[13px] font-semibold leading-snug md:block">
                    Safety protocol: TrentTrust never processes rent or deposits — arrange payment independently after an in-person or live verified video tour.
                  </p>
                </div>
              </Section>
            </div>

            {/* ===== RIGHT COLUMN (sections 5-8) ===== */}
            <div className="min-w-0 space-y-4 md:space-y-8">
              <Section n={5} icon="/img/Section Location.png" mobileIcon="/img/Mobile Location.png" title="Location">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Campus" id="campus">
                    <Select id="campus" value={form.campus} onChange={set("campus")} options={CAMPUSES} compact />
                  </Field>
                  <Field label="Approximate neighborhood" id="neighborhood" hint="Exact address stays private until you choose to share it">
                    <input id="neighborhood" value={form.neighborhood} onChange={(e) => set("neighborhood")(e.target.value)} className={`${inputCls} h-[38px] md:h-12`} />
                  </Field>
                  <Field label="Distance from campus" id="distance">
                    <Select id="distance" value={form.distance} onChange={set("distance")} options={DISTANCES} compact />
                  </Field>
                  {/* phones: sits before landmarks. desktop: pushed to the bottom, full width */}
                  <Field label="Transit information" id="transit" className="md:order-last md:col-span-2">
                    <AutoGrow id="transit" value={form.transit} onChange={set("transit")} compact />
                  </Field>
                  <Field label="Nearby landmarks (optional)" id="landmarks">
                    <AutoGrow id="landmarks" value={form.landmarks} onChange={set("landmarks")} compact />
                  </Field>
                </div>
              </Section>

              <Section n={6} icon="/img/Amenities.png" mobileIcon="/img/Mobile Amenities.png" title="Amenities">
                <div className="flex flex-wrap gap-x-2.5 gap-y-[10px] md:gap-2">
                  {AMENITIES.map((a) => (
                    <Chip key={a} on={form.amenities.includes(a)} onClick={() => toggle("amenities", a)}>
                      {a}
                    </Chip>
                  ))}
                </div>
              </Section>

              <Section n={7} icon="/img/House Rules.png" mobileIcon="/img/Mobile House Rules.png" title="House rules">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Smoking policy">
                    <Segmented
                      label="Smoking policy"
                      value={form.smoking}
                      onChange={set("smoking")}
                      options={[
                        { label: "Allowed", value: "Allowed" },
                        { label: "No Smoking", value: "No Smoking" },
                      ]}
                    />
                  </Field>
                  <Field label="Pets policy">
                    <Segmented
                      label="Pets policy"
                      value={form.pets}
                      onChange={set("pets")}
                      options={[
                        { label: "Allowed", value: "Allowed" },
                        { label: "No Pets", value: "No Pets" },
                      ]}
                    />
                  </Field>
                </div>
                <Field label="Additional notes (optional)" id="notes">
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes")(e.target.value)}
                    placeholder="e.g. Quiet hours after 10 PM on weeknights for midterms..."
                    className={`${inputCls} h-auto min-h-[88px] resize-none py-3 leading-snug`}
                  />
                </Field>
              </Section>

              <Section n={8} icon="/img/Media.png" mobileIcon="/img/Mobile Media.png" title="Media" mobileTitle="Media & walkthrough">
                <Field label="Add up to 5 photos" aside="JPG or PNG">
                  {/* phones: one row that scrolls sideways. desktop: 5 equal tiles */}
                  <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:overflow-visible">
                    {photos.map((p, i) => (
                      <label
                        key={i}
                        className={`relative flex aspect-square h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed text-center text-[12px] transition md:h-auto md:w-auto md:border-2 ${
                          i === 0
                            ? "border-2 border-[#02503f] bg-[#eef5f5] text-neutral-900 md:bg-[#eef3ee] md:text-[#02503f]"
                            : "border-[#e3e1c8] bg-white/50 text-neutral-500 hover:border-neutral-400 md:border-[#dedecb]"
                        }`}
                      >
                        {p ? (
                          <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                        ) : i === 0 ? (
                          <>
                            <span className="text-[22px] leading-none md:hidden">+</span>
                            <span className="mt-1 font-semibold md:mt-0 md:font-medium">
                              <span className="hidden md:inline">+ </span>Cover
                            </span>
                            <span className="mt-0.5 text-[10px] text-neutral-500">Bedroom</span>
                          </>
                        ) : (
                          <span>+ Photo {i + 1}</span>
                        )}
                        <input type="file" accept="image/*" className="sr-only" onChange={(e) => setPhoto(i, e.target.files?.[0])} />
                      </label>
                    ))}
                  </div>
                </Field>

                {/* walkthrough video */}
                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#e0dfc9] p-4 md:border-2 md:border-[#e0e0cc]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6e6d0]">
                    <img src="/img/Mobile Play.png" alt="" className="h-4 w-4 object-contain md:hidden" />
                    <img src="/img/Play.png" alt="" className="hidden h-4 w-4 object-contain md:block" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium md:text-[13px]">
                      {videoName || (
                        <>
                          <span className="md:hidden">Short walkthrough video</span>
                          <span className="hidden md:inline">Attach a short walkthrough video (optional)</span>
                        </>
                      )}
                    </p>
                    <p className="text-[11.5px] text-neutral-500">MP4 or MOV up to 60s (max 60MB)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => videoRef.current?.click()}
                    className="shrink-0 rounded-lg border border-neutral-900 bg-white px-4 py-1.5 text-[12.5px] font-medium hover:bg-neutral-50 md:rounded-full md:py-1"
                  >
                    Browse
                  </button>
                  <input
                    ref={videoRef}
                    type="file"
                    accept="video/mp4,video/quicktime"
                    className="sr-only"
                    onChange={(e) => setVideoName(e.target.files?.[0]?.name ?? "")}
                  />
                </div>

                {/* live tours toggle: a plain row with a divider on phones, a card on desktop */}
                <div className="flex items-center justify-between gap-4 border-t border-[#e6e4cf] pt-4 md:rounded-2xl md:border md:border-[#e6e6d0] md:bg-white/50 md:p-4">
                  <div className="min-w-0">
                    <span className="text-[14.5px] font-semibold text-[#02503f] md:inline-block md:rounded-full md:bg-[#02503f] md:px-3 md:py-1 md:text-[11.5px] md:font-medium md:text-white">
                      Offer live video tours
                    </span>
                    <p className="mt-0.5 text-[12.5px] text-neutral-500 md:mt-2">Huge for incoming students who can't visit in person</p>
                  </div>
                  <Switch on={form.liveTours} onClick={() => set("liveTours")(!form.liveTours)} label="Offer live video tours" />
                </div>
              </Section>
            </div>
          </div>

          {/* privacy banner */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#e6e4cf] bg-[#f4f2e8] px-4 py-4 md:mt-10 md:items-center md:gap-4 md:rounded-xl md:border-0 md:bg-[#edede0] md:px-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8e6d6] md:h-auto md:w-auto md:bg-transparent">
              <img src="/img/Privacy by Design.png" alt="" className=" object-contain md:hidden" />
              <img src="/img/Wide Padlock.png" alt="" className="hidden h-5 w-5 object-contain md:block" />
            </span>
            <p className="text-[14.5px] font-medium leading-snug md:font-semibold">
              <span className="font-semibold text-[#02503f] md:text-neutral-900">Privacy by design:</span> Your exact address is never
              shown publicly. Only the neighborhood area (e.g. <em>Riverdale area, ~10 min walk to campus</em>) appears on your listing.
            </p>
          </div>
        </form>

        {/* ---------- Actions: fixed bar on phones, a row under the card on desktop ---------- */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6e4cf] bg-[#fffff7] px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 md:static md:mt-8 md:border-0 md:bg-transparent md:p-0">
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
              onClick={() => navigate("/listings")}
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