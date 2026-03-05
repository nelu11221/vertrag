import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Produse from './pages/Produse';
import Industrii from './pages/Industrii';
import Despre from './pages/Despre';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produse" element={<Produse />} />
          <Route path="/produse/:slug" element={<Produse />} />
          <Route path="/industrii" element={<Industrii />} />
          <Route path="/industrii/:slug" element={<Industrii />} />
          <Route path="/despre" element={<Despre />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;