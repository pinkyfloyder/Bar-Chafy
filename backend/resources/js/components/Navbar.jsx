import React, { useState } from 'react';
import SimpleAuthMenu from './SimpleAuthMenu';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaSignInAlt, FaUserPlus, FaUser, FaImages, FaSignOutAlt } from 'react-icons/fa';
import CartModal from './CartModal';
import './Navbar.css';
// import RegisterForm from './RegisterForm';
// import LoginForm from './LoginForm';
import ShowProfile from './ShowProfile';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // Eliminado: useAuth y estados de modales de login/registro
  const [showCart, setShowCart] = useState(false);

  // Solo mantener el handler de click fuera del dropdown
  React.useEffect(() => {
    function handleClickOutside(e) {
      const dropdown = document.querySelector('.navbar-dropdown');
      const avatar = document.querySelector('.navbar-avatar');
      if (dropdown && avatar && !avatar.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            Bar Chafy
          </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/menu">Menú</Link></li>
          <li><Link to="/album">Mi Álbum</Link></li>
          <li><Link to="/pedidos">Mis pedidos</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button className="navbar-cart" style={{ color: '#fff', position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowCart(true)}>
            <FaShoppingCart size={28} />
          </button>
          <CartModal open={showCart} onClose={() => setShowCart(false)} />
          <SimpleAuthMenu />
        </div>
      </nav>
      {/* Eliminado modal de registro */}
      {/* Eliminado modal de login */}
      {/* Eliminado loginBlockedMsg */}
    </>
  );
}

export default Navbar;
