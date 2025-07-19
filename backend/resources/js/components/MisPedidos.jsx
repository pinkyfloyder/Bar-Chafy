import React, { useState } from 'react';
import { useOrders } from '../context/OrdersContext';

const MisPedidos = () => {
  const { orders } = useOrders();
  const [selected, setSelected] = useState(null);

  if (orders.length === 0) {
    return <div style={{color:'#fff',padding:'2rem'}}>Aún no has realizado ningún pedido.</div>;
  }

  return (
    <div style={{padding:'2rem',color:'#fff'}}>
      <h2 style={{color:'#ff9800',marginBottom:24}}>Mis Pedidos</h2>
      <ul style={{listStyle:'none',padding:0}}>
        {orders.map(order => (
          <li key={order.id} style={{background:'#232323',borderRadius:12,marginBottom:18,padding:'1.2rem',boxShadow:'0 2px 8px #0002'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <b>Fecha:</b> {new Date(order.date).toLocaleString()}<br/>
                <b>Total:</b> ${order.total.toFixed(2)}
              </div>
              <button onClick={()=>setSelected(selected===order.id?null:order.id)} style={{background:'#ff9800',color:'#232323',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,cursor:'pointer'}}>Ver recibo</button>
            </div>
            {selected===order.id && (
              <div style={{marginTop:16,background:'#181818',borderRadius:8,padding:16}}>
                <b>Productos:</b>
                <ul style={{margin:'8px 0 0 0',padding:0}}>
                  {order.items.map((item,i)=>(
                    <li key={i} style={{marginBottom:4}}>
                      {item.qty} x {item.name} <span style={{color:'#ff9800'}}>${(item.price*item.qty).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div style={{marginTop:12}}><b>Total pagado:</b> ${order.total.toFixed(2)}</div>
                <div style={{marginTop:4,fontSize:13,color:'#aaa'}}>ID pedido: {order.id}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisPedidos;
