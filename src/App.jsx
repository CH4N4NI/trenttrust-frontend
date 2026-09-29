import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentVerification from "./pages/StudentVerification";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verification" element={<StudentVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;