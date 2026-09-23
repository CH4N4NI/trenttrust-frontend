import WelcomeNavbar from "../components/WelcomeNavbar";
import WelcomeContent from "../components/WelcomeContent";

function Welcome() {
  return (
    <div className="min-h-screen bg-[#fffff8]">
      <WelcomeNavbar />
      <WelcomeContent />
    </div>
  );
}

export default Welcome;