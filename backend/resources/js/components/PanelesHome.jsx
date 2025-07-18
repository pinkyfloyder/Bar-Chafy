import React from 'react';
import CartasSection from './CartasSection';
import ComoLlegasSection from './ComoLlegasSection';
import './PanelesHome.css';

import GanadorasSemana from './GanadorasSemana';
import ComentariosSection from './ComentariosSection';


const PanelesHome = () => (
  <div className="paneles-home">
    <div className="paneles-flex-row">
      <div className="paneles-cartas-col">
        <CartasSection />
      </div>
      <div className="paneles-mapa-col">
        <ComoLlegasSection />
      </div>
    </div>
    <div className="comentarios-ganadoras-row">
      <div className="comentarios-col">
        <h2 className="ganadoras-section-title">Ganadoras de la semana!!!</h2>
        <ComentariosSection />
      </div>
      <div className="ganadoras-col">
        <GanadorasSemana />
      </div>
    </div>
  </div>
);

export default PanelesHome;
