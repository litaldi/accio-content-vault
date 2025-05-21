
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
      <span className="text-2xl font-bold text-primary">Accio</span>
    </Link>
  );
};

export default NavbarLogo;
