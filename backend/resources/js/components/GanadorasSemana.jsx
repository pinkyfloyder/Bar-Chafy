
import React from 'react';
import './GanadorasSemana.css';
import ganadorasImg from '../assets/ganadoras.jpg';

export default function GanadorasSemana() {
  return (
    <div className="ganadoras-lateral-col">
      <div className="ganadoras-img-container">
        <img src={ganadorasImg} alt="Ganadoras de la semana" className="ganadoras-img" />
      </div>
    </div>
  );
}
