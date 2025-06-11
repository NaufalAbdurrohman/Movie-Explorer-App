import React from 'react'
import styles from './Hero.module.scss'
import buttonStyles from '@/components/ui/Button/Button.module.scss'
import { Button } from '@/components/ui/Button/Button'
import PlayIcon from '@/assets/Play.svg'

export interface HeroProps {
  backdropUrl?: string; 
  title?: string;
  overview?: string;
  trailerUrl?:string;
}

export const Hero: React.FC<HeroProps> = ({ backdropUrl, title, overview, trailerUrl }) => {
  const handleWatchTrailer = () => {
    window.open(trailerUrl, '_blank');
  };

  return (
    <div className={styles.hero}>
      {/* Image Container */}
      <div
        className={styles.imageWrapper}
        style={{backgroundImage: `url(${backdropUrl})`}}
      />

      {/* Content Container */}
      <div className={styles.contentWrapper}>
        {/* Text Block */}
        <div className={styles.textBlock}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overView}>{overview}</p>
        </div>

        <div className={styles.actionsBlock}>
          <Button variant='primary' onClick={handleWatchTrailer}>
            Watch Trailer <PlayIcon className={buttonStyles.icon} />
          </Button>
          <Button variant='secondary'>See Detail</Button>
        </div>
      </div>
    </div>
  )
}
