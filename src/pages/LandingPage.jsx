import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import SecuritySection from "../components/SecuritySection";
import RoomFinderSection from "../components/RoomFinderSection";
import HeroBanner from "../components/HeroBanner";
import MarketPlaceGrid from "../components/MarketPlaceGrid";
import RentingInfoSection from "../components/RentingInfoSection";
import StatsSection from "../components/StatsSection";
import ClosingCTASection from "../components/ClosingCTASection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#ffffeb]">
      <Navbar />
      <Hero />
      <Steps />
      <SecuritySection />
      <RoomFinderSection />
      <HeroBanner />
      <MarketPlaceGrid />
      <RentingInfoSection />
      <StatsSection />
      <ClosingCTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;