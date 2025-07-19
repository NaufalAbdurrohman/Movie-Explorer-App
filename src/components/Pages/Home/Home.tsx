import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Header } from '../../layout/Header/Header';
import { Hero } from '../../sections/Hero';
import { TrendingNow } from '../../sections/TrendingNow';
import { getTrailerUrl, getTrendingMovies } from '@/services/tmdb';
import { NowPlaying } from '../../sections/Now Playing';
import Footer from '@/components/layout/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ScrollButton } from '@/components/ui/ScrollButton/ScrollButton';
import Loader from '@/components/ui/Loader/Loader'; // ✅ Tambahkan ini

export const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [heroTrailerUrl, setHeroTrailerUrl] = useState<string>('');
  const [loading, setLoading] = useState(true); // ✅ Tambahkan loading state
  const scrollPosition = useSelector((state: RootState) => state.scroll.homePosition);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true); // ✅ Start loading

        const movies = await getTrendingMovies();
        setTrendingMovies(movies.slice(0, 20));

        const topMovie = movies[0];
        const trailer = await getTrailerUrl(topMovie.id);
        setHeroTrailerUrl(trailer || '#');

        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 0);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // ✅ End loading
      }
    };

    fetchTrending();
  }, []);

  const topMovie = trendingMovies[0];

  if (loading) return <Loader />; // ✅ Tampilkan Loader saat loading

  return (
    <>
      <div className={styles.homePage}>
        <Header />
      </div>  

      <div className={styles.hero}>
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
        <TrendingNow movies={trendingMovies} />
        <NowPlaying />
        <Footer />
        <ScrollButton />
      </div>
    </>
  );
};
