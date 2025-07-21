import Image from 'next/image';
import React from 'react';
import styles from './ArtistCard.module.scss';
import { SingleArtistPropsInterface } from './interfaces/artist-card-props.interface';

const ArtistCard = ({ artist }: SingleArtistPropsInterface) => {
  return (
    <div className={styles.wrapperContainer}>
      <div className={styles.container}>
        <Image
          className={styles.artists}
          src={artist.imageSrc}
          width={210}
          height={210}
          alt={artist.name}
        />
        <span className={styles.artistsName}>{artist.name}</span>
      </div>
    </div>
  );
};

export default ArtistCard;
