import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    let username = null;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      username = user && user.name ? user.name : null;
    } catch {
      username = null;
    }
    return { token, username, isLogged: !!token };
  });

  useEffect(() => {
    function syncAuth(event) {
      if (event.key === 'token' || event.key === 'user') {
        const token = localStorage.getItem('token');
        let username = null;
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          username = user && user.name ? user.name : null;
        } catch {
          username = null;
        }
        setAuth({ token, username, isLogged: !!token });
      }
    }
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const login = (token, username) => {
    localStorage.setItem('token', token);
    // username se guarda dentro de user
    setAuth({ token, username, isLogged: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, username: null, isLogged: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
