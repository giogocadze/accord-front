import Image from 'next/image';
import React from 'react';
import styles from './AlbumCard.module.scss';
import { AlbumCardProps } from './interfaces/albom-card-props.inetface';

const AlbumCard = ({ imageSrc, albumName, artistName }: AlbumCardProps) => {
  return (
    <div className={styles.wrapper}>
      <Image src={imageSrc} alt={albumName} width={230} height={230} />
      <span className={styles.graduation}>{albumName}</span>
      <span className={styles.kanyeWest}>{artistName}</span>
    </div>
  );
};

export default AlbumCard;
