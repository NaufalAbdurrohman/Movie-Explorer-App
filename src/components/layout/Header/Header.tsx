  import React, { useState, useEffect } from 'react';
  import styles from './Header.module.scss';
  import MovieIcon from '@/assets/movieMobile.svg';
  import SearchIcon from '@/assets/SearchIcon.svg';
  import MenuIcon from '@/assets/Menu.svg';
  import CloseIcon from '@/assets/CloseBlank.svg';
  import clsx from 'clsx';
  import LeftArrowIcon from '@/assets/ArrowLeft.svg';
  import { useNavigate, useLocation } from 'react-router-dom';
  import SearchBox from '../../ui/SearchBox/SearchBox';

  export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get('q') || '';

    useEffect(() => {
      document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'auto';
    }, [menuOpen, searchOpen]);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 0);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSearch = (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length < 2) return;
    
      const encoded = encodeURIComponent(trimmed);
      const currentPath = location.pathname;  
      const currentQuery = new URLSearchParams(location.search).get('q');
    
      if (currentPath === '/search' && currentQuery === trimmed) {
        navigate(`/search?q=${encoded}&_=${Date.now()}`);
      } else {
        navigate(`/search?q=${encoded}`);
      }
    };

    return (
      <>
        <header className={clsx(styles.header, scrolled && styles.scrolled)}>
          <div className={styles.logoNavbar}>
            <a href='/'>
              <MovieIcon className={styles.logo} />
            </a>
            <nav className={styles.navDesktop}>
              <a 
                href='/' 
                className={clsx(
                  styles.navLink,
                  location.pathname === '/' && styles.active
                )}
              >
                Home
              </a>
              <button
                onClick={() => navigate('/favorites')}
                className={clsx(
                  styles.navLink,
                  location.pathname === '/favorites' && styles.active
                )}
              >
                Favorites
              </button>
            </nav>
          </div>

          <div className={styles.searchDesktop}>
            <SearchBox 
              placeholder='Search Movie' 
              onSearch={handleSearch} 
              initialQuery={initialQuery}                 
            />
          </div>

          <div className={styles.mobileToolbar}>
            <button
              className={styles.iconButton}
              aria-label='Open search'
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label='Open Menu'
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={clsx(styles.mobileMenu, menuOpen && styles.open)}>
          <div className={styles.menuHeader}>
            <a href='/'>
              <MovieIcon className={styles.menuLogo} />
            </a>
            <button
              className={styles.closeButton}
              aria-label='Close Menu'
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className={styles.navMobile}>
            <a 
              href='/' 
              onClick={() => setMenuOpen(false)} 
              className={clsx(
                styles.navLink,
                location.pathname === '/' && styles.active
              )}
            >
              Home
            </a>
            <button
              onClick={() => {
                navigate('/favorites');
                setMenuOpen(false);
              }}
              className={clsx(
                styles.navLink,
                location.pathname === '/favorites' && styles.active
              )}
            >
              Favorites
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={clsx(styles.searchMobile, searchOpen && styles.open)}>
          <div className={styles.searchHeader}>
            <button
              className={styles.backButton}
              aria-label='Back'
              onClick={() => setSearchOpen(false)}
            >
              <LeftArrowIcon />
            </button>
            <SearchBox 
              isMobile
              onSearch={handleSearch} 
              initialQuery={initialQuery} 
            />
          </div>
        </div>
      </>
    );
  };