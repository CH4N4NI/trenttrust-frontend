function ClosingCTASection() {
  return (
    <section className="mx-10 my-16 rounded-[3rem] bg-[#1a1a1a] px-16 py-20 text-center text-white">
      <div className="mx-auto max-w-3xl">

        <h2 className="font-serif text-6xl">Your community is waiting.</h2>

        <p className="mt-5 text-xl text-gray-300 tracking-tighter ">
          Join over 1,200 verified Trent University students finding safe
          <br />
          housing and trusted campus marketplace deals.
        </p>

        <button className="mt-8 rounded-xl border border-black bg-[#F0D7FF] px-8 py-3 text-lg font-semibold text-black">
          Get verified — it's free
        </button>

        <p className="mt-6 text-[13px] text-[#8A8A80]">
          TrentTrust verifies community membership and facilitates discovery
          and 
          <br />
          communication. It does not guarantee the underlying
          transaction.
        </p>

      </div>
    </section>
  );
}

export default ClosingCTASection;