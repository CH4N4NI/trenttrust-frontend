function StatsSection() {
  const stats = [
    { value: "1,200+", label: "Verified Trent students"},
    { value: "86", label: "Active housing listings"},
    { value: "~2h", label: "Avg. In-App Response"},
    { value: "100%", label: "Reports Resolved <24h"},
  ]; 

  return (
    <section className="mx-2.5 my-10 lg:mx-10 lg:my-32">  
      <h2 className="text-center font-serif text-[28px] text-black lg:text-3xl">
        Trusted Campus Market
      </h2>
      <p className="text-center text-[#5F5E5E]">Trust you can count, not claim.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border-2 bg-[#e9e8da] px-3 py-6 text-center lg:px-6 lg:py-10"
          >
            <p className="font-serif text-4xl lg:text-5xl text-[#034F46]">{stat.value}</p>
            <p className="mt-3 text-[13px]  text-black lg:mt-4 lg:text-[15px]">
              {stat.label}
            </p>
            <p className="mt-1 text-[11px] text-gray-500 lg:text-[13px]">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;