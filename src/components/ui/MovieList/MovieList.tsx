// src/components/ui/MovieList/MovieList.tsx
import React from 'react';
import styles from './MovieList.module.scss';
import clsx from 'clsx';
import Star from '@/assets/StarYellow.svg';
import HeartIcon from '../HeartIcon/HeartIcon';
import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.scss';
import PlayIcon from '@/assets/Play.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/store/FavoritesSlice';
import { RootState } from '@/store';
import { Link } from 'react-router-dom';

type MovieListProps = {
  items: MovieType[];
  className?: string;
  onToggleFavorite?: (action: 'add' | 'remove', movie: MovieType) => void;
};

const MovieList: React.FC<MovieListProps> = ({ items, className, onToggleFavorite }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (movie: MovieType) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
      onToggleFavorite?.('remove', movie); // ✅
    } else {
      dispatch(addFavorite(movie));
      onToggleFavorite?.('add', movie); // ✅
    }
  };

  return (
    <div className={clsx(styles.movieListWrapper, className)}>
      {items.map((movie) => (
        <div key={movie.id} className={styles.movieList}>
          <div className={styles.card}>
            {/* Poster */}
            <div className={styles.imageWrapper}>
              <Link to={`/detail/${movie.id}`}>
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  className={styles.poster}
                />
              </Link>
            </div>

            {/* Text Info + Desktop Trailer Button */}
            <div className={styles.text}>
              <div className={styles.textWrapper}>
                <div className={styles.title}>
                  <Link to={`/detail/${movie.id}`} className={styles.clamp}>
                    {movie.title}
                  </Link>
                </div>
                <div className={styles.rating}>
                  <Star className={styles.star} />
                  <span className={styles.numericalRating}>
                    {movie.rating ? movie.rating.toFixed(1) : '10'}/10
                  </span>
                </div>
                <div className={styles.description}>{movie.description}</div>
              </div>

              {/* Desktop-only Watch Trailer */}
              {movie.trailerUrl && (
                <Button
                  className={styles.secondWatchTrailerButton}
                  variant='primary'
                  onClick={() => window.open(movie.trailerUrl, '_blank')}
                >
                  Watch Trailer
                  <PlayIcon className={buttonStyles.icon} />
                </Button>
              )}
            </div>
          </div>

          {/* Mobile-only actions */}
          <div className={styles.actions}>
            {movie.trailerUrl && (
              <Button
                className={styles.watchTrailerButton}
                variant='primary'
                onClick={() => window.open(movie.trailerUrl, '_blank')}
              >
                Watch Trailer
                <PlayIcon className={buttonStyles.icon} />
              </Button>
            )}

            <div className={styles.favoriteButtonWrapper}>
              <Button
                variant='secondary'
                className={clsx(styles.favoriteButton, {
                  [styles.active]: isFavorite(movie.id),
                })}
                aria-pressed={isFavorite(movie.id)}
                aria-label={
                  isFavorite(movie.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                onClick={() => toggleFavorite(movie)}
              >
                <HeartIcon
                  className={styles.heartIcon}
                  filled={isFavorite(movie.id)}
                />
              </Button>
            </div>
          </div>

          {/* Desktop Favorite Button */}
          <div className={styles.topRightButton}>
            <Button
              variant='secondary'
              className={clsx(styles.favoriteButton, {
                [styles.active]: isFavorite(movie.id),
              })}
              aria-pressed={isFavorite(movie.id)}
              aria-label={
                isFavorite(movie.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              onClick={() => toggleFavorite(movie)}
            >
              <HeartIcon
                className={styles.heartIcon}
                filled={isFavorite(movie.id)}
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
