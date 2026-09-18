import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Steps from "./components/steps";
import SecuritySection from "./components/SecuritySection";
import RoomFinderSection from "./components/RoomFinderSection";
import HeroBanner from "./components/HeroBanner";
import MarketPlaceGrid from "./components/MarketPlaceGrid";
import RentingInfoSection from "./components/RentingInfoSection";
import StatsSection from "./components/StatsSection";
import ClosingCTASection from "./components/ClosingCTASection";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
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

export default App;