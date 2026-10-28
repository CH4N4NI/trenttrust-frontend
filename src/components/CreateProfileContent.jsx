import { useState } from "react";

const serif = { fontFamily: "'EB Garamond', Georgia, serif" };
const sans = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#efd6ff] sm:h-10 sm:w-10">
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="#02503f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h9M8.5 6v12" />
          <path d="M14 13l2.5 2.5L21 10" />
        </svg>
      </span>
      <span className="text-[22px] leading-none text-neutral-900 sm:text-[26px]" style={serif}>
        Trent<span className="font-semibold text-[#02503f]">Trust</span>
      </span>
    </div>
  );
}

const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

// One form field. Desktop shows "(optional)" next to the label;
// mobile shows a note on the right and a help line underneath.
function Field({ id, label, desktopNote, mobileNote, mobileNoteGreen, help, children }) {
  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] font-medium sm:text-[14px]">
          {label}
          {desktopNote && (
            <span className="hidden font-normal text-neutral-500 sm:inline"> {desktopNote}</span>
          )}
        </label>
        {mobileNote && (
          <span className={`text-[13px] sm:hidden ${mobileNoteGreen ? "text-[#02503f]" : "text-neutral-500"}`}>
            {mobileNote}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {help && <p className="mt-2 text-[13px] text-neutral-500 sm:hidden">{help}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-900 bg-[#fefee8] px-4 py-3.5 text-[16px] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#02503f]/30 sm:border-2 sm:bg-[#fffff7] sm:px-[18px]";

export default function CreateProfile({ onSubmit = () => {}, onBack = () => {} }) {
  const [firstName, setFirstName] = useState("");
  const [program, setProgram] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName: firstName.trim(), program: program.trim(), bio: bio.trim(), photo });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#fffff7] px-6 py-6 text-neutral-900 sm:px-8 sm:py-6 lg:px-12 lg:py-8"
      style={sans}
    >
      {/* Mobile top bar: round back button + step pill */}
      <div className="sm:hidden">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ececE4]"
        >
          <Arrow dir="left" />
        </button>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ececE4] px-4 py-2 text-[14px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#02503f]" />
          Step 2 of 3 • Verify
        </span>
      </div>

      {/* Desktop header */}
      <header className="hidden items-center justify-between gap-3 rounded-xl border-2 border-neutral-900 bg-white px-6 py-4 sm:flex lg:px-8">
        <div className="flex min-w-0 items-center gap-5">
          <Logo />
          <span className="h-6 w-px bg-neutral-300" />
          <span className="text-[13px] uppercase tracking-widest text-neutral-500">
            Student Auth
          </span>
        </div>
        <button
          onClick={onBack}
          className="flex shrink-0 items-center gap-2 text-[15px] font-medium"
        >
          <Arrow dir="left" />
          Back to Main Site
        </button>
      </header>

      <main className="mx-auto mt-6 w-full max-w-[568px] sm:mt-12">
        {/* Mobile title (outside the card) */}
        <div className="mb-10 sm:hidden">
          <h1 className="text-[36px] leading-tight" style={serif}>Say hello.</h1>
          <p className="mt-1 text-[16px] text-neutral-500">Set up your public profile</p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="rounded-[32px] border border-neutral-900 px-5 pb-8 pt-2 sm:rounded-[40px] sm:border-2 sm:px-8 sm:pb-8 sm:pt-9">
            {/* Desktop title (inside the card) */}
            <div className="hidden sm:block">
              <h1 className="text-[40px] leading-tight" style={serif}>Say hello.</h1>
              <p className="mt-1 text-[16px] text-neutral-500">
                Only three things. Everything else stays private.
              </p>
            </div>

            <div className="-mt-1 sm:mt-1">
              <Field
                id="firstName"
                label="First name"
                mobileNote="Official Broadside ID"
                mobileNoteGreen
                help="Used by prospective housemates to greet you."
              >
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Marcus"
                  className={inputClass}
                />
              </Field>

              <Field
                id="program"
                label="Program or major"
                desktopNote="(optional)"
                mobileNote="Optional"
                help="e.g. Computer Science"
              >
                <input
                  id="program"
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  placeholder="Biology & Environmental Science"
                  className={inputClass}
                />
              </Field>

              <Field
                id="bio"
                label="Bio"
                desktopNote="(Optional)"
                mobileNote="Optional"
                help="e.g. Computer Science"
              >
                <textarea
                  id="bio"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people a little about yourself"
                  className={`${inputClass} resize-none sm:min-h-[76px]`}
                />
              </Field>

              {/* Photo */}
              <div className="mt-5">
                <p className="text-[15px] font-medium sm:text-[14px]">
                  Photo
                  <span className="hidden font-normal text-neutral-500 sm:inline"> (optional)</span>
                </p>
                <label className="mx-auto mt-3 block h-[88px] w-[88px] cursor-pointer overflow-hidden rounded-full focus-within:ring-2 focus-within:ring-[#02503f]/40">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="sr-only"
                    aria-label="Upload profile photo"
                  />
                  {photoUrl ? (
                    <img src={photoUrl} alt="Your profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <img src="/img/Upload profile.png" alt="" className="h-full w-full object-contain" />
                  )}
                </label>
                <p className="mt-4 hidden text-[14px] text-neutral-500 sm:block">
                  A real photo builds trust — a blank one won’t block you from verified leases.
                </p>
              </div>

              {/* Desktop button (inside the card) */}
              <button
                type="submit"
                className="mt-6 hidden w-full items-center justify-center gap-4 rounded-xl border-2 border-neutral-900 bg-[#F0D7FF] py-4 text-[16px] font-medium transition hover:brightness-95 sm:flex"
              >
                Complete Profile
                <Arrow />
              </button>
            </div>
          </section>

          {/* Mobile button (below the card) */}
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F0D7FF] py-4 text-[16px] font-medium transition hover:brightness-95 sm:hidden"
          >
            Complete Profile
            <Arrow />
          </button>
        </form>
      </main>
    </div>
  );
}