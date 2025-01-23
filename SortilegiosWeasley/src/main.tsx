import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from "react-router";
import LandingPage from './paginas/Principal/landingPage';
import ProductoSeccion from './components/ProductoSeccion';
import VistaSeccion from './paginas/Principal/vistaSeccion';

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="VistaSeccion" element={<VistaSeccion />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element");
}