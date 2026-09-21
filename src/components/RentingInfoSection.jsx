const rules = [
  {
    icon: "/img/Lock.png",
    title: "Deposit Rules",
    text: "Landlords in Ontario are strictly prohibited from demanding damage deposits, holding charges, or key deposits exceeding actual replacement cost (RTA Section 105).",
    footer: "RTA Section 105 Compliance",
  },
  {
    icon: "/img/FileText.png",
    title: "Standard Lease Basics",
    text: "Private landlords in Ontario must execute the mandatory Ontario Standard Lease form. Custom drafted contracts with illegal clauses (e.g. “no guests”) are void by law.",
    footer: "Standard Form Available In-App",
  },
  {
    icon: "/img/ShieldCheck.png",
    title: "Tenant Rights & Safety",
    text: "You are entitled to vital services (heat, water, electricity) and 24 hours written notice before any landlord entry. Peterborough City Bylaws govern maximum bedroom occupancy.",
    footer: "Peterborough By-Law 17-066",
  },
];

function RentingInfoSection() {
  return (
    <section className="mx-2.5 my-6 rounded-[28px] bg-[#00524a] px-5 py-8 lg:mx-10 lg:my-10 lg:rounded-[2.5rem] lg:bg-[#1A1A1A] lg:px-16 lg:py-14">
      <div className="mx-auto max-w-6xl">

        {/* tag (mobile only) */}
        <span className="mb-3 inline-flex rounded-full py-1 text-[15px] uppercase tracking-wide text-[#a8ecdf] lg:hidden">
          PROVINCIAL LEGAL FRAMEWORK {/* check */}
        </span>

        {/* header */}
        <h2 className="font-serif text-[30px] leading-tight text-white lg:text-5xl">
          New to renting in Ontario?
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#e4e4d0] lg:text-xl lg:tracking-tighter">
          Know your non-negotiable statutory
          protections before signing.
          <br className="hidden lg:block" />{" "}

        </p>

        {/* cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {rules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-2xl border-2 bg-[#ffffeb] p-4 lg:border-white/10 lg:bg-[#ffffeb] lg:p-6"
            >
              <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 lg:flex">
                <img src={rule.icon} alt="" />
              </div>
              <h3 className="text-base text-[#034F46] lg:mt-4 lg:text-[18px] lg:text-[#1A1A1A]">
                {rule.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed lg:text-[15px]">
                {rule.text}
              </p>
              <div className="mt-4 hidden border-t border-[#e4e4d0] pt-3 text-[12px] font-semibold lg:block">
                {rule.footer}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-6 w-full rounded-xl border-2 border-white px-6 py-3 text-[15px] font-semibold text-white lg:mt-8 lg:w-auto lg:py-2.5 lg:text-[17px]">
          Read full Ontario tenant guide
        </button>

      </div>
    </section>
  );
}

export default RentingInfoSection;  