import React from 'react';
import styles from './SectionTitle.module.scss';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
}) => {
  return <h2 className={`${styles.title} ${className ?? ''}`}>{children}</h2>;
};
