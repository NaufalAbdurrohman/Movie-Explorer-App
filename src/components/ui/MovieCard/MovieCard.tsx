import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import Poster from '@/assets/MinecraftPoster.jpeg';
import Star from '../../../assets/Star 2.png';
import { setHomeScrollPosition } from '@/store/scrollSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

interface MovieCardProps {
  image: string;
  title: string;
  rating: number;
  isTrending?: boolean;
  rankNumber?: number;
  movieId?: string | number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  image,
  title,
  rating,
  isTrending = true,
  rankNumber = 0,
  movieId,
}: MovieCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(setHomeScrollPosition(window.scrollY));
    navigate(`/detail/${movieId}`);
  };

  // const { ref, animation } = useInViewAnimation();

  return (
    <motion.div
      className={styles.movieCard}
      onClick={handleCardClick}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className={styles.movieCard} onClick={handleCardClick}>
        <div className={styles.imageWrapper}>
          <img
            src={image || Poster}
            alt={title || 'No Title'}
            className={styles.poster}
          />
          {/* kalau image kosong/null, fallback ke MinecraftPoster.jpeg. */}
          {isTrending && typeof rankNumber === 'number' && (
            <div className={styles.trendingBadge}>{rankNumber + 1}</div>
          )}
        </div>
        <div className={styles.movieInfo}>
          <h3 className={styles.title}>{title || 'untitled'}</h3>
          <div className={styles.rating}>
            <img src={Star} alt='Star Icon' />
            <span className={styles.numericalRating}>
              {typeof rating === 'number' ? rating.toFixed(1) : '55'}/10
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
