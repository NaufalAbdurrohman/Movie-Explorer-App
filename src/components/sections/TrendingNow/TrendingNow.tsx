import React, { useState, useRef } from 'react';
import MovieCard from '@/components/ui/MovieCard/MovieCard';
import styles from './TrendingNow.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/Button';
import ArrowRightIcon from '@/assets/ArrowRight.svg';
import ArrowLeftIcon from '@/assets/ArrowLeftIcon.svg';
import { SectionTitle } from '@/components/ui/SectionTitle';

const trendingData = new Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  title: 'A Minecraft Movie',
  IsTrending: true,
  rankNumber: index + 0,
}));

export const TrendingNow: React.FC = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.trending}>
      <div className={styles.header}>
        <SectionTitle>Trending Now</SectionTitle>
        <div className={styles.navButtons}>
          <Button
            ref={prevRef}
            variant='secondary'
            className={`${styles.arrowButton} ${styles.prev} ${
              isBeginning ? styles.hidden : ''
            }`}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            ref={nextRef}
            variant={'secondary'}
            className={`${styles.arrowButton} ${styles.next} ${
              isEnd ? styles.hidden : ''
            }`}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            typeof swiper.params.navigation !== 'boolean' &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          1024: { slidesPerView: 6 },
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className={`swiper-container ${styles.list}`}
      >
        {trendingData.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div>
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={''}
                rating={6.5}
                isTrending={movie.IsTrending}
                rankNumber={movie.rankNumber}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.rightGradient} />
    </div>
  );
};
