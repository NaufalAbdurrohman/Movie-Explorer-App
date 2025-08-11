import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import FavoriteList from '@/components/ui/FavoriteList/FavoriteList';
import { Header } from '@/components/layout/Header';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MovieBlank from '@/assets/MovieBlank.png';
import Loader from '@/components/ui/Loader/Loader';
import Footer from '@/components/layout/Footer/Footer';

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleRemoveFavorite = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.favorites}>
      <Toast message="Removed from Favorites" visible={showToast} />

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
          <FavoriteList onRemove={handleRemoveFavorite} className={styles.favoritesList} />
        )}
      </div>

      <Footer />
    </div>
  );
};
