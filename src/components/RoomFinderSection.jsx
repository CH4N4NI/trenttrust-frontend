import { ArrowRight } from "lucide-react";

function RoomFinderSection() {
  return (
    <section className="bg-[#e3e2d0] px-16 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-16">

        {/* left column */}
        <div>
          <span className="h-10 w-70 inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-[12px] font-medium uppercase tracking-wide text-white justify-center">
            <img src="/img/Plane.png" alt="" />
            For students arriving at Trent
          </span>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-black">
            Find your room before you land.
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-700">   
            Can't visit Peterborough in person? Browse rooms with verified
            floorplans, schedule live video walkthroughs, and connect
            directly with existing student tenants without exposing private
            telephone numbers.
          </p>

          <div className="relative mt-6 h-[324px] w-[472px] overflow-hidden rounded-[32px] border-2 border-black">
            <img
              src="/img/House.png"
              alt="Peterborough Heritage Collegiate Row"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/70 px-3 py-1.5 text-[11px] text-white">
              Peterborough Heritage Collegiate Row &bull; Near Symons Line 2
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-5">

          {/* listing card */}
          <div className="rounded-2xl border border-[2px] bg-[#fdfcf3] p-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                ✓ Video Tour On-File
              </span>
              <p className="text-lg font-semibold">
                $825 CAD <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>

            <h3 className="mt-4 font-serif text-xl">George Street North Residence</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
              Sunlit corner room adjacent to Traill College. Full continuous
              video walkthrough captured October 2024 showing water
              pressure, window seals, and common spaces.
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[13px]">
              <span className="text-gray-600">Available for Winter Term</span>
              <a href="#" className="flex items-center gap-1 font-medium">
                Request live tour
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* shielded comms card */}
          <div className="rounded-2xl border border-[2px] bg-[#fdfcf3] p-6">
            <div className="flex items-center gap-2">
              <img 
              src="/img/PrivacyCheck.png" 
              alt=""  
              />
              <h3 className="text-[15px] font-semibold">Shielded Student Communication</h3>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
              Arrange virtual meetups, clarify house guidelines, and exchange
              Ontario Standard Lease PDFs securely inside the platform
              without revealing personal WhatsApp or cellular numbers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default RoomFinderSection;