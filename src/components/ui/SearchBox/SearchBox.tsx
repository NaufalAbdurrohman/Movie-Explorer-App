import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './SearchBox.module.scss';
import SearchIcon from '@/assets/SearchIcon.svg';
import ClearIcon from '@/assets/Close.svg';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  fullWidth?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search Movie',
  onSearch,
  fullWidth = false,
}) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() && onSearch) {
      onSearch(query.trim());
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
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
