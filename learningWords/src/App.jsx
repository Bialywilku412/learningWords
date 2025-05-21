import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Card from './cards/card';
import Cards from './cards/cards';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
