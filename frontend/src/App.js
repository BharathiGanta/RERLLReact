import { React } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Common/Registration";
import LoginPage from "./Common/LoginPage";
import About from './Common/About'
import ResetPassword from "./Common/Useresetpass";
import ReschedulePage from "./User/ReschedulePage";
import VaccineHistoryPage from "./User/VaccineHistory";
import Booking from "./User/Booking";
import WelcomePage from "./Common/WelcomePage";
import ContactPage from "./Common/Contact";
import Adminpage from "./Admin/AdminNavbar";
import AddVaccine from "./Admin/AddVaccine";
import VaccinePostedPage from "./Admin/VaccinePostedPage";
import AvailableVaccine from "./User/AvailableVaccine";
import AdminDashboard from "./Admin/AdminDashboard";
import UserHome from "./User/UserHome";
import ProfilePage from "./User/Profilepage";
import { useUser } from "./Common/UserContext";

const App = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/userresetpass" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />

        {user && (
          <>
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/AdminNavbar" element={<Adminpage />} />
            <Route path="/Reschedule" element={<ReschedulePage />} />
            <Route path="/Vaccinehistory" element={<VaccineHistoryPage />} />
            <Route path="/bookslot" element={<Booking />} />
            <Route path="/reschedulepage" element={<ReschedulePage />} />
            <Route path="/availablevaccine" element={<AvailableVaccine />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/Add-vaccine" element={<AddVaccine />} />
            <Route path="/vaccine-posted" element={<VaccinePostedPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </>
        )}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
