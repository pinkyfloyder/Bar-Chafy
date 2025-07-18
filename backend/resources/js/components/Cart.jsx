import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} - {(item.price * item.quantity).toFixed(2)} €
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: {total.toFixed(2)} €</p>
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
