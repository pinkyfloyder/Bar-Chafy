import React, { useContext } from 'react';
import menuData from './MenuData';
import { CartContext } from './CartContext';
import './CartasSection.css';

const Menu = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menu-list">
      <h2>Menú</h2>
      <div className="menu-items">
        {menuData.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} style={{ width: '120px', height: '80px' }} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price.toFixed(2)} €</span>
            <button onClick={() => addToCart(item)}>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
