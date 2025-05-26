import React from 'react';
import styles from './CastCard.module.scss';
import Foto from '@/assets/ImageMan.png';

type CastCardProps = {
  name: string;
  role: string;
};

const CastCard: React.FC<CastCardProps> = ({
  name = 'Anthony Mackie',
  role = 'Sam Wilson / Captain America',
}) => {
  return (
    <div className={styles.castCard}>
      <img src={Foto} alt={name} className={styles.image} />
      <div className={styles.textContent}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
};

export default CastCard;
