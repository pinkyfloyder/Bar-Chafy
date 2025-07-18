import React from 'react';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Modal from './components/Modal';
import RegisterForm from './components/RegisterForm';
import Banner from './components/Banner.jsx';
import CartasSection from './components/CartasSection.jsx';
import ComentariosSection from './components/ComentariosSection.jsx';
import ComoLlegasSection from './components/ComoLlegasSection.jsx';
import GanadorasSemana from './components/GanadorasSemana.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/menu.jsx';
import MenuData from './components/MenuData.jsx';
import Contacto from './components/contacto.jsx';

function App() {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenRegisterModal={() => setShowRegisterModal(true)} />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <div className="w-full max-w-6xl mx-auto py-8 bg-gray-50">
                <div className="flex flex-row gap-8 justify-center items-stretch mb-8">
                  <div className="flex-1 flex justify-end">
                    <CartasSection />
                  </div>
                  <div className="flex-1 flex justify-start">
                    <ComoLlegasSection />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <ComentariosSection />
                  <GanadorasSemana />
                </div>
              </div>
            </>
          } />
          <Route path="/menu" element={<MenuData />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <main className="flex-1 bg-gray-50"></main>
        <Footer />
        {showRegisterModal && (
          <RegisterForm onClose={() => setShowRegisterModal(false)} />
        )}
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
