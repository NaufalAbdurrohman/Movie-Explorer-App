// src/Hooks/useInViewAnimation.ts
import { useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export const useInViewAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      });
    }
    // } else {
    //   animation.start({
    //     opacity: 0,
    //     scale: 0.8,
    //     transition: {
    //       duration: 0.4,
    //       ease: 'easeIn',
    //     },
    //   });
    // }
  }, [inView, animation]);

  return { ref, animation };
};
