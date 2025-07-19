import React, { useEffect, useState } from 'react'
import styles from './ScrollButton.module.scss'
import { Button } from '../Button'
import IconUp from '@/assets/ArrowUp.png'
import IconDown from '@/assets/ArrowDownn.png'

export const ScrollButton:React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState (false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollY + windowHeight >= fullHeight - 40;
      setIsAtBottom(nearBottom)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth'})
    }
  }

  return (
    
    <Button
     variant='primary'
     onClick={handleClick}
     className={styles.scrollButton} 
    >
      <img
        src={isAtBottom ? IconUp : IconDown}
        alt={isAtBottom ? 'Scroll to Top' : 'Scroll to Bottom'}
      />
    </Button>
  );
};
