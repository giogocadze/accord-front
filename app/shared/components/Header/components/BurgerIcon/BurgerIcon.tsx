'use client';

import styles from './BurgerIcon.module.scss';
import { BurgerMenuPropsInterface } from './interfaces/burger-menu-props.interface';

const BurgerIcon = (props: BurgerMenuPropsInterface) => {
  const className =
    styles.burger +
    (props.mode === 'close' ? ` ${styles.open}` : '') +
    (props.className ? ` ${props.className}` : '');

  const handleClick = () => {
    const newState = !props.isOpen;
    props.onToggle(newState);
  };

  return (
    <div className={className} onClick={handleClick}>
      <span className={props.mode === 'close' ? styles.span : ''}></span>
      <span className={props.mode === 'close' ? styles.span : ''}></span>
      <span className={props.mode === 'close' ? styles.span : ''}></span>
    </div>
  );
};

export default BurgerIcon;
