// Archivo limpiado para empezar de cero con Breeze/Sanctum
import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuth, user, onLogout }) => {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = tab === 'login' ? '/api/login' : '/api/register';
      // Usar URL relativa para descartar problemas de CORS/dominio
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tab === 'login' ? {
          email: form.email,
          password: form.password
        } : {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation
        }),
        credentials: 'omit'
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Respuesta inesperada del servidor. Verifica que el backend responde en JSON.');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error de autenticación');
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        // Obtener usuario autenticado
        const userRes = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'omit'
        });
        const userContentType = userRes.headers.get('content-type');
        if (!userContentType || !userContentType.includes('application/json')) {
          throw new Error('No se pudo obtener el usuario. Respuesta inesperada del servidor.');
        }
        const userData = await userRes.json();
        onAuth({ ...data, user: userData });
      } else {
        onAuth(data);
      }
      setForm({ name: '', email: '', password: '', password_confirmation: '' });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <span className="auth-close" onClick={onClose}>&times;</span>
        {user ? (
          <div className="auth-user">
            <p>Bienvenido, {user.name}!</p>
            <button className="auth-logout" onClick={onLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <>
            <div className="auth-tabs">
              <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Iniciar sesión</button>
              <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Registrarse</button>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {tab === 'register' && (
                <input name="name" type="text" placeholder="Nombre" value={form.name} onChange={handleChange} required />
              )}
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
              {tab === 'register' && (
                <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" value={form.password_confirmation} onChange={handleChange} required />
              )}
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-btn" type="submit" disabled={loading}>{loading ? 'Procesando...' : (tab === 'login' ? 'Entrar' : 'Registrarse')}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
