import React, { useState } from 'react';

const PaymentModal = ({ open, onClose, onSuccess }) => {
  const [card, setCard] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación en tiempo real
  React.useEffect(() => {
    if (!card && !name && !expiry && !cvv) {
      setError('');
      return;
    }
    if (card && !/^\d{16}$/.test(card)) return setError('Número de tarjeta inválido');
    if (expiry && !/^\d{2}\/\d{2}$/.test(expiry)) return setError('Fecha inválida (MM/AA)');
    if (cvv && !/^\d{3}$/.test(cvv)) return setError('CVV inválido');
    if (name && !name.trim()) return setError('Nombre requerido');
    setError('');
  }, [card, name, expiry, cvv]);

  if (!open) return null;

  const validate = () => {
    if (!/^\d{16}$/.test(card)) return 'Número de tarjeta inválido';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Fecha inválida (MM/AA)';
    if (!/^\d{3}$/.test(cvv)) return 'CVV inválido';
    if (!name.trim()) return 'Nombre requerido';
    return '';
  };

  const handlePay = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('');
      onSuccess();
    }, 1200);
  };

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#000a',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={handlePay} style={{background:'#232323',padding:32,borderRadius:12,minWidth:320,boxShadow:'0 2px 16px #0008',color:'#fff',display:'flex',flexDirection:'column',gap:16}}>
        <h2 style={{color:'#ff9800',marginBottom:8}}>Pago con Tarjeta</h2>
        <input type="text" placeholder="Número de tarjeta" maxLength={16} value={card} onChange={e=>setCard(e.target.value.replace(/\D/g,''))} style={{padding:8,borderRadius:6,border:'1px solid #888'}} />
        <input type="text" placeholder="Nombre en la tarjeta" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,borderRadius:6,border:'1px solid #888'}} />
        <div style={{display:'flex',gap:8}}>
          <input type="text" placeholder="MM/AA" maxLength={5} value={expiry} onChange={e=>setExpiry(e.target.value.replace(/[^\d\/]/g,''))} style={{flex:1,padding:8,borderRadius:6,border:'1px solid #888'}} />
          <input type="text" placeholder="CVV" maxLength={3} value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,''))} style={{flex:1,padding:8,borderRadius:6,border:'1px solid #888'}} />
        </div>
        {error && <div style={{color:'#ff5252',fontWeight:700}}>{error}</div>}
        <div style={{display:'flex',gap:12,marginTop:8}}>
          <button type="button" onClick={onClose} style={{flex:1,padding:10,borderRadius:6,background:'#888',color:'#fff',border:'none',fontWeight:700,cursor:'pointer'}}>Cancelar</button>
          <button type="submit" disabled={loading} style={{flex:1,padding:10,borderRadius:6,background:'#ff9800',color:'#232323',border:'none',fontWeight:700,cursor:'pointer',opacity:loading?0.7:1}}>{loading?'Procesando...':'Pagar'}</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;
