import Image from 'next/image';
import React from 'react';
import styles from './AlbumCard.module.scss';
import { AlbumCardPropsInterface } from './interfaces/album-card-props.inetface';

const AlbumCard = (props: AlbumCardPropsInterface) => {
  return (
    <div className={styles.wrapper}>
      <Image src={props.imageSrc} alt={props.albumName} width={230} height={230} />
      <span className={styles.graduation}>{props.albumName}</span>
      <span className={styles.kanyeWest}>{props.artistName}</span>
    </div>
  );
};

export default AlbumCard;
