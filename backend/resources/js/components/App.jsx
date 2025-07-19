import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import PanelesHome from './PanelesHome';
import MenuData from './MenuData';
import CartasSection from './CartasSection';
import EventosSection from './EventosSection';

const MenuPage = () => (
  <div className="menu-page">
    <h1>Menú</h1>
    <div className="menu-list">
      {MenuData.map(item => (
        <div key={item.id} className="menu-item">
          <img src={item.image} alt={item.name} className="menu-item-img" />
          <div className="menu-item-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="menu-item-price">${item.price}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<PanelesHome />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/eventos" element={<EventosSection />} />
      <Route path="/cartas" element={<CartasSection />} />
      {/* Puedes agregar más rutas aquí */}
    </Routes>
  </Router>
);

export default App;
