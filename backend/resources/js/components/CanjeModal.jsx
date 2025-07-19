import React, { useState } from 'react';
import { menuData } from './MenuData';

const CanjeModal = ({ open, categoria, onClose, onCanjear }) => {
  const productos = menuData.filter(p => p.category === categoria);
  const [seleccionado, setSeleccionado] = useState(null);
  if (!open) return null;
  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#000a',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#232323',borderRadius:16,padding:'2em',minWidth:340,boxShadow:'0 2px 16px #0008',color:'#fff',position:'relative'}}>
        <h3 style={{color:'#ff9800',marginBottom:18}}>Elige tu producto gratis de <span style={{fontWeight:900}}>{categoria}</span></h3>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {productos.map(p=>(
            <div key={p.id} onClick={()=>setSeleccionado(p)} style={{display:'flex',alignItems:'center',gap:16,background:seleccionado?.id===p.id?'#ff9800':'#181818',color:seleccionado?.id===p.id?'#232323':'#fff',borderRadius:10,padding:'10px 12px',cursor:'pointer',border:seleccionado?.id===p.id?'2px solid #fff':'2px solid #444',transition:'all 0.18s'}}>
              <img src={p.image} alt={p.name} style={{width:60,height:44,objectFit:'cover',borderRadius:8}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:'1.1rem'}}>{p.name}</div>
                <div style={{fontSize:13,color:seleccionado?.id===p.id?'#232323':'#aaa'}}>Precio: ${p.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12,marginTop:24}}>
          <button onClick={onClose} style={{flex:1,padding:10,borderRadius:8,background:'#888',color:'#fff',border:'none',fontWeight:700,cursor:'pointer'}}>Cancelar</button>
          <button onClick={()=>seleccionado&&onCanjear(seleccionado)} disabled={!seleccionado} style={{flex:1,padding:10,borderRadius:8,background:'#ff9800',color:'#232323',border:'none',fontWeight:900,cursor:seleccionado?'pointer':'not-allowed',opacity:seleccionado?1:0.7}}>Canjear</button>
        </div>
      </div>
    </div>
  );
};

export default CanjeModal;
