function Hero() {
  return (
    <section className="mx-auto max-w-6xl bg-[#ffffeb] px-5 pt-8 pb-10 text-center lg:px-6 lg:pt-20 lg:pb-20">

      {/* headline */}
      <h2 className="font-serif text-[40px] leading-[1.1] text-[#8a8a80] lg:text-6xl">
        Moving to a new country is hard.
      </h2>
      <h2 className="-mt-2 font-serif text-[40px] leading-[1.1] text-black lg:text-6xl">
        Finding your{" "}
        <span className="relative inline-block">
          room
          <img src="/img/curve.png" alt="" />
        </span>{" "}
        shouldn't be.
      </h2>

      {/* subtext */}
      <p className="mx-auto mt-6 max-w-xl text-base text-gray-900 lg:text-lg lg:text-gray-700">
        Housing, textbooks, winter gear, and furniture from verified Trent
        students only. No strangers, no scams, no deposits sent into the
        void.
      </p>

      {/* CTA */}
      <button className="mt-7 w-full rounded-xl border-2 border-black bg-[#e8d5ff] px-8 py-4 text-base font-medium lg:mt-6 lg:w-76 lg:py-3 lg:text-[15px]">
        Get started
      </button>

      {/* feature strip: mobile pills */}
      <div className="mx-5 mt-6 flex flex-col gap-2 text-[13px] lg:hidden">
        <div className="rounded-full border-2 border-black bg-[#006b62] py-1.5 text-white">
          ✓ 1,200+ verified students
        </div>
        <div className="rounded-full border-2 border-black bg-[#ffffeb] py-1.5">
          Private in-app messaging
        </div>
        <div className="rounded-full border-2 border-black bg-[#ffffeb] py-1.5">
          We never touch your money
        </div>
      </div>

      {/* feature strip: desktop */}
      <div className="mt-10 hidden justify-center lg:flex">
        <div className="inline-flex items-center gap-36 border-t border-gray-200 pt-6 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img src="img/Verified.png" alt="" />
            </span>
            Verified students only
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img src="/img/Private.png" alt="" />
            </span>
            Private in-app messaging
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
              <img src="/img/Report.png" alt="" />
            </span>
            Report anything, anytime
          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;