import React, { useEffect, useState } from 'react';
import styles from './NowPlaying.module.scss';
import MovieCard from '@/components/ui/MovieCard/MovieCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getNowPlayingMovies } from '@/services/tmdb';
import { Button } from '@/components/ui/Button';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_patch: string;
  vote_average: number;
  release_data: string;
}

export const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadInitialMovies = async () => {
      const totalPagesToLoad = 5;
      const promises = Array.from({ length: totalPagesToLoad }, (_, i) =>
        getNowPlayingMovies(i + 1)
      );
      const results = await Promise.all(promises);
      const allMovies = results.flat();

      const uniqueMovies = Array.from(new Map(allMovies.map((m) => [m.id, m])).values());
      setMovies(uniqueMovies);
      setPage(totalPagesToLoad); // supaya page selanjutnya adalah page ke-4
    };

    loadInitialMovies();
  }, []);

  // Load tambahan saat user klik "Load More"
  useEffect(() => {
    if (page <= 3) return; // skip page awal yang sudah dimuat

    const loadMoreMovies = async () => {
      const newMovies = await getNowPlayingMovies(page);
      const allMovies = [...movies, ...newMovies];
      const uniqueMovies = Array.from(new Map(allMovies.map((m) => [m.id, m])).values());
      setMovies(uniqueMovies);
    };


    loadMoreMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  

  return (
    <div className={styles.nowPlaying}>
      <div className={styles.header}>
        <SectionTitle>Now Playing</SectionTitle>
      </div>

      <div className={styles.listFilm}>
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            title={movie.title}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : `/fallback-poster.png`
            }
            rating={movie.vote_average}
            isTrending={false}
          />
        ))}
      </div>
      <div className={styles.loadMoreWrapper}>
        <Button variant='secondary' onClick={handleLoadMore} className={styles.loadMore}>
          Load More
        </Button>
      </div>
    </div>
  );
};
