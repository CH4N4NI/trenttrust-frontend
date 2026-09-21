const products = [
  {
    tag: "COIS 1010",
    status: "Verified Seller",
    title: "Introduction to Computer Science",
    subtitle: "From $45 · 12 copies active",
    footnote: "Pick up at Bata Library",
    image: "/img/Computer Science.png",
    mobileTitle: "Intro to Computer Science",
    mobileDesc: "Clean hardcover, no highlighting",
    price: "$45 CAD",
    tagColor: "bg-[#a8ecdf]",
  },
  {
    tag: "WINTER 2025",
    status: "Sub-Zero Rated",
    title: "Parkas & Snow Boots",
    subtitle: "Tested by students in Kawartha frost",
    footnote: "Save ~85% vs. Retail",
    image: "/img/Parkas & Snow boots.png",
    mobileTitle: "Parkas & Snow Boots",
    mobileDesc: "Save ~65% vs Ontario retail",
    price: "From $35",
    tagColor: "bg-[#e8d5ff]",
  },
  {
    tag: "TECH",
    status: "Tested & Working",
    title: "Monitors, Displays & Peripherals",
    subtitle: "Checked and student-priced",
    footnote: "Includes Power Adapters",
    image: "/img/Monitor.png",
    mobileTitle: "Monitors & Adapters",
    mobileDesc: 'Dell 24" IPS & HDMI hubs',
    price: "From $60",
    tagColor: "bg-[#e3e2d0]",
  },
  {
    tag: "LIVING",
    status: "Ready for Move-In",
    title: "Desks, Chairs & Bedframes",
    subtitle: "Pick up Symons / Downtown",
    footnote: "Curbside / Dorm Assist",
    image: "/img/Desk and Chair.jpg",
    mobileTitle: "Desks, Chairs & Bedframes",
    mobileDesc: "Flat-pack ready for pickup",
    price: "From $20",
    tagColor: "bg-[#ffd9a8]",
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

function MobileProductCard({ product }) {
  return (
    <div className="flex flex-col rounded-[20px] border-2 border-[#161616] bg-[#fffff0] p-3.5">

      <span
        className={`w-fit rounded-md border-2 border-[#161616] px-2.5 py-1 text-xs ${product.tagColor}`}
      >
        {product.tag}
      </span>

      <h3 className="mt-3 text-[15px] leading-tight text-[#161616]">
        {product.mobileTitle}
      </h3>

      <p className="mt-1 text-[13px] leading-snug text-gray-500">
        {product.mobileDesc}
      </p>

      <div className="mt-auto pt-3">
        <p className="border-t border-[#e5e5d0] pt-3 text-[15px] font-medium text-[#00524a]">
          {product.price}
        </p>
      </div>

    </div>
  );
}

export default function MarketPlaceGrid() {
  return (
    <section className="bg-[#ffffeb] px-2.5 pt-10 pb-12 lg:px-6 lg:pt-0 lg:pb-20">
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 lg:items-end lg:border-b-2 lg:pb-4">

          <h2 className="font-serif text-[32px] font-medium leading-tight text-[#161616] lg:text-4xl">
            <span className="font-normal lg:text-5xl">E</span>
            verything a student needs.
          </h2>

          <a
            href="#marketplace"
            className="mt-2 flex shrink-0 items-center gap-1 text-sm font-medium text-[#00524a] underline underline-offset-2 lg:mt-0 lg:text-xl lg:text-[#191919] lg:no-underline lg:border-b-1"
          >
            <span className="lg:hidden">Browse full→</span>
            <span className="hidden lg:inline">Browse the full marketplace</span>
            
          </a>

        </div>

        {/* subtitle (mobile only) */}
        <p className="mt-1 text-sm text-gray-600 lg:hidden">
          Peterborough collegiate exchange
        </p>

        {/* MOBILE CARDS */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:hidden">
          {products.map((product) => (
            <MobileProductCard key={product.title} product={product} />
          ))}
        </div>

        {/* DESKTOP CARDS */}
        <div className="mt-10 hidden grid-cols-4 gap-6 lg:grid">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}