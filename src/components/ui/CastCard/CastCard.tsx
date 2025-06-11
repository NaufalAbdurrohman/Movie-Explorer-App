import React from 'react';
import styles from './CastCard.module.scss';

type CastCardProps = {
  name: string;
  role: string;
  img: string;
};

const CastCard: React.FC<CastCardProps> = ({
  name = 'Anthony Mackie',
  role = 'Sam Wilson / Captain America',
  img = 'Foto'
}) => {
  return (
    <div className={styles.castCard}>
      <img src={img} alt={name} className={styles.image} />
      <div className={styles.textContent}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
};

export default CastCard;
