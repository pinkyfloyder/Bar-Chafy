
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <div className="nosotros-banner">
        <img src="/build/bannerquienessomos.jpg" alt="Banner Bar Chafi" className="nosotros-banner-img" />
        <h1 className="nosotros-title">¿QUIÉNES SOMOS?</h1>
      </div>
      <div className="nosotros-content">
        <div className="nosotros-text">
          <p>Bar Chafi es un proyecto gastronómico que nació en 2022 con la idea de ofrecer una experiencia lúdica y única a quienes nos visitan.</p>
          <p>A través de la colección de cartas de nuestro menú, invitamos a nuestros clientes a acumularlas y, de esta manera, ganar increíbles descuentos o productos exclusivos de Chafi.</p>
        </div>
        <div className="nosotros-img-btns">
          <img src="/build/quienesomos2.jpg" alt="Bar Chafi" className="nosotros-img" />
          <div className="nosotros-btns">
            <button className="nosotros-btn">VER MENÚ</button>
            <button className="nosotros-btn">VER CARTAS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
