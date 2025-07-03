import React, { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
import { Header } from '../../layout/Header';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import buttonStyles from '@/components/ui/Button/Button.module.scss';
import CalendarIcon from '@/assets/Calendar.svg';
import MovieIcon from '@/assets/Video.svg';
import EmojiIcon from '@/assets/emoji-happy.svg';
import StarIcon from '@/assets/StarYellow.svg';
import PlayIcon from '@/assets/Play.svg';
import HeartIcon from '@/components/ui/HeartIcon/HeartIcon';
import PosterCard from '@/assets/mcpc.webp';
import clsx from 'clsx';
import CastCard from '@/components/ui/CastCard/CastCard';
import ImageMan from '@/assets/missingPeople.jpeg';
import Footer from '@/components/layout/Footer/Footer';
import { useParams } from 'react-router-dom';
import { getMovieDetail, getMovieCredits, getTrailerUrl } from '@/services/tmdb';
import { Toast } from '@/components/ui/Toast';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addFavorite, removeFavorite } from '@/store/FavoritesSlice';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string>('');
  const [cast, setCast] = useState<any[]>([]);
  const [age, setAge] = useState<string>('N/A');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((item) => item.id === Number(id))
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getMovieDetail(parseInt(id));
        const trailer = await getTrailerUrl(parseInt(id));
        const credit = await getMovieCredits(parseInt(id));
        setMovie(data);
        setTrailerUrl(trailer || '#');
        setCast(credit.cast || []);
        setAge(data.adult ? '18+' : '13+');
      } catch (error) {
        console.error('Failed to load movie detail:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;

    const movieData = {
      id: movie.id,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      rating: movie.vote_average,
      description: movie.overview,
      trailerUrl: trailerUrl,
    };

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      setToastMessage('Removed from Favorites');
    } else {
      dispatch(addFavorite(movieData));
      setToastMessage('Success Add to Favorites');
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!movie) {
    return <div className={styles.detail}>Loading...</div>;
  }

  return (
    <div className={styles.detail}>
      <Toast message={toastMessage} visible={showToast} />
      <Header />

      <div className={styles.backdropWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className={styles.backdrop}
          alt='backdrop'
        />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.movie}>
          <div className={styles.imageWrapper}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : PosterCard
              }
              className={styles.PosterCard}
              alt='Movie Poster'
            />
          </div>

          <div className={styles.movieDetail}>
            <div className={styles.title}>
              <SectionTitle className={styles.titleMovie}>
                {movie.title}
              </SectionTitle>
              <div className={styles.dateContainer}>
                <div className={styles.iconDate}>
                  <CalendarIcon />
                </div>
                <div className={styles.date}>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                variant='primary'
                onClick={() => window.open(trailerUrl, '_blank')}
              >
                Watch Trailer <PlayIcon className={buttonStyles.icon} />
              </Button>

              <div className={styles.favoriteButtonWrapper}>
                <Button
                  variant='secondary'
                  aria-pressed={isFavorite}
                  className={clsx(styles.favoriteButton, isFavorite && styles.active)}
                  onClick={handleFavoriteClick}
                >
                  <HeartIcon className={styles.heartIcon} filled={isFavorite} />
                </Button>
              </div>
            </div>

            <div className={styles.rga}>
              <div className={styles.card}>
                <div className={styles.icon}>
                  <StarIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>Rating</span>
                  <span className={styles.name}>
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.icon}>
                  <MovieIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>Genre</span>
                  <span className={styles.name}>
                    {movie.genres?.slice(0, 3).map((g: any) => g.name).join(', ') || 'N/A'}
                  </span>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.icon}>
                  <EmojiIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>Age Limit</span>
                  <span className={styles.name}>{age}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.overview}>
          <SectionTitle className={styles.overviewTitle}>Overview</SectionTitle>
          <p>{movie.overview}</p>
        </div>

        <div className={styles.cac}>
          <SectionTitle className={styles.cacTitle}>Cast & Crew</SectionTitle>
          <div className={styles.castCard}>
            {cast.slice(0, 8).map((actor, index) => (
              <CastCard
                key={index}
                name={actor.name}
                role={actor.character}
                img={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : ImageMan
                }
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
