import React, { useRef, useState , useEffect} from 'react';
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

interface TrendingNowProps {
  movies: any[];
}

export const TrendingNow: React.FC<TrendingNowProps> = ({ movies }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect (() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className={styles.trending}>
      <div className={styles.header}>
        <SectionTitle>Trending Now</SectionTitle>
        <div className={styles.navButtons}>
          <Button
            ref={prevRef}
            variant='secondary'
            className={`${styles.arrowButton} ${styles.prev}
            }`}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            ref={nextRef}
            variant='secondary'
            className={`${styles.arrowButton} ${styles.next}
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
          1440: { slidesPerView: 6, spaceBetween: 10 } ,
        }}
        // onSlideChange={(swiper) => {
        //   setIsBeginning(swiper.isBeginning);
        //   setIsEnd(swiper.isEnd);
        // }}
        loop={true}
        className={`swiper-container ${styles.list}`}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `/fallback-poster.png`
              }
              rating={movie.vote_average}
              isTrending={true}
              rankNumber={index}
              movieId={movie.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.rightGradient} />
    </div>
  );
};
