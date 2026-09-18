function Footer() {
  return (
    <footer className="bg-[#1c1c1c] px-16 py-16 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">

        {/* brand column */}
        <div>
          <div className="flex items-center gap-1.5 text-3xl font-semibold">
            <span className="font-serif">TrentTrust</span>
            <img src="/img/FooterIcon.png" alt="" />
          </div>

          <p className="mt-4 max-w-lg text-[14px]">
            A verified student broadsheet connecting the Trent University
            community. Structural transparency, 
            <br />
            certified peers, zero scam
            tolerance.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] text-gray-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Peterborough &amp; Durham GTA Network Active
          </span>
        </div>

        {/* platform links */}
        <div>
          <h3 className="text-[14px] font-semibold tracking-wide">
            PLATFORM
          </h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><a href="#" className="text-gray-300">Housing</a></li>
            <li><a href="#" className="text-gray-300">Marketplace</a></li>
            <li><a href="#" className="text-gray-300">Video tours</a></li>
            <li><a href="#" className="text-gray-300">Sublets</a></li>
          </ul>
        </div>

        {/* safety links */}
        <div>
          <h3 className="text-[14px] font-semibold tracking-wide">
            SAFETY
          </h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><a href="#" className="text-gray-300">Verification</a></li>
            <li><a href="#" className="text-gray-300">Report a listing</a></li>
            <li><a href="#" className="text-gray-300">Scam prevention</a></li>
          </ul>
        </div>

        {/* community links */}
        <div>
          <h3 className="text-[14px] font-semibold tracking-wide">
            TRENT COMMUNITY
          </h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><a href="#" className="text-gray-300">Support</a></li>
            <li><a href="#" className="text-gray-300">FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* bottom bar */}
      <div className="mx-auto mt-12 max-w-6xl border-t-2 border-[#42423e] pt-6">
        <div className="flex flex-col justify-between gap-2 text-[13px] text-[#8A8A80] md:flex-row">
          <p className="max-w-6xl">
            &copy; 2025 TrentTrust Broadside Publishing. TrentTrust verifies
            community membership and facilitates discovery and
            communication. It
            <br />
            does not hold deposits or process payments.
          </p>
          <p>Made for the Trent community &middot; Peterborough, Ontario</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;