import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Header } from '../../layout/Header/Header';
import { Hero } from '../../sections/Hero';
import { TrendingNow } from '../../sections/TrendingNow';
import { getTrailerUrl, getTrendingMovies } from '@/services/tmdb';
import { NowPlaying } from '../../sections/Now Playing';
import { Detail } from '../Detail';
import Footer from '@/components/layout/Footer/Footer';
import { Toast } from '@/components/ui/Toast';
import { Favorites } from '../Favorites';
import FavoriteList from '@/components/ui/FavoriteList/FavoriteList';

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [heroTrailerUrl, setHeroTrailerUrl] = useState<string>('');

  useEffect(() => {
    const fetchTrending = async () => {
      // Get Trending From Trending Now
      const movies = await getTrendingMovies();
      setTrendingMovies(movies.slice(0, 20));

      // Get Trailer From movie
      const topMovie = movies[0];
      const trailer = await getTrailerUrl(topMovie.id);
      setHeroTrailerUrl(trailer || '#');
    };

    fetchTrending();
  }, []);

  const topMovie = trendingMovies[0];

  return (
    <>
      <div className={styles.homePage}>
        <Header />
      </div>  

      <div className={styles.hero}>
        {/* Hero dari trending #1 */}
        {topMovie && (
          <Hero
            id={topMovie.id}
            backdropUrl={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
            title={topMovie.title}
            overview={topMovie.overview}
            trailerUrl={heroTrailerUrl}
          />
        )}
      </div>
      <div className={styles.homeContent}>
        {/* Trending Now */}
        <TrendingNow movies={trendingMovies} />
        <NowPlaying />
        <Footer />
        {/* <Favorites /> */}
      </div>
    </>
  );
};
