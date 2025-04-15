'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Weather App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/favorites"
                className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}>
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
