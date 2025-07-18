import React from 'react';
import { FaStar } from 'react-icons/fa';
import './GanadorasSemana.css';
import './ComentariosSection.css';

const comentarios = [
  {
    nombre: 'Sofía G.',
    texto: '¡Excelente atención y la mejor birra artesanal! Volveremos seguro.',
  },
  {
    nombre: 'Valentina P.',
    texto: 'El ambiente es único y la pizza, increíble. ¡Recomendadísimo!',
  },
  {
    nombre: 'Camila R.',
    texto: 'Las hamburguesas son un 10 y la música, genial. ¡Gracias BarChafy!',
  },
];

export default function ComentariosSection() {
  return (
    <div className="ganadoras-comentarios-col">
      <h2 className="ganadoras-section-title">Ganadoras de la semana!!!</h2>
      {comentarios.map((c, i) => (
        <div className="comentario" key={i}>
          <div className="estrellas">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} color="#FFD700" size={18} />
            ))}
          </div>
          <p className="comentario-texto">{c.texto}</p>
          <span className="comentario-nombre">- {c.nombre}</span>
        </div>
      ))}
    </div>
  );
}
