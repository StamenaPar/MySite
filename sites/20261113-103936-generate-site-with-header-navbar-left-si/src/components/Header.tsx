import { Link } from 'react-router-dom';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className='header'>
      <button
        type='button'
        className='menu-button'
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls='sidebar'
        onClick={onToggleMenu}
      >
        <svg viewBox='0 0 24 24' width='24' height='24' aria-hidden='true' focusable='false'>
          {menuOpen ? (
            <path d='M6 6l12 12M18 6L6 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          ) : (
            <path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          )}
        </svg>
      </button>
      <Link to='/' className='brand'>
        <svg viewBox='0 0 32 32' width='32' height='32' aria-hidden='true' focusable='false'>
          <circle cx='16' cy='16' r='16' fill='#ffffff' />
          <path d='M9 17c0-5 4-9 14-10 0 9-3 15-9 15-3 0-5-2-5-5z' fill='#2f9e44' />
          <path d='M8 25c2-6 6-10 11-13' stroke='#1b5e20' strokeWidth='2' strokeLinecap='round' fill='none' />
        </svg>
        <span>Fresh Market</span>
      </Link>
      <p className='header-tagline'>Fruit and vegetables, picked daily</p>
    </header>
  );
}
