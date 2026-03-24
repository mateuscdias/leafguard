import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DetectorPage from './pages/DetectorPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detector" element={<DetectorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
