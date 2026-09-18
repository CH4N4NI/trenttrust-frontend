function StatsSection() {
  const stats = [
    {
      value: "1,200+",
      label: "Verified Trent students",
      sub: "@trentu.ca authenticated",
    },
    {
      value: "86",
      label: "Active housing listings",
      sub: "Zero ghost sublets",
    },
    {
      value: "~2h",
      label: "Avg. reply time",
      sub: "Shielded in-app relay",
    },
    {
      value: "7",
      label: "Reports resolved",
      sub: "100% within 24h",
    },
  ];

  return (
    <section className="mx-10 my-32">
      <h2 className="text-center font-serif text-3xl text-black">
        Trust you can count, not claim.
      </h2>

      <div className="mt-10 grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[#e9e8da] px-6 py-10 text-center border-2"
          >
            <p className="font-serif text-5xl text-black">{stat.value}</p>
            <p className="mt-4 text-[15px] font-medium text-black">
              {stat.label}
            </p>
            <p className="mt-1 text-[13px] text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;