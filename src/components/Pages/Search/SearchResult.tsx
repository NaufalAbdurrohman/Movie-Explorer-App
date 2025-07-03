import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '@/services/tmdb';
import MovieCard from '@/components/ui/MovieCard/MovieCard';

const SearchResult: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await searchMovies(query);
        setResults(data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Search results for: <strong>{query}</strong></h2>

      {query.length < 2 && (
        <p>Please enter at least 2 characters to search.</p>
      )}

      {loading && <p>Loading...</p>}

      {!loading && results.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}>
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
