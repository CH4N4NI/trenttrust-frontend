function ClosingCTASection() {
  return (
    <section className="mx-2.5 my-24 rounded-[28px] bg-[#1a1a1a] px-5 py-10 text-center text-white lg:mx-10 lg:my-16 lg:rounded-[3rem] lg:px-16 lg:py-20">
      <div className="mx-auto max-w-3xl">

        <h2 className="font-serif text-[32px] leading-tight lg:text-6xl">
          Your community is waiting.
        </h2>

        <p className="mt-4 text-[15px] leading-snug text-gray-300 lg:mt-5 lg:text-xl lg:tracking-tighter">
          Join over 1,200 verified Trent University students finding safe
          <br className="hidden lg:block" />{" "}
          housing and trusted campus marketplace deals.
        </p>

        <button className="mt-6 w-full rounded-xl border border-black bg-[#F0D7FF] px-8 py-3 text-base font-semibold text-black lg:mt-8 lg:w-auto lg:text-lg">
          Get verified — it's free
        </button>

        <p className="mt-5 text-xs leading-snug text-[#8A8A80] lg:mt-6 lg:text-[13px]">
          TrentTrust verifies community membership and facilitates
          discovery. It does not hold deposits or process payments.
        </p>

      </div>
    </section>
  );
}

export default ClosingCTASection;