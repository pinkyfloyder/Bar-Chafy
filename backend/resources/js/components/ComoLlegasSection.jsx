import React from 'react';
import './ComoLlegasSection.css';

const ComoLlegasSection = () => (
  <section className="como-llegas-section">
    <h2>¿Cómo llegás?</h2>
    <div className="map-container">
      <iframe
        title="Ubicación Bar Chafy"
        src="https://www.google.com/maps?q=aristides+villanueva+500,+mendoza&output=embed"
        width="100%"
        height="250"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="direccion-ficticia">
        Aristides Villanueva 500, Ciudad de Mendoza
      </div>
    </div>
  </section>
);

export default ComoLlegasSection;
