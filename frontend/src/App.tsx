import React from 'react';
import './assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TrainingPage from './pages/TrainingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/training" element={<TrainingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;