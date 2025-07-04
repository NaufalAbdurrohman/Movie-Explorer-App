import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import MovieIcon from '@/assets/movieMobile.svg';
import SearchIcon from '@/assets/SearchIcon.svg';
import MenuIcon from '@/assets/Menu.svg';
import CloseIcon from '@/assets/CloseBlank.svg';
import clsx from 'clsx';
import LeftArrowIcon from '@/assets/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../../ui/SearchBox/SearchBox';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : 'auto';
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
        {/* Logo & Navigation Dekstop */}
        <div className={styles.logoNavbar}>
          <a href='/'>
            <MovieIcon className={styles.logo} />
          </a>
          <nav className={styles.navDesktop}>
            <a href='/' className={styles.home}>
              Home
            </a>
            <button
              onClick={() => handleNavigate('/favorites')}
              className={styles.favorites}
            >
              Favorites
            </button>
          </nav>
        </div>
        <div className={styles.searchDesktop}>
          <SearchBox placeholder='Search Movie' onSearch={handleSearch} />
        </div>
        {/* Mobile Toolbar */}
        <div className={styles.mobileToolbar}>
          <button
            className={styles.iconButton}
            aria-label='Open search'
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          {/* Hamburger For Mobile */}
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
          <a href='/' onClick={() => setMenuOpen(false)} className={styles.home}>
            Home
          </a>
          <button
            onClick={() => handleNavigate('/favorites')}
            className={styles.favorites}
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
          <SearchBox placeholder='Search Movie' fullWidth onSearch={handleSearch} />
        </div>
      </div>
    </>
  );
};
