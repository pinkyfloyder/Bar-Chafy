import React, { useState } from 'react';
import { FaUserCircle, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import ShowProfile from './ShowProfile';
import './Navbar.css';

const SimpleAuthMenu = () => {
  const [user, setUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      return u && u.name ? u : null;
    } catch {
      return null;
    }
  });
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });
      console.log('Respuesta fetch:', res);
      const contentType = res.headers.get('content-type');
      console.log('Content-Type:', contentType);
      if (!res.ok) {
        setLoginError('Login incorrecto.');
        return;
      }
      if (!contentType || !contentType.includes('application/json')) {
        setLoginError('Respuesta no es JSON. Content-Type: ' + contentType);
        return;
      }
      const data = await res.json();
      console.log('Respuesta login:', data);
      if (data && data.user && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setShowLogin(false);
        setForm({ email: '', password: '' });
      } else {
        setLoginError('Login incorrecto. Respuesta: ' + JSON.stringify(data));
      }
    } catch (e) {
      console.log('Error en catch:', e);
      setLoginError('Error de red: ' + e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <FaUserCircle size={32} color="#ff9800" style={{ marginRight: 8 }} />
      {user ? (
        <>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '1px' }}>{user.name}</span>
          <button
            onClick={() => setShowProfile(true)}
            style={{ marginLeft: 12, background: 'none', border: 'none', color: '#ff9800', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <FaUser /> Mi perfil
          </button>
          <button
            onClick={handleLogout}
            style={{ marginLeft: 12, background: 'none', border: 'none', color: '#ff9800', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <FaSignOutAlt /> Logout
          </button>
          {showProfile && (
            <ShowProfile onClose={() => setShowProfile(false)} />
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setShowLogin(true)}
            style={{ background: 'none', border: 'none', color: '#ff9800', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <FaSignInAlt /> Login
          </button>
          {showLogin && (
            <div className="register-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowLogin(false)}>
              <div className="register-modal-content" style={{ maxWidth: 400, margin: '10vh auto', background: '#232323', borderRadius: 16, padding: 32, position: 'relative' }} onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">Login</h2>
                {loginError && <div style={{ color: '#ff9800', marginBottom: 12, textAlign: 'center' }}>{loginError}</div>}
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 8, border: '1px solid #ff9800', background: '#232323', color: '#fff' }}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 8, border: '1px solid #ff9800', background: '#232323', color: '#fff' }}
                    required
                  />
                  <button
                    type="submit"
                    style={{ width: '100%', background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: 12, fontSize: '1.1rem', cursor: 'pointer' }}
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SimpleAuthMenu;
