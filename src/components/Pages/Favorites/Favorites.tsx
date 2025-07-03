import React from 'react';
import styles from './Favorites.module.scss';
import FavoriteList from '@/components/ui/FavoriteList/FavoriteList';
import { Header } from '@/components/layout/Header';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import Footer from '@/components/layout/Footer/Footer';
import PlayIcon from '@/assets/Play.svg';
import HeartIcon from '@/components/ui/HeartIcon/HeartIcon';
// import { useParams } from 'react-router-dom';
import { useSelector, UseSelector } from 'react-redux';
import { RootState } from '@/store';
import MovieBlank from '@/assets/MovieBlank.png';

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className={styles.favorites}>
      <Header />

      <div className={styles.content}>
        <SectionTitle className={styles.title}>Favorites</SectionTitle>

        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.logoText}>
              <img
                src={MovieBlank}
                alt='Empty Favorite'
                className={styles.emptyImage}
              />
              <div className={styles.text}>
                <h3 className={styles.emptyTitle}>Data Empty</h3>
                <p className={styles.emptyText}>
                  You don't have a favorite movie yet
                </p>
              </div>
            </div>
            <Button
              variant='primary'
              onClick={() => (window.location.href = '/')}
              className={styles.buttonStyle}
            >
              Explore Movie
            </Button>
          </div>
        ) : (
          <FavoriteList items={favorites} className={styles.favoritesList} />
        )}
      </div>

      <Footer />
    </div>
  );
};
