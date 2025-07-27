'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import styles from './BannerComponent.module.scss';

const originalImages = [
  '/bannerComponent/kendrick.png',
  '/bannerComponent/weeknd.png',
  '/bannerComponent/Frame5.png',
];

const BannerComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const images = [...originalImages, ...originalImages, ...originalImages];
  const originalCount = originalImages.length;

  const handleNext = () => {
    if (isTransitioning) return;
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (!trackRef.current) return;

    const slideWidth = 1340 + 40;
    setIsTransitioning(true);

    const displayIndex = ((currentIndex % originalCount) + originalCount) % originalCount;
    const actualIndex = displayIndex + originalCount;

    trackRef.current.style.transition = 'transform 0.5s ease-in-out';
    trackRef.current.style.transform = `translateX(-${actualIndex * slideWidth}px)`;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, originalCount]);

  useEffect(() => {
    if (!trackRef.current) return;
    const slideWidth = 1340 + 40;
    trackRef.current.style.transition = 'none';
    trackRef.current.style.transform = `translateX(-${originalCount * slideWidth}px)`;
  }, [originalCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <div className={styles.clickZoneLeft} onClick={handlePrev}></div>
        <div className={styles.clickZoneRight} onClick={handleNext}></div>
        <div className={styles.sliderWindow}>
          <div className={styles.sliderTrack} ref={trackRef}>
            {images.map((src, i) => (
              <div key={i} className={styles.slide}>
                <Image
                  src={src}
                  alt={`banner-${i}`}
                  width={1340}
                  height={500}
                  unoptimized
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
          {originalImages.map((_, i) => (
            <button
              key={i}
              className={`${styles.indicator} ${
                ((currentIndex % originalCount) + originalCount) % originalCount === i
                  ? styles.active
                  : ''
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
