function RentingInfoSection() {
  return (
    <section className="mx-10 my-10 rounded-[2.5rem] bg-[#1A1A1A] px-16 py-14">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <h2 className="font-serif text-5xl text-white">New to renting in Ontario?</h2>
        <p className="mt-3 max-w-4xl text-xl leading-relaxed text-[#e4e4d0] tracking-tighter">
          Know your rights before signing any lease or sending a dollar. Peterborough
          <br />
          municipal standards and Ontario provincial law protect you against exploitative
          <br />
          rental terms.
        </p>

        {/* cards */}
        <div className="mt-10 grid grid-cols-3 gap-6">

          <div className="rounded-2xl border border-white/10 bg-[#ffffeb] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <img src="/img/Lock.png" alt="" />
            </div>
            <h3 className="mt-4 text-[18px] text-[#1A1A1A]">Deposit Rules</h3>
            <p className="mt-2 text-[15px] leading-relaxed text[#222222]">
              Under the Ontario RTA, landlords are strictly
              prohibited from collecting “damage
              deposits”, cleaning fees, or holding charges.
              Only first and last month's rent is legally
              permitted.
            </p>
            <div className="mt-4 border-t border-[#e4e4d0] pt-3 text-[12px] font-semibold">
              RTA Section 105 Compliance
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#ffffeb] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <img src="/img/FileText.png" alt="" />
            </div>
            <h3 className="mt-4 text-[18px] text-[#1A1A1A]">Standard Lease Basics</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#222222]">
              Private landlords in Ontario must execute the
              mandatory Ontario Standard Lease form.
              Custom drafted contracts with illegal
              clauses (e.g. “no guests”) are void by law.
            </p>
            <div className="mt-4 border-t border-[#e4e4d0] pt-3 text-[12px] font-semibold">
              Standard Form Available In-App
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#ffffeb] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <img src="/img/ShieldCheck.png" alt="" />
            </div>
            <h3 className="mt-4 text-[18px] text-[#1A1A1A]">Tenant Rights &amp; Safety</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2222222]">
              You are entitled to vital services (heat, water,
              electricity) and 24 hours written notice
              before any landlord entry. Peterborough
              City Bylaws govern maximum bedroom occupancy. 
            </p>
            <div className="mt-4 border-t border-[#e4e4d0] pt-3 text-[12px] font-semibold">
              Peterborough By-Law 17-066
            </div>
          </div>

        </div>

        {/* CTA */}
        <button className="mt-8 rounded-xl border-2 border-white bg-transparent px-6 py-2.5 text-[17px] font-semibold bg-white">
          Read full Ontario tenant guide
        </button>

      </div>
    </section>
  );
}

export default RentingInfoSection;