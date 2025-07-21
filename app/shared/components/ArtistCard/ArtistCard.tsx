import Image from 'next/image';
import React from 'react';
import styles from './ArtistCard.module.scss';
import { SingleArtistPropsInterface } from './interfaces/artist-card-props.interface';

const ArtistCard = (props: SingleArtistPropsInterface) => {
  return (
    <div className={styles.wrapperContainer}>
      <div className={styles.container}>
        <Image
          className={styles.artists}
          src={props.imageSrc}
          width={210}
          height={210}
          alt={props.name}
        />
        <span className={styles.artistsName}>{props.name}</span>
      </div>
    </div>
  );
};

export default ArtistCard;
