import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies, getTrailerUrl } from '@/services/tmdb';
import MovieList from '@/components/ui/MovieList/MovieList';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer/Footer';
import styles from './SearchResult.module.scss';
import MovieBlank from '@/assets/MovieBlank.png';

const SearchResult: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q') || '';
  const [results, setResults] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
  
        const mapped = await Promise.all(
          data.results.map(async (movie: any) => {
            const trailerUrl = await getTrailerUrl(movie.id);
  
            return {
              id: movie.id,
              title: movie.title || movie.name || 'Untitled',
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/fallback-image.jpg',
              rating: typeof movie.vote_average === 'number' ? movie.vote_average : 0,
              description: movie.overview || 'No description available',
              trailerUrl: trailerUrl || 'No trailer found',
            };
          })
        );
  
        setResults(mapped);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (query.length >= 2) {
      fetchSearch();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className={styles.search}>
      <Header />

      <div className={styles.content}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : results.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.logoText}>
              <img
                src={MovieBlank}
                alt='Empty Search'
                className={styles.emptyImage}
              />
              <div className={styles.text}>
                <h3 className={styles.emptyTitle}>Data Not Found</h3>
                <p className={styles.emptyText}>Try other keywords</p>
              </div>
            </div>
          </div>
        ) : (
          <MovieList items={results} className={styles.searchList} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResult;
