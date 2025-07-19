import VinoMenuImg from '../assets/vinomenu.jpg';
import JugoMenuImg from '../assets/jugomenu.jpg';
import CocaColaMenuImg from '../assets/cocacolamenu.jpg';
import PapasFritasMenuImg from '../assets/papasfritasmenu.jpg';
import ArosCebollaMenuImg from '../assets/aroscebollamenu.jpg';
import NuggetsMenuImg from '../assets/nuggetsmenu.jpg';
import EnsaladaMenuImg from '../assets/ensaladamenu.jpg';
import SalchichaMenuImg from '../assets/salchichamenu.jpg';

import React, { useState } from 'react';
import { useAlbum } from '../context/AlbumContext';
import { useCart } from '../context/CartContext';
import HamburguesaMenuImg from '../assets/Hamburguesamenu.jpg';
import PizzaMenuImg from '../assets/pizzamenu.jpg';

// Componente MenuData
export const menuData = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Jugosa hamburguesa de ternera con lechuga, tomate y queso cheddar.',
    price: 8.5,
    image: '/build/hamburguesa.jpg',
    category: 'Hamburguesas'
  },
  {
    id: 2,
    name: 'Pizza Barbacoa',
    description: 'Pizza con salsa barbacoa, pollo, bacon y cebolla.',
    price: 10.0,
    image: '/build/pizza.jpg',
    category: 'Pizzas'
  },
  {
    id: 3,
    name: 'Salchicha Gigante',
    description: 'Salchicha alemana gigante con pan y mostaza.',
    price: 7.0,
    image: '/salchicha.jpg',
    category: 'Salchichas'
  },
  {
    id: 4,
    name: 'Ensalada César',
    description: 'Ensalada fresca con pollo, parmesano y salsa César.',
    price: 6.5,
    image: '/ensalada.jpg',
    category: 'Ensaladas'
  },
  {
    id: 5,
    name: 'Nuggets de Pollo',
    description: 'Crujientes nuggets de pollo con salsa barbacoa.',
    price: 5.0,
    image: '/nuggets.jpg',
    category: 'Entrantes'
  },
  {
    id: 6,
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla rebozados y fritos.',
    price: 4.5,
    image: '/aroscebolla.jpg',
    category: 'Entrantes'
  },
  {
    id: 7,
    name: 'Patatas Fritas con Queso',
    description: 'Patatas fritas cubiertas de queso fundido.',
    price: 4.0,
    image: '/patatasqueso.jpg',
    category: 'Entrantes'
  }
];

const MenuData = () => {
  const { addToCart } = useCart();
  const { addCard } = useAlbum();
  const [toast, setToast] = useState(null);
  const [pressedId, setPressedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(menuData.map(item => item.category)))];

  const handleAdd = (item) => {
    addToCart(item);
    addCard(item.category); // Añade carta al álbum por categoría
    setToast(`¡${item.name} añadido al carrito!`);
    setPressedId(item.id);
    setTimeout(() => setToast(null), 1800);
    setTimeout(() => setPressedId(null), 350);
  };

  // Filtrar productos por categoría
  const filteredMenu = selectedCategory === 'Todas'
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-page" style={{padding:'2rem', color:'#fff', position:'relative', paddingTop:'88px'}}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? '#ff9800' : '#232323',
              color: selectedCategory === cat ? '#232323' : '#ff9800',
              border: selectedCategory === cat ? '2px solid #ff9800' : '2px solid #ff9800',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1rem',
              padding: '10px 22px',
              cursor: 'pointer',
              transition: 'all 0.18s',
              boxShadow: selectedCategory === cat ? '0 2px 8px #ff980055' : 'none',
              outline: 'none',
              marginBottom: 8,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <h1 style={{fontSize:'2rem', fontWeight:'bold', marginBottom:'1rem'}}>Menú</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}>
        {filteredMenu.map(item => (
          <div key={item.id} style={{
            background:'#232323',
            borderRadius:'16px',
            boxShadow:'0 2px 12px rgba(0,0,0,0.12)',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            padding:'1.5rem 1rem',
            transition:'transform 0.15s',
            minHeight:'420px',
            position:'relative',
          }}>
            <img 
              src={item.image} 
              alt={item.name} 
              style={{
                width: '180px',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 6px rgba(0,0,0,0.10)'
              }} 
            />
            <h2 style={{fontSize:'1.4rem', fontWeight:'bold', color:'#ff9800', marginBottom:'0.7rem', textAlign:'center'}}>{item.name}</h2>
            <p style={{margin:'0 0 0.7rem 0', textAlign:'center', color:'#fff', fontSize:'1rem'}}>{item.description}</p>
            <span style={{fontWeight:'bold', color:'#fff', fontSize:'1.1rem', marginBottom:'1.2rem'}}>Precio: ${item.price}</span>
            <button
              onClick={() => handleAdd(item)}
              style={{
                marginTop: 'auto',
                background: pressedId === item.id ? '#ffa733' : '#ff9800',
                color: '#232323',
                fontWeight: 700,
                border: pressedId === item.id ? '2px solid #fff' : 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: pressedId === item.id ? '0 0 0 3px #ff9800aa' : '0 1px 4px rgba(0,0,0,0.10)',
                transition: 'all 0.18s',
                outline: pressedId === item.id ? 'none' : undefined,
                transform: pressedId === item.id ? 'scale(0.96)' : 'none',
              }}
              onMouseDown={() => setPressedId(item.id)}
              onMouseUp={() => setPressedId(null)}
              onMouseLeave={() => setPressedId(null)}
              onTouchStart={() => setPressedId(item.id)}
              onTouchEnd={() => setPressedId(null)}
              onFocus={() => setPressedId(item.id)}
              onBlur={() => setPressedId(null)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#232323',
          color: '#ff9800',
          padding: '18px 32px',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          zIndex: 9999,
          opacity: 0.97,
          pointerEvents: 'none',
          letterSpacing: '1px',
          transition: 'opacity 0.3s',
        }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default MenuData;
