
import VinoMenuImg from '../assets/vinomenu.jpg';
import React, { useState } from 'react';
import CanjeModal from './CanjeModal';
import { useCart } from '../context/CartContext';
import { useAlbum } from '../context/AlbumContext';
import JugoMenuImg from '../assets/jugomenu.jpg';
import CocaColaMenuImg from '../assets/cocacolamenu.jpg';
import PapasFritasMenuImg from '../assets/papasfritasmenu.jpg';
import ArosCebollaMenuImg from '../assets/aroscebollamenu.jpg';
import NuggetsMenuImg from '../assets/nuggetsmenu.jpg';
import EnsaladaMenuImg from '../assets/ensaladamenu.jpg';
import SalchichaMenuImg from '../assets/salchichamenu.jpg';
import HamburguesaMenuImg from '../assets/Hamburguesamenu.jpg';
import PizzaMenuImg from '../assets/pizzamenu.jpg';

const categoriaImg = {
  'Hamburguesas': HamburguesaMenuImg,
  'Pizzas': PizzaMenuImg,
  'Salchichas': SalchichaMenuImg,
  'Ensaladas': EnsaladaMenuImg,
  'Entrantes': NuggetsMenuImg,
  'Bebidas': VinoMenuImg,
};

const MiAlbum = () => {
  const { album, hasReward, resetCategoria } = useAlbum();
  const { addToCart } = useCart();
  const [canjeCat, setCanjeCat] = useState(null);
  const [celebrando, setCelebrando] = useState({});

  const handleCanjear = (cat) => {
    setCanjeCat(cat);
  };

  // Al seleccionar producto gratis
  const handleCanjeProducto = (producto) => {
    // Añadir al carrito con precio 0 y marca de premio
    addToCart({ ...producto, price: 0, premio: true });
    // Resetear solo la categoría canjeada usando el contexto
    resetCategoria(canjeCat);
    setCanjeCat(null);
    setCelebrando(prev => ({ ...prev, [canjeCat]: true }));
    setTimeout(() => setCelebrando(prev => ({ ...prev, [canjeCat]: false })), 1800);
  };
  const categorias = Object.keys(album);

  if (categorias.length === 0) {
    return <div style={{color:'#fff', padding:'2rem'}}>Aún no tienes cartas en tu álbum. ¡Compra productos para coleccionar!</div>;
  }

  return (
    <div style={{padding:'2.5em 0', minHeight:'80vh', background:'#181818'}}>
      <h2 style={{color:'#ff9800', fontSize:'2.2rem', fontWeight:800, marginBottom:8, textAlign:'center', letterSpacing:1}}>Mi Álbum Coleccionable</h2>
      <p style={{color:'#fff', textAlign:'center', marginBottom:32, fontSize:'1.1rem'}}>¡Colecciona productos de cada categoría y desbloquea recompensas!</p>
      <div style={{display:'flex', flexWrap:'wrap', gap:32, justifyContent:'center'}}>
        {categorias.map(cat => (
          <div key={cat} style={{
            background: hasReward(cat) ? 'linear-gradient(135deg,#ff9800 60%,#fff7e0 100%)' : '#232323',
            color: hasReward(cat) ? '#232323' : '#fff',
            borderRadius:18,
            minWidth:260,
            minHeight:340,
            padding:'1.5rem 1.2rem',
            boxShadow: hasReward(cat) ? '0 4px 24px #ff980055' : '0 2px 8px #0002',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'flex-start',
            fontWeight:700,
            fontSize:'1.1rem',
            border: hasReward(cat) ? '3px solid #fff' : '2px solid #ff9800',
            position:'relative',
            transition:'all 0.3s',
            overflow:'hidden',
            animation: celebrando[cat] ? 'celebracion 1.2s' : hasReward(cat) ? 'album-pop 0.7s' : 'none',
          }}>
            <span style={{fontSize:'1.3rem', marginBottom:8, fontWeight:800, letterSpacing:1}}>{cat}</span>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:14,marginTop:6}}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width:90,
                  height:70,
                  borderRadius:10,
                  background: album[cat]>i ? '#fff' : '#232323',
                  boxShadow: album[cat]>i ? '0 2px 8px #ff980055' : '0 1px 4px #0002',
                  border: album[cat]>i ? '2px solid #ff9800' : '2px solid #444',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  overflow:'hidden',
                  position:'relative',
                  transition:'all 0.2s',
                  filter: album[cat]>i ? 'none' : 'grayscale(0.8) brightness(0.7)',
                }}>
                  <img src={categoriaImg[cat] || VinoMenuImg} alt={cat} style={{width:'100%',height:'100%',objectFit:'cover',opacity:album[cat]>i?1:0.5,transition:'opacity 0.2s'}} />
                  {album[cat]>i && <span style={{position:'absolute',top:4,right:8,fontSize:18,color:'#ff9800'}}>★</span>}
                </div>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <span style={{fontSize:'2.2rem'}}>{album[cat]} <span style={{fontSize:'1.1rem',color:'#aaa'}}>/ 4</span></span>
              {hasReward(cat) && <span style={{fontSize:28,marginLeft:4}}>🎁</span>}
            </div>
            {hasReward(cat) && (
              <>
                <div style={{color:'#ff9800',fontWeight:900,fontSize:'1.1rem',marginTop:8,marginBottom:8}}>¡Recompensa lista!</div>
                <button
                  onClick={() => handleCanjear(cat)}
                  style={{
                    background:'#ff9800',
                    color:'#232323',
                    fontWeight:900,
                    border:'none',
                    borderRadius:8,
                    padding:'12px 24px',
                    fontSize:'1.1rem',
                    cursor:'pointer',
                    boxShadow:'0 2px 8px #ff980055',
                    marginBottom:6,
                    transition:'all 0.18s',
                    outline:'none',
                    animation: celebrando[cat] ? 'boton-pop 1.2s' : 'none',
                  }}
                  disabled={celebrando[cat]}
                >
                  {celebrando[cat] ? '¡Premio canjeado!' : 'Canjear recompensa 🎉'}
                </button>
                {celebrando[cat] && (
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                    <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:2}}>
                      {/* Confeti simple */}
                      {[...Array(18)].map((_,i)=>(
                        <span key={i} style={{
                          position:'absolute',
                          left:`${Math.random()*90+5}%`,
                          top:`${Math.random()*80+5}%`,
                          fontSize:Math.random()*18+16,
                          color:['#ff9800','#fff','#E1306C','#25D366'][i%4],
                          opacity:0.85,
                          animation:'confeti-fall 1.1s linear',
                        }}>★</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Modal de canje */}
                <CanjeModal open={canjeCat===cat} categoria={cat} onClose={()=>setCanjeCat(null)} onCanjear={handleCanjeProducto} />
              </>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes album-pop {
          0% { transform: scale(0.92); box-shadow: 0 0 0 #ff980000; }
          60% { transform: scale(1.06); box-shadow: 0 0 24px #ff9800aa; }
          100% { transform: scale(1); box-shadow: 0 4px 24px #ff980055; }
        }
        @keyframes celebracion {
          0% { transform: scale(1) rotate(0deg); }
          20% { transform: scale(1.08) rotate(-2deg); }
          40% { transform: scale(0.98) rotate(2deg); }
          60% { transform: scale(1.10) rotate(-3deg); }
          80% { transform: scale(1.02) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes boton-pop {
          0% { transform: scale(1); }
          30% { transform: scale(1.12); }
          60% { transform: scale(0.96); }
          100% { transform: scale(1); }
        }
        @keyframes confeti-fall {
          0% { opacity:1; transform: translateY(-20px) rotate(0deg); }
          100% { opacity:0; transform: translateY(60px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MiAlbum;
