import React, { createContext, useContext, useState, useEffect } from 'react';

const AlbumContext = createContext();

export const useAlbum = () => useContext(AlbumContext);

// Estructura: { categoria: cantidad }
const getInitialAlbum = () => {
  const stored = localStorage.getItem('album');
  return stored ? JSON.parse(stored) : {};
};

export const AlbumProvider = ({ children }) => {
  const [album, setAlbum] = useState(getInitialAlbum());

  useEffect(() => {
    localStorage.setItem('album', JSON.stringify(album));
  }, [album]);

  // Añadir una carta (compra) a una categoría
  const addCard = (category) => {
    setAlbum(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
  };

  // Resetear álbum (opcional)
  const resetAlbum = () => setAlbum({});

  // Resetear solo una categoría
  const resetCategoria = (cat) => {
    setAlbum(prev => ({ ...prev, [cat]: 0 }));
  };

  // Saber si hay recompensa
  const hasReward = (category) => (album[category] || 0) >= 4;

  return (
    <AlbumContext.Provider value={{ album, addCard, resetAlbum, resetCategoria, hasReward }}>
      {children}
    </AlbumContext.Provider>
  );
};
