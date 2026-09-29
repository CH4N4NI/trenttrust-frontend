import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WelcomeNavbar from "./WelcomeNavbar"; // fix path to match your folder

// true when the screen is narrower than 768px (Tailwind's md breakpoint)
function useIsMobile() {
  const query = "(max-width: 767px)";
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

function Radio({ selected }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border md:h-4 md:w-4 ${
        selected ? "border-[#00524a]" : "border-black/30"
      }`}
    >
      {selected && <span className="h-2 w-2 rounded-full bg-[#00524a]" />}
    </span>
  );
}

export default function VerificationContent() {
  const isMobile = useIsMobile();
  const [method, setMethod] = useState("document"); // "document" | "id"
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [studentId, setStudentId] = useState("");
  const fileRef = useRef(null);

  const canSubmit =
    method === "document" ? !!file : /^\d{7}$/.test(studentId.trim());

  const handleFile = (f) => {
    if (!f) return;
    const okType = ["image/jpeg", "image/png", "application/pdf"].includes(
      f.type
    );
    if (okType) setFile(f);
  };

  return (
    <div>
      {/* NAVBAR (desktop only) */}
      {!isMobile && <WelcomeNavbar />}

      <main className="flex justify-center px-6 py-6 md:px-4 md:py-16">
        <div className="w-full max-w-[580px] rounded-none border-0 border-[#161616] p-0 shadow-none md:max-w-[720px] md:rounded-3xl md:border-2 md:p-10 md:shadow-[6px_6px_0px_0px_#161616]">
          {/* Mobile top: round back button, then step pill */}
          <div className="md:hidden">
            <Link
              to="/signup"
              aria-label="Back"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.06]"
            >
              <img
                src="/img/rightarrow.png"
                alt=""
                className="h-[18px] w-[18px] rotate-180 object-contain"
              />
            </Link>
            <span className="mb-6 mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#e5e2c8]/60 px-3 py-1.5 text-[12px] font-medium text-[#161616]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00524a]" />
              Step 2 of 3 • Verify
            </span>
          </div>

          {/* Step progress (desktop) */}
          <div className="mb-6 hidden items-center justify-between md:flex">
            <span className="text-xs font-medium tracking-wide text-[#00524a]">
              STEP 2 OF 4 — VERIFICATION
            </span>
            <img
              src="/img/3steps.png"
              alt="Step 2 of 4"
              className="h-2.5 w-auto object-contain"
            />
          </div>

          <h1 className="font-serif text-[28px] leading-tight text-[#161616] md:text-[32px]">
            Prove you’re a student.
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-black/50">
            While we connect with Trent’s systems, confirm your enrollment one
            of two ways.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 flex flex-col gap-4"
          >
            {/* OPTION A: document */}
            <div
              onClick={() => setMethod("document")}
              className={`cursor-pointer rounded-2xl border bg-white/40 p-4 md:p-5 ${
                method === "document"
                  ? "border-2 border-[#161616]"
                  : "border-[#161616]/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#00524a] md:text-[12px] md:normal-case md:tracking-normal md:font-medium md:text-[#161616]">
                    Option A · Document
                  </p>
                  <h2 className="mt-1 font-serif text-[19px] leading-snug text-[#161616] md:text-[20px]">
                    Upload proof of enrollment
                  </h2>
                </div>
                <Radio selected={method === "document"} />
              </div>

              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMethod("document");
                  fileRef.current?.click();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragging(false);
                  setMethod("document");
                  handleFile(e.dataTransfer.files?.[0]);
                }}
                className={`mt-4 flex w-full flex-col items-center justify-center gap-2.5 rounded-xl px-4 py-7 text-center md:border-2 md:border-dashed md:border-[#161616]/60 ${
                  dragging ? "bg-[#e5e2c8]" : "bg-[#e5e2c8]/60"
                }`}
              >
                <img
                  src="/img/Upload.png"
                  alt=""
                  className="h-10 w-10 object-contain md:h-7 md:w-7"
                />
                {file ? (
                  <span className="text-[12px] font-medium text-[#161616] break-all">
                    {file.name}
                  </span>
                ) : (
                  <>
                    <span className="text-[13px] font-medium text-[#161616] md:text-[12px]">
                      Drop student card photo or acceptance letter
                    </span>
                    <span className="text-[11px] text-black/50 md:text-[10px]">
                      JPG or PDF — reviewed within 24h
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* OPTION B: student number */}
            <div
              onClick={() => setMethod("id")}
              className={`cursor-pointer rounded-2xl border bg-white/40 p-4 md:p-5 ${
                method === "id"
                  ? "border-2 border-[#161616]"
                  : "border-[#161616]/60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#00524a] md:text-[12px] md:normal-case md:tracking-normal md:font-medium md:text-[#161616]">
                    Option B · Institutional ID
                  </p>
                  <h2 className="mt-1 font-serif text-[19px] leading-snug text-[#161616] md:text-[20px]">
                    Verify via student number
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-snug text-black/50 md:hidden">
                    We match it against active registrar enrollment records.
                  </p>
                </div>
                <Radio selected={method === "id"} />
              </div>

              <label className="mb-1.5 mt-4 block text-[12px] font-medium text-[#161616]">
                Trent 7-Digit Student ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={7}
                  value={studentId}
                  onChange={(e) => {
                    setMethod("id");
                    setStudentId(e.target.value.replace(/\D/g, ""));
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="e.g. 0748291"
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 pr-10 text-[14px] outline-none focus:border-[#00524a] md:pr-3 md:text-[13px]"
                />
                <img
                  src="/img/Profile.png"
                  alt=""
                  className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 object-contain opacity-70 md:hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl border-0 bg-[#f0d7ff] py-3 text-[15px] font-medium text-[#161616] disabled:cursor-not-allowed disabled:opacity-50 md:border-2 md:border-black"
            >
              Submit for verification →
            </button>

            {/* What verification does */}
            <div className="rounded-2xl border-2 border-[#161616] bg-[#e5e2c8] p-4 md:p-5">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#161616] md:text-[12px]">
                <img src="/img/Scale2.png" alt="" className="h-3.5 w-3.5 object-contain md:hidden" />
                <img src="/img/Scale.png" alt="" className="hidden h-3.5 w-3.5 object-contain md:inline-block" />
                What verification does
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-[13px] leading-snug text-[#161616] md:text-[12px]">
                <li className="flex items-start gap-2">
                  <img
                    src="/img/Greencheck.png"
                    alt=""
                    className="mt-px h-3.5 w-3.5 shrink-0 object-contain"
                  />
                  Confirms you’re an active member of the Trent community
                </li>
                <li className="flex items-start gap-2">
                  <img
                    src="/img/Greencheck.png"
                    alt=""
                    className="mt-px h-3.5 w-3.5 shrink-0 object-contain"
                  />
                  Lets you list sublets, send private messages
                  <span className="hidden md:inline">, and arrange purchases</span>
                </li>
              </ul>

              <div className="mt-3 rounded-lg border-2 border-[#161616] bg-[#ffa53a] p-3">
                <p className="flex items-start gap-1.5 text-[13px] font-semibold leading-snug text-[#161616] md:hidden">
                  <img src="/img/Warning.png" alt="" className="mt-0.5 h-4 w-4 shrink-0 object-contain" />
                  Security Protocol Advisory
                </p>
                <p className="mt-1 pl-[22px] text-[12px] leading-snug text-[#161616] md:hidden">
                  Never share your password or portal credentials. TrentTrust
                  will never ask for them.
                </p>
                <p className="hidden items-start gap-1.5 text-[14px] font-medium leading-snug text-[#161616] md:flex">
                  <img src="/img/Warning.png" alt="" className="h-4 w-4 shrink-0 object-contain" />
                  Never share your password or portal credentials. TrentTrust
                  staff will never ask for them.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* FOOTER (desktop only) */}
      <footer className="hidden flex-col items-center justify-between gap-2 border-t border-black/10 px-6 py-5 text-[12px] text-black/40 md:flex lg:flex-row lg:px-12">
        <span>
          © 2025 TrentTrust University Exchange. Institutional single sign-on
          security enabled.
        </span>
        <div className="flex gap-4">
          <Link to="/security" className="hover:underline">
            Security Protocol
          </Link>
          <Link to="/privacy" className="hover:underline">
            Student Privacy Charter
          </Link>
          <Link to="/help" className="hover:underline">
            Identity Help Desk
          </Link>
        </div>
      </footer>
    </div>
  );
}