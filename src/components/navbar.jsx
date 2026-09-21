function Navbar() {
  return (
    <div className="mx-auto w-[1280px] max-w-full px-5 pt-5 pb-3 lg:h-[115px] lg:px-10 lg:pt-6 lg:pb-4">
      <nav className="flex h-[72px] items-center justify-between rounded-full border-2 border-black bg-[#ffffeb] px-4 shadow-md lg:h-full lg:px-8 lg:shadow-none">

        {/* logo */}
        <div className="flex items-center gap-2 lg:gap-3">
          <img src="/img/Logo.png" alt="" className="h-9 w-9 lg:h-auto lg:w-auto" />
          <h1 className="font-serif text-lg lg:text-xl">
            Trent<span className="font-bold text-[#006b62]">Trust</span>
          </h1>
        </div>

        {/* links (desktop only) */}
        <div className="hidden items-center gap-8 text-[15px] lg:flex">
          <a href="#">Housing</a>
          <a href="#">Marketplace</a>

          <a href="#" className="flex items-center gap-1.5">
            Messages
            <span className="h-1.5 w-1.5 rounded-full bg-[#006b62]"></span>
          </a>

          <a href="#">Saved</a>
        </div>

        {/* post button (desktop only) */}
        <button className="hidden items-center gap-1.5 rounded-xl border-2 border-black bg-[#e8d5ff] px-5 py-2 text-[15px] lg:flex">
          Post a listing
          <span className="text-lg leading-none">+</span>
        </button>

        {/* get started button (mobile only) */}
        <button className="rounded-full border-2 border-black bg-[#e8d5ff] px-4 py-1.5 text-sm lg:hidden">
          Get started
        </button>

      </nav>
    </div>
  );
}

export default Navbar;