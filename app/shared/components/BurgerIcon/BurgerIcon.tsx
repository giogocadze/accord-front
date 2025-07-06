'use client';

import { useState } from 'react';
import styles from './BurgerIcon.module.scss';

const BurgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <span className={isOpen ? styles.span : ''}></span>
      <span className={isOpen ? styles.span : ''}></span>
      <span className={isOpen ? styles.span : ''}></span>
    </div>
  );
};

export default BurgerIcon;
