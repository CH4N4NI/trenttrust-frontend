function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-20 text-center bg-[#ffffeb]">

      {/* headline */}
      <h2 className="font-serif text-6xl leading-[1.1] text-[#8a8a80]">
        Moving to a new country is hard.
      </h2>
      <h2 className="font-serif text-6xl leading-[1.1] text-black -mt-2">
        Finding your{" "}
        <span className="relative inline-block">
          room
          <img src="/img/curve.png" alt="" />
        </span>{" "}
        shouldn't be.
      </h2>

      {/* subtext */}
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-700">
        Housing, textbooks, winter gear, and furniture from verified Trent
        students only. No strangers, no scams, no deposits sent into the
        void.
      </p>

      {/* CTA */}
      <button className="mt-6 w-76 rounded-xl border-2 border-black bg-[#e8d5ff] px-8 py-3 text-[15px] font-medium">
        Get started
      </button>

      {/* feature strip */}
<div className="mt-10 flex justify-center">
  <div className="inline-flex items-center gap-36 border-t border-gray-200 pt-6 text-sm text-gray-800">
    <div className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
        <img 
        src="img/Verified.png" alt=""/>
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