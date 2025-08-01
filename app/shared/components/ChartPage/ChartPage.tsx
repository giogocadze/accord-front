import Image from 'next/image';
import styles from './ChartPage.module.scss';
import { chartData } from './data/chartData';

const ChartPage = () => {
  const formatPlays = (plays: number): string => {
    return plays.toLocaleString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.chartList}>
            {chartData.map(item => (
              <div key={item.id} className={styles.chartItem}>
                <div className={styles.card}>
                  <div className={styles.rank}>{item.id}</div>
                  <div className={styles.imageContainer}>
                    <Image
                      src={item.imageSrc}
                      width={104}
                      height={104}
                      alt={item.title}
                      className={styles.image}
                    />
                    <div className={styles.songInfo}>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.artist}>{item.artistName}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.main}>
                  <div className={styles.play}>
                    <div className={styles.plays}>{formatPlays(item.plays)}</div>
                  </div>
                  <div className={styles.album}>
                    <div className={styles.albums}>{item.albumName}</div>
                  </div>
                  <div className={styles.time}>
                    <div className={styles.duration}>{item.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
