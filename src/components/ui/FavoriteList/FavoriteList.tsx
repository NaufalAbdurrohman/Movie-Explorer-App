import React, { useState } from 'react';
import styles from './FavoriteList.module.scss';
import clsx from 'clsx';
import Poster from '@/assets/FavoriteList.png';
import Star from '@/assets/StarYellow.svg';
import HeartIcon from '../HeartIcon/HeartIcon';
import { Button }from '../Button/Button';
import buttonStyles from '../Button/Button.module.scss'
import PlayIcon from '@/assets/Play.svg';

interface FavoriteListProps {
  poster?: string;
  title?: string;
  rating?: number;
  description?: string;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  poster = Poster,
  title = 'Captain America: Brave New World',
  rating = 7.9,
  description = 'After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.',
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.favoriteList}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={poster} alt={`${title} Poster`} className={styles.poster} />
        </div>
        <div className={styles.text}>
          <div className={styles.textWrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.rating}>
              <Star className={styles.star} />
              <span className={styles.numericalRating}>
                {rating.toFixed(1)}/10
              </span>
            </div>
            <div className={styles.description}>{description}</div>
          </div>
          <Button className={styles.secondWatchTrailerButton} variant={'primary'}>
            Watch Trailer <PlayIcon className={styles.icon} />
          </Button>
        </div>
      </div>
``
      <div className={styles.actions}>
        <Button className={styles.watchtrailerButton} variant={'primary'}>
          Watch Trailer
          <PlayIcon className={buttonStyles.icon} />
        </Button>
        <div className={styles.favoriteButtonWrapper}>
          <Button
            variant='secondary'
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            className={clsx(styles.favoriteButton, isFavorite && styles.active)}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon className={styles.heartIcon} filled={isFavorite} />
          </Button>
        </div>
      </div>

      <div className={styles.topRightButton}>
        <Button
          variant='secondary'
          className={clsx(styles.favoriteButton, isFavorite && styles.active)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon className={styles.heartIcon} filled={isFavorite} />
        </Button>
      </div>
    </div>
  );
};

export default FavoriteList;
