import React from 'react';

// Componente MenuData
const menuData = [
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
  return (
    <div className="menu-page" style={{padding:'2rem', color:'#fff'}}>
      <h1 style={{fontSize:'2rem', fontWeight:'bold', marginBottom:'1rem'}}>Menú</h1>
      <ul style={{listStyle:'none', padding:0}}>
        {menuData.map(item => (
          <li key={item.id} style={{marginBottom:'1.5rem', background:'#232323', borderRadius:'8px', padding:'1rem', boxShadow:'0 1px 4px rgba(0,0,0,0.10)'}}>
            <h2 style={{fontSize:'1.2rem', fontWeight:'bold', color:'#ff9800'}}>{item.name}</h2>
            <p style={{margin:'0.5rem 0'}}>{item.description}</p>
            <span style={{fontWeight:'bold'}}>Precio: ${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuData;
