import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentVerification from "./pages/StudentVerification";
import VerificationProgress from "./pages/VerificationProgress";
import BrowseHousing from "./pages/BrowseHousing";
import Marketplace from "./pages/Marketplace";
import CreateProfile from "./pages/CreateProfile";
import ItemDetail from "./pages/ItemDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verification" element={<StudentVerification />} />
        <Route path="/verification-progress" element={<VerificationProgress />} />
        <Route path="/browse-housing" element={<BrowseHousing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/marketplace/item" element={<ItemDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;