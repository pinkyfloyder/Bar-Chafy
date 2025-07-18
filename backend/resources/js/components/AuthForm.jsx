import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ajusta si usas otro puerto/backend

const AuthForm = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors(null);
    setSuccess('');
    try {
      // Paso 1: Obtener la cookie CSRF
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });

      // Paso 2: Obtener el token XSRF-TOKEN
      function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
      }
      const xsrfToken = getCookie('XSRF-TOKEN');
      console.log('document.cookie:', document.cookie);
      console.log('XSRF-TOKEN AuthForm:', xsrfToken);

      // Paso 3: Login/Register (usar rutas API para Sanctum)
      const url = mode === 'login' ? `${API_URL}/api/login` : `${API_URL}/api/register`;
      const body = mode === 'login'
        ? { email, password }
        : { name, email, password, password_confirmation: passwordConfirmation };
      console.log('Datos enviados:', body);

      const res = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': xsrfToken || ''
        },
        withCredentials: true,
        validateStatus: () => true // Permite manejar errores manualmente
      });
      console.log('Respuesta completa:', res);

      if (res.status !== 200 && res.status !== 201) {
        if (res.status === 401 && res.data?.message === 'Unauthenticated.') {
          setError('Usuario o contraseña incorrectos');
          setErrors(null);
        } else if (res.status === 422 && res.data?.errors) {
          console.log('Errores de validación:', res.data.errors);
          setErrors(res.data.errors);
          setError('');
        } else {
          setError(res.data?.message || 'Error');
        }
        return;
      }
      setSuccess(mode === 'login' ? 'Login exitoso' : 'Registro exitoso');
      setErrors(null);
      if (mode === 'login') {
        setTimeout(async () => {
          try {
            const userRes = await axios.get(`${API_URL}/user`, {
              withCredentials: true,
              headers: { 'Accept': 'application/json' }
            });
            if (userRes.status === 200) {
              const user = userRes.data;
              localStorage.setItem('user', JSON.stringify(user));
              if (onLoginSuccess) onLoginSuccess(user);
            }
          } catch (e) { /* ignorar */ }
        }, 300);
      }
    } catch (err) {
      setError(err.message);
      setErrors(null);
      console.error('Error en axios:', err);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-tabs">
        <button onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
        <button onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>Registro</button>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'register' && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
            />
          </>
        )}
        {mode === 'login' && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">{mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}</button>
        {errors && (
          <div className="error-messages" style={{ color: '#ff9800', background: '#222', padding: '1em', borderRadius: '8px', marginBottom: '1em' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {Object.entries(errors).map(([field, messages]) => (
                Array.isArray(messages)
                  ? messages.map((msg, idx) => (
                      <li key={field + '-' + idx} style={{ marginBottom: '4px' }}>
                        <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {msg}
                      </li>
                    ))
                  : (
                      <li key={field} style={{ marginBottom: '4px' }}>
                        <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {messages}
                      </li>
                    )
              ))}
            </ul>
          </div>
        )}
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
      </form>
    </div>
  );
};

export default AuthForm;
