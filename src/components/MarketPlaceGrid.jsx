const products = [
  {
    tag: "COIS 1010",
    status: "Verified Seller",
    title: "Introduction to Computer Science",
    subtitle: "From $45 · 12 copies active",
    footnote: "Pick up at Bata Library",
    image: "/img/Computer Science.png",
  },
  {
    tag: "WINTER 2025",
    status: "Sub-Zero Rated",
    title: "Parkas & Snow Boots",
    subtitle: "Tested by students in Kawartha frost",
    footnote: "Save ~85% vs. Retail",
    image: "/img/Parkas & Snow boots.png",
  },
  {
    tag: "TECH",
    status: "Tested & Working",
    title: "Monitors, Displays & Peripherals",
    subtitle: "Checked and student-priced",
    footnote: "Includes Power Adapters",
    image: "/img/Monitor.png",
  },
  {
    tag: "LIVING",
    status: "Ready for Move-In",
    title: "Desks, Chairs & Bedframes",
    subtitle: "Pick up Symons / Downtown",
    footnote: "Curbside / Dorm Assist",
    image: "/img/Desk and Chair.jpg",
  },
];

function ProductCard({ product }) {
  return (
    <div className="flex h-[430px] flex-col overflow-hidden rounded-2xl border-2 bg-[#ffffeb]">

      {/* CARD TOP */}
      <div className="flex items-center justify-between px-3 pt-3">

        <span className="rounded-lg bg-[#161616] px-2.5 py-1 text-[10px] font-medium text-white">
          {product.tag}
        </span>

        <span className="rounded-full bg-[#ffffeb] px-2.5 py-1 text-[10px] font-medium text-[#161616]">
          ✓ {product.status}
        </span>

      </div>

      {/* IMAGE */}
      <div className="mx-5 mt-3 h-[188px] overflow-hidden rounded-xl border-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">

        <h3 className="text-xl font-normal leading-snug text-[#161616]">
          {product.title}
        </h3>

        <p className="mt-1 text-[17px] leading-snug text-[#99998d]">
          {product.subtitle}
        </p>

        <p className="mt-auto text-[13px] font-medium border-t-2 border-[#f1f1dd] text-right py-4">
          {product.footnote}
        </p>

      </div>
    </div>
  );
}

export default function MarketPlaceGrid() {
  return (
    <section className="bg-[#ffffeb] px-6 pb-20">
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b-2 pb-4">

          <h2 className="font-serif text-4xl font-medium text-[#161616]">
            <span className="text-5xl font-normal">E</span>
            verything a student needs.
          </h2>

          <a
            href="#marketplace"
            className="flex items-center gap-1 text-xl font-medium text-[#191919] border-b-1  "
          >
            Browse the full marketplace →
          </a>

        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}