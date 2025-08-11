import React from 'react';
import styles from './FavoriteList.module.scss';
import clsx from 'clsx';
import Star from '@/assets/StarYellow.svg';
import HeartIcon from '../HeartIcon/HeartIcon';
import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.scss';
import PlayIcon from '@/assets/Play.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFavorite } from '@/store/FavoritesSlice';
import { Link } from 'react-router-dom';
import PlayIconMobile from '@/assets/PlayMobile.svg';

type FavoriteListProps = {
  className?: string;
  onRemove?: () => void;
};

const FavoriteList: React.FC<FavoriteListProps> = ({ onRemove, className }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (movieId: number) => {
    dispatch(removeFavorite(movieId));
    onRemove?.();
  };

  return (
    <div className={clsx(styles.favoriteListWrapper, className)}>
      {favorites.map((movie) => (
        <div key={movie.id} className={styles.favoriteList}>
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Link to={`/detail/${movie.id}`}>
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  className={styles.poster}
                />
              </Link>
            </div>
            <div className={styles.text}>
              <div className={styles.textWrapper}>
                <div className={styles.title}>
                  <Link to={`/detail/${movie.id}`}>{movie.title}</Link>
                </div>
                <div className={styles.rating}>
                  <Star className={styles.star} />
                  <span className={styles.numericalRating}>
                    {movie.rating.toFixed(1)}/10
                  </span>
                </div>
                <div className={styles.description}>{movie.description}</div>
              </div>
              {movie.trailerUrl && (
                <Button
                  className={styles.secondWatchTrailerButton}
                  variant='primary'
                  onClick={() => window.open(movie.trailerUrl, '_blank')}
                >
                  Watch Trailer <PlayIcon className={buttonStyles.icon} />
                </Button>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {movie.trailerUrl && (
              <Button
                className={styles.watchTrailerButton}
                variant='primary'
                onClick={() => window.open(movie.trailerUrl, '_blank')}
              >
                Watch Trailer
                <PlayIconMobile />
              </Button>
            )}

            <div className={styles.favoriteButtonWrapper}>
              <Button
                variant='secondary'
                className={clsx(styles.favoriteButton, styles.active)}
                aria-pressed={true}
                aria-label='Remove from favorites'
                onClick={() => handleRemove(movie.id)}
              >
                <HeartIcon className={styles.heartIcon} filled={true} />
              </Button>
            </div>
          </div>

          <div className={styles.topRightButton}>
            <Button
              variant='secondary'
              className={clsx(styles.favoriteButton, styles.active)}
              aria-pressed={true}
              aria-label='Remove from favorites'
              onClick={() => handleRemove(movie.id)}
            >
              <HeartIcon className={styles.heartIcon} filled={true} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
