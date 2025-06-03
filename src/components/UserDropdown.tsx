import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '20px' }}>
      <span
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', fontSize: '1rem' }}
      >
        {user?.nickname}
      </span>
      {open && (
        <div style={{ position: 'absolute', right: 0, backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '6px', marginTop: '5px', width: '120px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <Link to="/favoritos" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#000' }}>
            Meus Favoritos
          </Link>
          <button
            onClick={handleLogout}
            style={{ width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;