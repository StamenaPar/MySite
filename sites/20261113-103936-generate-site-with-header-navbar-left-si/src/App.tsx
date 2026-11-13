import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ItemPage from './pages/ItemPage';
import NotFound from './pages/NotFound';

export default function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const skipToContent = () => {
    mainRef.current?.focus();
  };

  return (
    <div className='app'>
      <button type='button' className='skip-link' onClick={skipToContent}>
        Skip to content
      </button>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <div className='body'>
        <Sidebar open={menuOpen} />
        {menuOpen && <div className='backdrop' onClick={() => setMenuOpen(false)} aria-hidden='true' />}
        <main className='main' ref={mainRef} tabIndex={-1}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/item/:id' element={<ItemPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
