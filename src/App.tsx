import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from './contexts/LocalizationContext';
import { AdminProvider } from './contexts/AdminContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import News from './pages/News';
import Contact from './pages/Contact';

const App = () => (
  <LocalizationProvider>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </LocalizationProvider>
);

export default App;
