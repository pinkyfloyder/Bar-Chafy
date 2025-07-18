import React from 'react';

const Contacto = () => {
  return (
    <div style={{padding:'2em',textAlign:'center'}}>
      <h2>Contacto</h2>
      <p>Puedes contactarnos por WhatsApp, Instagram o visitarnos en el local.</p>
      <ul style={{listStyle:'none',padding:0}}>
        <li><strong>WhatsApp:</strong> <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer">+54 9 11 2345-6789</a></li>
        <li><strong>Instagram:</strong> <a href="https://instagram.com/barchafy" target="_blank" rel="noopener noreferrer">@barchafy</a></li>
        <li><strong>Dirección:</strong> Manuel Belgrano 1234, CABA</li>
      </ul>
    </div>
  );
};

export default Contacto;
