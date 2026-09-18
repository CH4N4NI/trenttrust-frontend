function SecuritySection() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-[40px] bg-[#191919] px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12">

        {/* Text content */}
        <div className="max-w-lg text-white ">
          <h2 className="leading-tight font-text-5xl">
            Everyone is verified.
            <br />
            Everything is
            <br />
            reportable.
          </h2>

          <p className="mt-5 text-xl leading-6 text-gray-300">
            Unlike anonymous classifieds and unstructured social
            message boards, TrentTrust ties every transaction to
            an actively matriculated university identity. Human
            student moderators review incident escalations within
            24 hours.
          </p>
        </div>

        {/* Mockup */}
        <div>
          <img
            src="/img/Trent Verified.png"
            alt="TrentTrust verified messaging"
            className=" rounded-[40px]"
          />
        </div>

      </div>
    </section>
  );
}
export default SecuritySection;
