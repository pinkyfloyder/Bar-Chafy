import VinoMenuImg from '../assets/vinomenu.jpg';
import JugoMenuImg from '../assets/jugomenu.jpg';
import CocaColaMenuImg from '../assets/cocacolamenu.jpg';
import PapasFritasMenuImg from '../assets/papasfritasmenu.jpg';
import ArosCebollaMenuImg from '../assets/aroscebollamenu.jpg';
import NuggetsMenuImg from '../assets/nuggetsmenu.jpg';
import EnsaladaMenuImg from '../assets/ensaladamenu.jpg';
import SalchichaMenuImg from '../assets/salchichamenu.jpg';

import React from 'react';
import HamburguesaMenuImg from '../assets/Hamburguesamenu.jpg';
import PizzaMenuImg from '../assets/pizzamenu.jpg';

// Componente MenuData
const menuData = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Jugosa hamburguesa de ternera con lechuga, tomate y queso cheddar.',
    price: 8000,
    image: HamburguesaMenuImg,
    category: 'Hamburguesas'
  },
  {
    id: 2,
    name: 'Pizza Barbacoa',
    description: 'Pizza con salsa barbacoa, pollo, bacon y cebolla.',
    price: 10000,
    image: PizzaMenuImg,
    category: 'Pizzas'
  },
  {
    id: 3,
    name: 'Salchicha Gigante',
    description: 'Salchicha alemana gigante con pan y mostaza.',
    price: 12000,
    image: SalchichaMenuImg,
    category: 'Salchichas'
  },
  {
    id: 4,
    name: 'Ensalada César',
    description: 'Ensalada fresca con pollo, parmesano y salsa César.',
    price: 8000,
    image: EnsaladaMenuImg,
    category: 'Ensaladas'
  },
  {
    id: 5,
    name: 'Nuggets de Pollo',
    description: 'Crujientes nuggets de pollo con salsa barbacoa.',
    price: 12000,
    image: NuggetsMenuImg,
    category: 'Entrantes'
  },
  {
    id: 6,
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla rebozados y fritos.',
    price: 13000,
    image: ArosCebollaMenuImg,
    category: 'Entrantes'
  },
  {
    id: 7,
    name: 'Papas Fritas con Queso',
    description: 'Patatas fritas cubiertas de queso fundido.',
    price: 6000,
    image: PapasFritasMenuImg,
    category: 'Entrantes'
  },
  {
    id: 8,
    name: 'Coca-Cola',
    description: 'Bebida gaseosa refrescante, botella 500ml.',
    price: 5000,
    image: CocaColaMenuImg,
    category: 'Bebidas'
  },
  {
    id: 9,
    name: 'Vino',
    description: 'Copa de vino tinto o blanco, 180ml.',
    price: 15000,
    image: VinoMenuImg,
    category: 'Bebidas'
  },
  {
    id: 10,
    name: 'Jugos Tropicales',
    description: 'Jugo natural de frutas tropicales, vaso 400ml.',
    price: 8000,
    image: JugoMenuImg,
    category: 'Bebidas'
  }
];

const MenuData = () => {
  return (
    <div className="menu-page" style={{padding:'2rem', color:'#fff'}}>
      <h1 style={{fontSize:'2rem', fontWeight:'bold', marginBottom:'1rem'}}>Menú</h1>
      <ul style={{listStyle:'none', padding:0}}>
        {menuData.map(item => (
          <li key={item.id} style={{
            marginBottom:'1.5rem',
            background:'#232323',
            borderRadius:'8px',
            padding:'1rem',
            boxShadow:'0 1px 4px rgba(0,0,0,0.10)',
            display:'flex',
            alignItems:'center',
            gap:'1.5rem'}}>
            <img src={item.image} alt={item.name} style={{width:'240px',height:'auto',borderRadius:'8px',flexShrink:0}} />
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', flex:1}}>
              <h2 style={{fontSize:'2rem', fontWeight:'bold', color:'#ff9800', marginBottom:'1rem'}}>{item.name}</h2>
              <p style={{margin:'0 0 0.5rem 0'}}>{item.description}</p>
              <span style={{fontWeight:'bold'}}>Precio: ${item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuData;
