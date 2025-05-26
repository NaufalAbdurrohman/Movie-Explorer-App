import React from 'react';
import styles from './Home.module.scss';
import { Header } from './layout/Header/Header';
import CastCard from './ui/CastCard/CastCard';
import MovieCard from './ui/MovieCard/MovieCard';
import { Button } from './ui/Button/Button';
import FavoriteList from './ui/FavoriteList/FavoriteList';
import SearchBar from './ui/SearchBox/SearchBox';
import Footer from './layout/Footer/Footer';
import { Hero } from './sections/Hero';
import Poster from '@/assets/MinecraftMovie.jpg'
import { TrendingNow } from './sections/TrendingNow';

export const Home: React.FC = () => {
  return (
    <div className={styles.homePage}>
      {/* Hello World!! */}
      {/* <Navbar /> */}
      {/* <CastCard role={'Sam Wilso / Captain America'} name={'Anthoy Mackie'} /> */}
      {/* <MovieCard image={''} title={'A Minecraft Movie'} rating={6.5} /> */}
      {/* <Button children='Ini Tombol' variant='primary' /> */}
      {/* <FavoriteList /> */}
      {/* <SearchBar /> */}
      <Header />
      <Hero 
        backdropUrl={Poster}
        title='A Minecraft Movie'
        overview='Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they will have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.'
      />
      <TrendingNow />
      {/* <Footer /> */}
    </div>
  );
};
