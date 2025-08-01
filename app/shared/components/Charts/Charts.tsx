import Image from 'next/image';
import styles from './Charts.module.scss';
import { ChartsPropsInterface } from './interfaces/charts-props.interface';

const Charts = (props: ChartsPropsInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          src={props.imageSrc}
          width={128}
          height={128}
          alt="logo svg"
          className={styles.image}
        />
        <div className={styles.name}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.artist}>{props.artistName}</span>
        </div>
      </div>
    </div>
  );
};

export default Charts;
