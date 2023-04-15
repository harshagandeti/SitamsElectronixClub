import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes,useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify"
import Header from "./Components/Header/Header";
import NavBar from "./Components/Nav-Bar/NavBar";
import Home from "./Components/Home/Home";
import Gallery from "./Components/Gallery/Gallery"
import ProjectsPage from "./Components/Project-Page/ProjectsPage"
import AdminAuth from "./Components/Admin-Components/Admin-Auth_page/AdminAuth";
import AdminDashBoard from "./Components/Admin-Components/Admin-DashBoard-Page/AdminDashBoard";
import Footer from "./Components/Footer/Footer";
import WebDevelopement from "./Components/Pages/WebDevelopment";
import MachineLearning from "./Components/Pages/MachineLearning";
import AboutUs from "./Components/About-Us/AboutUs";
import AddImages from "./Components/Admin-Components/Add-images-Page/AddImages";
import AddProjects from "./Components/Admin-Components/Add-Projects-page/AddProjects";
import ECE_Dept from "./Components/ECE-Dept/ECE_Dept";
import Testmonials from "./Components/Home-Page-Components/TestMonials/Testmonials"
import AboutDept from "./Components/ECE-Dept/About-Dept/AboutDept";
import FacultyProfile from "./Components/ECE-Dept/Faculty-Profiles/FacultyProfile";
import Labs from "./Components/ECE-Dept/Labs/Labs"
import FullProfile from "./Components/ECE-Dept/Faculty-Profiles/Full-Profile/Card";
import AddFaculty from "./Components/Admin-Components/Add-Faculty/AddFaculty";
import Events from "./Components/Events/Events";
import AddEvents from "./Components/Admin-Components/Add-Events/AddEvents";
import UpdateProfile from "./Components/Admin-Components/Update-pages/FacultyProfile";
import { useContext, useState } from "react";
import { AuthContext } from "./Components/Context/AuthContext";
import AdminAbout from "./Components/Admin-Components/Admin-About/AdminAbout";
import AddStudentMembers from "./Components/Admin-Components/Add-Student-Members/AddStudentMembers";


function App() {
const {authAdmin}=useContext(AuthContext)

const ReqiuredAuth=({children})=>{
return authAdmin ? children :<Navigate to='/'></Navigate>
}
  return (
    <div className="App">
      <div className="landingBackGround">
        <BrowserRouter>
       <ToastContainer/>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home  />}></Route>
            <Route path="/gallery"  element={<Gallery />}></Route>
            <Route path="/projects"  element={<ProjectsPage />}></Route>
            <Route path="/events"  element={<Events />}></Route>
            <Route path="/testmonials"  element={<Testmonials />}></Route>
            <Route path="/about-us"  element={<AboutUs />}></Route>
            <Route path="/admin-auth"  element={<AdminAuth />}></Route>
            <Route path="/admin-dash-board"  element={<ReqiuredAuth><AdminDashBoard /></ReqiuredAuth>}></Route>
            <Route path="/admin-about-us"  element={<ReqiuredAuth><AdminAbout /></ReqiuredAuth>}></Route>
            <Route path="/admin-add-project"  element={<ReqiuredAuth><AddProjects /></ReqiuredAuth>}></Route>
            <Route path="/admin-add-events"  element={<ReqiuredAuth><AddEvents  /></ReqiuredAuth>}></Route>
            <Route path="/admin-add-faculty"  element={<ReqiuredAuth><AddFaculty /></ReqiuredAuth>}></Route>
            <Route path="/admin-Update-faculty"  element={<ReqiuredAuth><UpdateProfile /></ReqiuredAuth>}></Route>
            <Route path="/admin-add-gallery-img"  element={<ReqiuredAuth><AddImages /></ReqiuredAuth>}></Route>
            <Route path="/admin-add-student-members"  element={<ReqiuredAuth><AddStudentMembers /></ReqiuredAuth>}></Route>
            <Route path="/domain-web-development"  element={<WebDevelopement />}></Route>
            <Route path="/domain-machine-learning"  element={<MachineLearning />}></Route>
            <Route path="/domain-machine-learning"  element={<MachineLearning />}></Route>
          
            <Route path="/ece-dept"  element={<ECE_Dept />}/>
            <Route path="/about-ece-dept" exact index element={<AboutDept />}></Route>
            <Route path="/labs"  element={<Labs />}></Route>
            <Route path="/faculty-profiles"  element={<FacultyProfile />}></Route>

            <Route path="/faculty-full-profile"  element={<FullProfile />}>
            </Route>


            

          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
