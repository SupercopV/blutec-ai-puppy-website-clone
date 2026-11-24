import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingBar from './components/FloatingBar';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Puppies from './pages/Puppies';
import PuppyDetail from './pages/PuppyDetail';
import HowItWorks from './pages/HowItWorks';
import HappyFamilies from './pages/HappyFamilies';
import GoneHome from './pages/GoneHome';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#fffdf8] text-[#2a170e]">
        <Header />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/puppies" element={<Puppies />} />
            <Route path="/puppies/:slug" element={<PuppyDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/happy-families" element={<HappyFamilies />} />
            <Route path="/gone-home" element={<GoneHome />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <FloatingBar />
        <Footer />
      </div>
    </Router>
  );
}
