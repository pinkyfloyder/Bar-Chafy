import React, { useState } from 'react';
import { FaCalendarAlt, FaMusic, FaPizzaSlice, FaGlassCheers, FaUsers } from 'react-icons/fa';

// Array editable de eventos
const eventos = [
  {
    id: 1,
    titulo: 'Noche de Música en Vivo',
    fecha: '2025-07-25',
    descripcion: 'Bandas locales en vivo, promos en tragos y mucha diversión.',
    icon: <FaMusic color="#ff9800" size={22} />,
    color: '#ff9800',
  },
  {
    id: 2,
    titulo: 'Día de la Pizza',
    fecha: '2025-07-28',
    descripcion: '¡Todas las pizzas al 2x1 durante todo el día!',
    icon: <FaPizzaSlice color="#E1306C" size={22} />,
    color: '#E1306C',
  },
  {
    id: 3,
    titulo: 'Fiesta de la Cerveza',
    fecha: '2025-08-02',
    descripcion: 'Cerveza artesanal, música y sorteos especiales.',
    icon: <FaGlassCheers color="#25D366" size={22} />,
    color: '#25D366',
  },
  {
    id: 4,
    titulo: 'Encuentro de Socios',
    fecha: '2025-08-10',
    descripcion: 'Reunión exclusiva para socios con menú especial.',
    icon: <FaUsers color="#fff" size={22} />,
    color: '#fff',
  },
];

function getDiasMes(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const Eventos = () => {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());
  const diasMes = getDiasMes(anio, mes);
  const primerDia = new Date(anio, mes, 1).getDay();
  const eventosMes = eventos.filter(e => new Date(e.fecha).getMonth() === mes && new Date(e.fecha).getFullYear() === anio);

  // Días con evento
  const diasEvento = eventosMes.map(e => new Date(e.fecha).getDate());

  // Eventos del día seleccionado
  const [diaSel, setDiaSel] = useState(null);
  const eventosDia = diaSel ? eventosMes.filter(e => new Date(e.fecha).getDate() === diaSel) : [];

  // Nombres de meses
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  return (
    <div style={{padding:'2.5em 0', minHeight:'80vh', background:'#181818'}}>
      <h2 style={{color:'#ff9800', fontSize:'2.2rem', fontWeight:800, marginBottom:8, textAlign:'center', letterSpacing:1}}>Eventos</h2>
      <p style={{color:'#fff', textAlign:'center', marginBottom:32, fontSize:'1.1rem'}}>¡No te pierdas nuestros próximos eventos! Música, comida, fiestas y mucho más en Bar Chafy.</p>
      <div style={{display:'flex', flexWrap:'wrap', gap:48, justifyContent:'center'}}>
        {/* Calendario */}
        <div style={{background:'#232323', borderRadius:16, padding:'2em', minWidth:320, boxShadow:'0 2px 12px #0003'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18}}>
            <button onClick={()=>setMes(m=>m===0?11:m-1)} style={{background:'none',border:'none',color:'#ff9800',fontSize:22,cursor:'pointer'}}>&lt;</button>
            <span style={{color:'#ff9800',fontWeight:700,fontSize:'1.2rem'}}>{meses[mes]} {anio}</span>
            <button onClick={()=>setMes(m=>m===11?0:m+1)} style={{background:'none',border:'none',color:'#ff9800',fontSize:22,cursor:'pointer'}}>&gt;</button>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse',color:'#fff',fontWeight:600}}>
            <thead>
              <tr style={{color:'#ff9800'}}>
                <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({length: Math.ceil((diasMes+primerDia)/7)}).map((_,sem)=>
                <tr key={sem}>
                  {Array.from({length:7}).map((_,d)=>{
                    const dia = sem*7+d-primerDia+1;
                    const esEvento = diasEvento.includes(dia);
                    return (
                      <td key={d} style={{padding:6,textAlign:'center',cursor:dia>0&&dia<=diasMes?'pointer':'default',background:esEvento?'#ff9800':'none',color:esEvento?'#232323':'#fff',borderRadius:esEvento?8:0}} onClick={()=>dia>0&&dia<=diasMes?setDiaSel(dia):null}>
                        {dia>0&&dia<=diasMes?dia:''}
                      </td>
                    )
                  })}
                </tr>
              )}
            </tbody>
          </table>
          {diaSel && eventosDia.length>0 && (
            <div style={{marginTop:18,background:'#181818',borderRadius:8,padding:16}}>
              <b style={{color:'#ff9800'}}>Eventos del {diaSel} de {meses[mes]}</b>
              <ul style={{margin:'8px 0 0 0',padding:0}}>
                {eventosDia.map(ev=>(
                  <li key={ev.id} style={{marginBottom:8,display:'flex',alignItems:'center',gap:8}}>
                    {ev.icon}
                    <span style={{fontWeight:700}}>{ev.titulo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Listado de eventos */}
        <div style={{flex:1,minWidth:320}}>
          <h3 style={{color:'#ff9800',marginBottom:18,fontWeight:700,fontSize:'1.3rem'}}>Próximos eventos</h3>
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            {eventos.filter(e=>new Date(e.fecha)>=new Date()).map(ev=>(
              <div key={ev.id} style={{background:'#232323',borderRadius:14,padding:'1.2em',boxShadow:'0 2px 8px #0002',display:'flex',alignItems:'center',gap:18}}>
                <div>{ev.icon}</div>
                <div>
                  <div style={{fontWeight:700,color:'#ff9800',fontSize:'1.1rem'}}>{ev.titulo}</div>
                  <div style={{color:'#fff',fontSize:'1rem'}}>{ev.descripcion}</div>
                  <div style={{color:'#aaa',fontSize:13,marginTop:4}}>{new Date(ev.fecha).toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'})}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
