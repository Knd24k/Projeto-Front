import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Switch estilizado com ícones de sol e lua.
 */
const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: '50px',
        height: '26px',
        borderRadius: '13px',
        background: isDark ? '#333' : '#ccc',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        boxSizing: 'border-box'
      }}
    >
      {/* Ícone da Lua (quando claro) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill={isDark ? '#777' : '#fff'}
        style={{ position: 'absolute', left: '6px' }}
      >
        <path d="M21 12.79A9 9 0 0 1 11.21 3c0 .418.03.828.085 1.228A7.5 7.5 0 1 0 20 12a7.478 7.478 0 0 0-3.013-.543A9.021 9.021 0 0 1 21 12.79z"/>
      </svg>

      {/* Ícone do Sol (quando escuro) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill={isDark ? '#FFD700' : '#888'}
        style={{ position: 'absolute', right: '6px' }}
      >
        <path d="M12 4.5a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1zm0 12a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V17.5a1 1 0 0 1 1-1zm7.071-7.071a1 1 0 0 1 .707.293l1.06 1.06a1 1 0 0 1-1.414 1.414l-1.06-1.06a1 1 0 0 1 .707-1.707zm-12.142 0a1 1 0 0 1 .707 1.707l-1.06 1.06a1 1 0 0 1-1.414-1.414l1.06-1.06a1 1 0 0 1 .707-.293zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0-4a1 1 0 0 1 1 1V5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V20a1 1 0 0 1 1-1zm9-9a1 1 0 0 1-1 1H19a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1z"/>
      </svg>

      {/* Círculo deslizante */}
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '3px',
          left: isDark ? '26px' : '3px',
          transition: 'left 0.2s'
        }}
      />
    </div>
  );
};

export default DarkModeToggle;