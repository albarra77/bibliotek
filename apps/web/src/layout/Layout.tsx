import { NavLink, Outlet } from 'react-router-dom';

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  marginBottom: '1.5rem',
};

const linkStyle: React.CSSProperties = { textDecoration: 'none', color: '#4a5568' };
const activeLinkStyle: React.CSSProperties = { fontWeight: 'bold', color: '#1a202c' };

export function Layout() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <nav style={navStyle} aria-label="Navegación principal">
        <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Bibliotek</span>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/books"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
        >
          Mis libros
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
