import React from 'react';
import './CartasSection.css';
import cervezaImg from '../assets/cerveza.jpg';
import hamburguesaImg from '../assets/hamburguesa.jpg';
import pizzaImg from '../assets/pizza.jpg';

const CartasSection = () => (
  <section className="cartas-section">
    <h2>JUNTÁ CARTAS Y GANÁ</h2>
    <div className="cartas-panel">
      <div className="carta carta-img-bg carta-panel">
        <img src={cervezaImg} alt="Birra" className="carta-img-bg-img" />
        <div className="carta-content">
          <p className="carta-frase">¡Sumá cartas de birra y ganá premios!</p>
          <h3>BIRRA</h3>
        </div>
      </div>
      <div className="carta carta-img-bg carta-panel">
        <img src={hamburguesaImg} alt="Hamburguesa" className="carta-img-bg-img" />
        <div className="carta-content">
          <p className="carta-frase">¡Sumá cartas de hamburguesa y participá por combos!</p>
          <h3 className="carta-titulo">HAMBURGUESA</h3>
        </div>
      </div>
      <div className="carta carta-img-bg carta-panel">
        <img src={pizzaImg} alt="Pizza" className="carta-img-bg-img" />
        <div className="carta-content">
          <p className="carta-frase">¡Sumá cartas de pizza y ganá porciones gratis!</p>
          <h3>PIZZA</h3>
        </div>
      </div>
    </div>
    <button className="cartas-btn">Ver cartas</button>
  </section>
);

export default CartasSection;
