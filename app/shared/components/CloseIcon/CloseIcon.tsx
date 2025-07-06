'use client';

import { useState } from 'react';
import styles from './CloseIcon.module.scss';

const CloseIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.close} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <span className={isOpen ? styles.span : ''}></span>
      <span className={isOpen ? styles.span : ''}></span>
    </div>
  );
};

export default CloseIcon;
