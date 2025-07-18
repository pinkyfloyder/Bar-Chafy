import React, { useState, useEffect } from 'react';
import './RegisterModalOverride.css';
import { createPortal } from 'react-dom';
import axios from 'axios';

const ShowProfile = ({ onClose, onProfileUpdate }) => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    created_at: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    // Cargar datos del usuario desde localStorage o API
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setForm({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        created_at: user.created_at || '',
      });
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setValidationErrors({});
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/user', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Perfil actualizado correctamente.');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (onProfileUpdate) onProfileUpdate(response.data.user);
    } catch (err) {
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError('Error al actualizar el perfil.');
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setValidationErrors({});
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/user/password', {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Contraseña cambiada correctamente.');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError('Error al cambiar la contraseña.');
      }
    }
  };

  if (!showModal || typeof window === 'undefined' || !document.getElementById('modal-root')) return null;
  return createPortal(
    <div className="register-modal-overlay" style={{ zIndex: 1000 }} onClick={onClose}>
      <div className="register-modal-content" style={{ maxWidth: 600, minWidth: 400, minHeight: 500 }} onClick={e => e.stopPropagation()}>
        <h2 className="text-4xl font-bold mb-8 text-orange-500 text-center tracking-widest drop-shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif', letterSpacing: '3px' }}>Mi Perfil</h2>
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
        <form onSubmit={handleProfileSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Nombre</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Apellidos</label>
            <input type="text" name="surname" value={form.surname} onChange={handleChange} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Teléfono</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Dirección</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-orange-400 font-bold">Fecha de registro</label>
            <input type="text" value={form.created_at} disabled className="w-full border-2 border-gray-400 bg-gray-200 text-gray-700 rounded-xl px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-2xl font-bold hover:bg-orange-600 transition text-xl tracking-wider shadow-lg border-2 border-orange-400 mt-4">Guardar cambios</button>
        </form>
        <form onSubmit={handlePasswordSubmit}>
          <h3 className="text-xl font-bold mb-2 text-orange-400">Cambiar contraseña</h3>
          <div className="mb-3">
            <label className="block mb-1 text-orange-400 font-bold">Contraseña actual</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-orange-400 font-bold">Nueva contraseña</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border-2 border-orange-500 bg-[#232323] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-2xl font-bold hover:bg-orange-600 transition text-lg tracking-wider shadow-lg border-2 border-orange-400">Cambiar contraseña</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ShowProfile;
