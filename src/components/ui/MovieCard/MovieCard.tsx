import React from 'react';
import styles from './MovieCard.module.scss';
import Poster from '@/assets/MinecraftPoster.jpeg';
import Star from '../../../assets/Star 2.png';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
  isTrending?: boolean;
  rankNumber?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  image,
  title,
  rating,
  isTrending = true,
  rankNumber = 0,
}: MovieCardProps) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.imageWrapper}>
        <img src={image || Poster} alt={title} className={styles.poster} /> 
        {/* kalau image kosong/null, fallback ke MinecraftPoster.jpeg. */}
        {isTrending && typeof rankNumber === 'number' && (
          <div className={styles.trendingBadge}>{rankNumber + 1}</div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <img src={Star} alt='Star Icon' />
          <span className={styles.numericalRating}>{rating.toFixed(1)}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
