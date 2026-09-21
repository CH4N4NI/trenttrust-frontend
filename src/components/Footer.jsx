function Footer() {
  return (
    <footer className="bg-[#1c1c1c] px-5 py-10 text-white rounded-t-3xl lg:px-16 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">

        {/* brand column */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-2xl font-semibold lg:text-3xl">
            <span className="font-serif">TrentTrust</span>
            <img src="/img/FooterIcon.png" alt="" />
          </div>

          <p className="mt-3 max-w-lg text-[13px] leading-snug text-gray-300 lg:mt-4 lg:text-[14px] lg:text-white">
            A verified student broadsheet connecting the Trent University
            community. Structural transparency,{" "}
            <br className="hidden lg:block" />
            certified peers, zero scam tolerance.
          </p>

          {/* network badge (desktop only) */}
          <span className="mt-5 hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] text-gray-300 lg:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Peterborough &amp; Durham GTA Network Active
          </span>
        </div>

        {/* platform links */}
        <div>
          <h3 className="text-[12px] font-semibold tracking-wide lg:text-[14px] text-[#AFEFE2]">
            PLATFORM
          </h3>
          <ul className="mt-3 space-y-2.5 text-[14px] lg:mt-4 lg:space-y-3 lg:text-[15px]">
            <li><a href="#" className="text-gray-300">Housing</a></li>
            <li><a href="#" className="text-gray-300">Marketplace</a></li>
            <li><a href="#" className="text-gray-300">Video tours</a></li>
            <li><a href="#" className="text-gray-300">Sublets</a></li>
          </ul>
        </div>

        {/* safety links */}
        <div>
          <h3 className="text-[12px] font-semibold tracking-wide lg:text-[14px] text-[#AFEFE2]">
            SAFETY
          </h3>
          <ul className="mt-3 space-y-2.5 text-[14px] lg:mt-4 lg:space-y-3 lg:text-[15px]">
            <li><a href="#" className="text-gray-300">Verification</a></li>
            <li><a href="#" className="text-gray-300">Report a listing</a></li>
            <li><a href="#" className="text-gray-300">Scam prevention</a></li>
          </ul>
        </div>

        {/* community links */}
        <div>
          <h3 className="text-[12px] font-semibold tracking-wide lg:text-[14px] text-[#AFEFE2]">
            TRENT COMMUNITY
          </h3>
          <ul className="mt-3 space-y-2.5 text-[14px] lg:mt-4 lg:space-y-3 lg:text-[15px]">
            <li><a href="#" className="text-gray-300">Support</a></li>
            <li><a href="#" className="text-gray-300">FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* bottom bar */}
      <div className="mx-auto mt-8 max-w-6xl border-t-2 border-[#42423e] pt-5 lg:mt-12 lg:pt-6">
        <div className="flex flex-col justify-between gap-2 text-[11px] leading-snug text-[#8A8A80] lg:flex-row lg:text-[13px]">
          <p className="max-w-6xl">
            &copy; 2025 TrentTrust Broadside Publishing. TrentTrust verifies
            community membership and facilitates discovery and
            communication. It{" "}
            <br className="hidden lg:block" />
            does not hold deposits or process payments.
          </p>
          <p>Made for the Trent community &middot; Peterborough, Ontario</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;  