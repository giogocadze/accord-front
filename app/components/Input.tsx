import Image from 'next/image';
import React from 'react';
import styles from './Input.module.scss';

type Props = {
  className?: string;
  mode?: 'homePageInput' | 'signInInput';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  isError?: boolean;
};

const Input = (props: Props) => {
  const classes = [styles.input];

  if (props.mode === 'homePageInput') {
    classes.push(styles.homePageInput);
  } else {
    classes.push(styles.signInInput);
  }

  if (props.isError) {
    classes.push(styles.error);
  }

  return (
    <div className={styles.wrapper}>
      <input
        type={props.type || 'text'}
        className={classes.join(' ')}
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
