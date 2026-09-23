export default function WelcomeNavbar() {
  return (
    <nav className="flex items-center justify-between bg-[#FFFFEB] px-4 py-3 md:mx-8 md:mt-8 md:rounded-[12px] md:border-2 md:bg-[#FFFFF8] md:px-8 md:py-4">
      {/* Logo group: desktop only */}
      <div className="hidden items-center gap-4 md:flex">
        <img src="/img/Logo.png" alt="" />
        <span className="font-serif text-xl text-neutral-900">
          Trent<span className="font-bold text-[#0E6B5C]">Trust</span>
        </span>
        <img src="/img/Vertical Divider.png" alt="" />
        <span className="text-sm font-medium uppercase tracking-wide text-[#8A8A80]">
          Student Auth
        </span>
      </div>

      <a href="/" className="flex items-center gap-2 text-lg transition-opacity hover:opacity-70">
        <img src="/img/Leftarrow.png" alt="" />
        <span className="sr-only md:not-sr-only">Back to Main Site</span>
      </a>
    </nav>
  );
}