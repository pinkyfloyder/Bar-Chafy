import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import './Navbar.css';
import PaymentModal from './PaymentModal';
import { useOrders } from '../context/OrdersContext';

const CartModal = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [showPayment, setShowPayment] = useState(false);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.qty * (item.price || 0), 0);
  const handleSuccess = () => {
    // Guardar pedido en historial
    addOrder({
      date: new Date().toISOString(),
      items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
      total: cart.reduce((sum, item) => sum + item.qty * (item.price || 0), 0)
    });
    clearCart();
    setShowPayment(false);
    onClose();
    // Aquí podrías mostrar un toast o recibo si lo deseas
  };
  // Eliminada declaración duplicada
  const handlePedidoGratis = () => {
    addOrder({
      date: new Date().toISOString(),
      items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
      total: 0
    });
    clearCart();
    setPedidoRealizado(true);
    setTimeout(() => {
      setPedidoRealizado(false);
      onClose();
    }, 1800);
  };
  return (
    <div className="register-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={onClose}>
      <div className="register-modal-content" style={{ maxWidth: 420, margin: '10vh auto', background: '#232323', borderRadius: 16, padding: 32, position: 'relative' }} onClick={e => e.stopPropagation()}>
        <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">Carrito</h2>
        {cart.length === 0 ? (
          <div style={{ color: '#fff', textAlign: 'center', margin: '32px 0' }}>El carrito está vacío.</div>
        ) : pedidoRealizado ? (
          <div style={{ color: '#ff9800', textAlign: 'center', margin: '32px 0', fontWeight: 700, fontSize: '1.2rem' }}>¡Pedido realizado!</div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cart.map(item => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16, background: '#181818', borderRadius: 8, padding: 12 }}>
                  <span style={{ flex: 1, color: '#fff', fontWeight: 600 }}>{item.name}</span>
                  <input type="number" min={1} value={item.qty} onChange={e => updateQty(item.id, Number(e.target.value))} style={{ width: 48, margin: '0 12px', borderRadius: 6, border: '1px solid #ff9800', background: '#232323', color: '#fff', textAlign: 'center' }} />
                  <span style={{ color: '#ff9800', fontWeight: 700, marginRight: 12 }}>${((item.price || 0) * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ff9800', cursor: 'pointer' }}><FaTrash /></button>
                </li>
              ))}
            </ul>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', textAlign: 'right', margin: '16px 0' }}>
              Total: <span style={{ color: '#ff9800' }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
              <button onClick={clearCart} style={{ background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '1rem', cursor: 'pointer' }}>Vaciar</button>
              {total === 0 ? (
                <button onClick={handlePedidoGratis} style={{ background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '1rem', cursor: 'pointer' }}>Pedir</button>
              ) : (
                <button onClick={() => setShowPayment(true)} style={{ background: '#ff9800', color: '#232323', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '1rem', cursor: 'pointer' }}>Pedir</button>
              )}
            </div>
            <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} onSuccess={handleSuccess} />
          </>
        )}
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', color: '#ff9800', fontWeight: 700, fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      </div>
    </div>
  );
};

export default CartModal;
