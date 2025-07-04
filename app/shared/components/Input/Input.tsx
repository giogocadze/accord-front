import Image from 'next/image';
import React from 'react';
import styles from './Input.module.scss';
import { InputPropsInterface } from './interfaces/input-props.interface';

const Input = (props: InputPropsInterface) => {
  const className =
    styles.input +
    ' ' +
    (props.mode === 'homePageInput' ? styles.homePageInput : styles.signInInput) +
    (props.isError ? ` ${styles.error}` : '');

  return (
    <div className={styles.wrapper}>
      <input
        type={props.type || 'text'}
        className={className}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.mode === 'homePageInput' && (
        <Image
          src="/search-svg.svg"
          alt="search-svg"
          width={20}
          height={20}
          className={styles.image}
        />
      )}
    </div>
  );
};

export default Input;
