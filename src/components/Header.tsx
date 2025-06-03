import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';
import UserDropdown from './UserDropdown';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <h1>Joker Games</h1>
      <nav>
        <DarkModeToggle />
        {user ? (
          <UserDropdown />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;