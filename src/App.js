import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/ContactUs/ContactUs';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

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
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={() => <h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}
