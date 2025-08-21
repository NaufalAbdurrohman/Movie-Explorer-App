import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies, getTrailerUrl } from '@/services/tmdb';
import { Header } from '@/components/layout/Header';
import { Toast } from '@/components/ui/Toast';
import styles from './SearchResult.module.scss';
import MovieList from '@/components/ui/MovieList/MovieList';
import MovieBlank from '@/assets/MovieBlank.png';
import Loader from '@/components/ui/Loader/Loader';
import Footer from '@/components/layout/Footer/Footer';
import { Movie } from '@/components/sections/Now Playing';

const SearchResult: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleToggleFavorite = (action: 'add' | 'remove' ) => {
    const message =
      action === 'add' ? `Success add to Favorites` : `Removed from Favorites`;

    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length === 0) {
      navigate('/');
      return;
    }

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
              rating:
                typeof movie.vote_average === 'number' ? movie.vote_average : 0,
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

    fetchSearch();
  }, [query]);

  return (
    <div className={styles.search}>
      <Header />
      <Toast message={toastMessage} visible={showToast} />

      <div className={styles.content} style={{ position: 'relative' }}>
        {loading && <Loader />}

        {!loading && results.length === 0 && (
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
        )}

        {!loading && results.length > 0 && (
          <MovieList
            items={results}
            className={styles.searchList}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResult;
