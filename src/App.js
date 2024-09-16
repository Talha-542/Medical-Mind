import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/ContactUs/ContactUs';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ViewAllUsers from './components/AllUsers/ViewAllUsers';
import EditProfile from './components/Dashboard/EditProfile';
import AllPatients from './pages/doctor/AllPatients'


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/view-all-users" element={<ViewAllUsers />} />
        <Route path="/dashboard/edit" element={<EditProfile />} />
        <Route path="/doctor-dashboard/patients" element={<AllPatients/>} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route element={() => <h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}
