import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SearchBox.module.scss';
import SearchIcon from '@/assets/SearchIcon.svg';
import ClearIcon from '@/assets/Close.svg';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  fullWidth?: boolean;
  initialQuery?: string;
  isMobile?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search Movie',
  onSearch,
  fullWidth = false,
  initialQuery = '',
  isMobile = false,
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fokuskan cursor saat komponen muncul (opsional)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Desktop: debounce search
  useEffect(() => {
    if (isMobile) return;
    if (!hasTyped || query.trim().length < 2) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onSearch?.(query.trim());
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, hasTyped, isMobile, onSearch]);

  const handleClear = () => {
    setQuery('');
    setHasTyped(false);
    onSearch?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMobile && e.key === 'Enter' && query.trim().length >= 2) {
      const trimmed = query.trim();
      const encoded = encodeURIComponent(trimmed);
      const currentQuery = new URLSearchParams(location.search).get('q');

      if (location.pathname === '/search' && currentQuery === trimmed) {
        // Kalau query sama, paksa reload dengan query unik (pakai timestamp dummy)
        navigate(`/search?q=${encoded}&_=${Date.now()}`);
      } else {
        navigate(`/search?q=${encoded}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!hasTyped) setHasTyped(true);
  };

  return (
    <div
      className={clsx(
        styles.searchBar,
        isFocused && styles.focused,
        fullWidth && styles.fullWidth
      )}
    >
      <div className={styles.searchInputContainer}>
        <span className={styles.searchIconWrapper}>
          <SearchIcon className={styles.searchIcon} />
        </span>
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {query && (
          <button
            className={styles.clearButtonWrapper}
            onClick={handleClear}
            aria-label='Clear search'
          >
            <ClearIcon className={styles.clearIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
