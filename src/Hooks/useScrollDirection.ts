import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY) < 4) return; // avoid noise
      setScrollDir(currentY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  return scrollDir;
};
