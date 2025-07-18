import React, { useState, useEffect } from 'react';
import './RegisterModalOverride.css';
import { createPortal } from 'react-dom';
import axios from 'axios';

const RegisterForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors({});
    try {
      const response = await axios.post('/api/register', form);
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm({ name: '', email: '', password: '', password_confirmation: '' });
      // Cierra el modal automáticamente después de mostrar el mensaje
      setTimeout(() => {
        if (onClose) onClose();
      }, 1200);
    } catch (err) {
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError('Error en el registro. Verifica los datos.');
      }
    }
  };

  if (!showModal || typeof window === 'undefined' || !document.getElementById('modal-root')) return null;
  return createPortal(
    <div
      className="register-modal-overlay"
      onClick={onClose}
    >
      <div
        className="register-modal-content"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-5xl font-bold mb-10 text-orange-500 text-center tracking-widest drop-shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif', letterSpacing: '3px' }}>Registro</h2>
        {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-400 mb-2 text-center">{success}</div>}
        {Object.keys(validationErrors).length > 0 && (
          <div className="text-red-400 mb-4 text-center">
            <ul className="list-disc list-inside inline-block text-left">
              {Object.entries(validationErrors).map(([field, messages]) =>
                messages.map((msg, idx) => (
                  <li key={field + '-' + idx}>{msg}</li>
                ))
              )}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block mb-2 text-orange-400 text-xl font-bold tracking-wide">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl shadow-md"
              required
              autoFocus
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          <div className="mb-8">
            <label className="block mb-2 text-orange-400 text-xl font-bold tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl shadow-md"
              required
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          <div className="mb-8">
            <label className="block mb-2 text-orange-400 text-xl font-bold tracking-wide">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl shadow-md"
              required
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          <div className="mb-10">
            <label className="block mb-2 text-orange-400 text-xl font-bold tracking-wide">Confirmar contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl shadow-md"
              required
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition text-2xl tracking-wider shadow-lg border-2 border-orange-400"
            style={{ fontFamily: 'Times New Roman, Times, serif', letterSpacing: '2px' }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};


export default RegisterForm;
