import Image from 'next/image';
import React from 'react';
import styles from './ArtistCard.module.scss';
import { ArtistCardProps } from './interfaces';

const ArtistCard = ({ artists }: ArtistCardProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperContainer}>
        {artists.map((artist, index) => (
          <div key={index} className={styles.container}>
            <Image
              className={styles.artists}
              src={artist.imageSrc}
              width={210}
              height={210}
              alt={artist.name}
            />
            <span className={styles.artistsName}>{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;
