import React, { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
import { Header } from '../../layout/Header';
import Poster from '@/assets/MinecraftPoster.jpeg';
import Backdrop from '@/assets/MinecraftMovie.jpg';
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
import ImageMan from '@/assets/CastCard.png';
import Footer from '@/components/layout/Footer/Footer';

export interface DetailProps {
  backdrop: string;
  poster: string;
  rating: string;
}

export const Detail: React.FC<DetailProps> = ({ backdrop, poster, rating }) => {
  const handleWatchTrailer = () => {
    window.open(trailerUrl, '_blank');
  };

  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.detail}>
      <Header />
      {/* Backdrop Container */}
      <div className={styles.backdropWrapper}>
        <img src={Backdrop} className={styles.backdrop} alt='backdrop' />
      </div>

      {/* Content Container */}
      <div className={styles.contentWrapper}>
        <div className={styles.movie}>
          <div className={styles.imageWrapper}>
            <img
              src={PosterCard}
              className={styles.PosterCard}
              alt='Movie Poster'
            />
          </div>
          <div className={styles.movieDetail}>
            <div className={styles.title}>
              <SectionTitle className={styles.titleMovie}>
                A Minecraft Movie
              </SectionTitle>
              <div className={styles.dateContainer}>
                <div className={styles.iconDate}>
                  <CalendarIcon />
                </div>
                <div className={styles.date}>
                  <p>4 Mei 2025</p>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <Button variant='primary' onClick={handleWatchTrailer}>
                Watch Trailer <PlayIcon className={buttonStyles.icon} />
              </Button>
              <div className={styles.favoriteButtonWrapper}>
                <Button
                  variant='secondary'
                  aria-pressed={isFavorite}
                  aria-label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                  className={clsx(
                    styles.favoriteButton,
                    isFavorite && styles.active
                  )}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <HeartIcon className={styles.heartIcon} filled={isFavorite} />
                </Button>
              </div>
            </div>

            {/* Rating Genre Age */}
            <div className={styles.rga}>
              {/* Star */}
              <div className={styles.card}>
                <div className={styles.icon}>
                  <StarIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>Rating</span>
                  <span className={styles.name}>8.2</span>
                </div>
              </div>
              {/* Genre */}
              <div className={styles.card}>
                <div className={styles.icon}>
                  <MovieIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>genre</span>
                  <span className={styles.name}>Action</span>
                </div>
              </div>
              {/* Age */}
              <div className={styles.card}>
                <div className={styles.icon}>
                  <EmojiIcon />
                </div>
                <div className={styles.rgaContent}>
                  <span className={styles.label}>Age Limit</span>
                  <span className={styles.name}>13</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overview */}
        <div className={styles.overview}>
          <SectionTitle className={styles.overviewTitle}>Overview</SectionTitle>
          <p>
            Four misfits find themselves struggling with ordinary problems when
            they are suddenly pulled through a mysterious portal into the
            Overworld: a bizarre, cubic wonderland that thrives on imagination.
            To get back home, they'll have to master this world while embarking
            on a magical quest with an unexpected, expert crafter, Steve.
          </p>
        </div>
        {/* Cast & Crew (cac) */}
        <div className={styles.cac}>
          <SectionTitle className={styles.cacTitle}>Cast & Crew</SectionTitle>
          <div className={styles.castCard}>
            <CastCard name={'Him'} role={'Main Character'} img={ImageMan} />
            <CastCard name={'Him'} role={'Main Character'} img={ImageMan} />
            <CastCard name={'Him'} role={'Main Character'} img={ImageMan} />
            <CastCard name={'Him'} role={'Main Character'} img={ImageMan} />
            <CastCard name={'Him'} role={'Main Character'} img={ImageMan} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
