import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaSignInAlt, FaUserPlus, FaUser, FaImages, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ShowProfile from './ShowProfile';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [syncTrigger, setSyncTrigger] = useState(0);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Sincronizar usuario y eventos
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    function handleClickOutside(e) {
      const dropdown = document.querySelector('.navbar-dropdown');
      const avatar = document.querySelector('.navbar-avatar');
      if (dropdown && avatar && !avatar.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('storage', syncUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showLoginModal, showRegisterModal, showProfileModal, syncTrigger]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', { credentials: 'include' });
      const xsrfToken = decodeURIComponent(
        document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || ''
      );
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        credentials: 'include',
      });
      localStorage.removeItem('user');
      setUser(null);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            Bar Chafy
          </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/menu">Menú</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Link to="/cart" className="navbar-cart" style={{ color: '#fff', position: 'relative' }}>
            <FaShoppingCart size={28} />
          </Link>
          <div className="navbar-avatar" style={{ position: 'relative', display: 'inline-block' }}>
            <FaUserCircle size={32} color="#ff9800" style={{ cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <div className="navbar-dropdown" style={{ position: 'absolute', right: 0, top: '100%', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: '200px', zIndex: 50, fontFamily: 'inherit' }}>
                <ul className="dropdown-list" style={{ listStyle: 'none', margin: 0, padding: '12px 0' }}>
                  {!user && (
                    <>
                      <li>
                        <button
                          className="dropdown-item flex items-center gap-2 px-4 py-2 text-black hover:bg-orange-100 w-full text-left"
                          onClick={() => { setShowLoginModal(true); setShowDropdown(false); }}
                        >
                          <FaSignInAlt /> Login
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item flex items-center gap-2 px-4 py-2 text-black hover:bg-orange-100 w-full text-left"
                          onClick={() => { setShowRegisterModal(true); setShowDropdown(false); }}
                        >
                          <FaUserPlus /> Registro
                        </button>
                      </li>
                    </>
                  )}
                  {user && (
                    <>
                      <li>
                        <button
                          className="dropdown-item flex items-center gap-2 px-4 py-2 text-black hover:bg-orange-100 w-full text-left"
                          onClick={() => { setShowProfileModal(true); setShowDropdown(false); }}
                        >
                          <FaUser /> Mi cuenta
                        </button>
                      </li>
      {showProfileModal && (
        <ShowProfile onClose={() => setShowProfileModal(false)} onProfileUpdate={user => { setUser(user); setSyncTrigger(t => t + 1); }} />
      )}
                      <li>
                        <Link to="/album" className="dropdown-item flex items-center gap-2 px-4 py-2 text-black hover:bg-orange-100">
                          <FaImages /> Mi Álbum
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item flex items-center gap-2 px-4 py-2 w-full text-left text-black hover:bg-orange-100" onClick={handleLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showRegisterModal && (
        <RegisterForm onClose={() => { setShowRegisterModal(false); const stored = localStorage.getItem('user'); if (stored) setUser(JSON.parse(stored)); }} />
      )}
      {showLoginModal && (
        <LoginForm onClose={() => { setShowLoginModal(false); const stored = localStorage.getItem('user'); if (stored) setUser(JSON.parse(stored)); }} onLogin={(user) => { setUser(user); setSyncTrigger(t => t + 1); setShowLoginModal(false); }} />
      )}
      {/* ...existing code... */}
    </>
  );
}

export default Navbar;
