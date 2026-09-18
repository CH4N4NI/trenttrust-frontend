function Navbar() {
  return (
    <div className="w-[1280px] max-w-full mx-auto h-[115px] pt-6 pr-10 pb-4 pl-10">
      <nav className="flex h-full items-center justify-between rounded-full border-2 border-black bg-[#ffffeb] px-8">

        {/* logo */}
        <div className="flex items-center gap-3">
          <img src="/img/Logo.png" alt="" />
          <h1 className="text-xl font-serif">
            Trent<span className="font-bold text-[#006b62]">Trust</span>
          </h1>
        </div>

        {/* links */}
        <div className="flex items-center gap-8 text-[15px]">
          <a href="#">Housing</a>
          <a href="#">Marketplace</a>

          <a href="#" className="flex items-center gap-1.5">
            Messages
            <span className="h-1.5 w-1.5 rounded-full bg-[#006b62]"></span>
          </a>

          <a href="#">Saved</a>
        </div>

        {/* post button */}
        <button className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#e8d5ff] px-5 py-2 text-[15px]">
          Post a listing
          <span className="text-lg leading-none">+</span>
        </button>

      </nav>
    </div>
  );
}

export default Navbar;