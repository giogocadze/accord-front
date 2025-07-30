'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { originalImages } from '../utils/bannerImges';
import styles from './Banner.module.scss';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const images = [originalImages[originalImages.length - 1], ...originalImages, originalImages[0]];

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (!trackRef.current) return;
    const slideWidth = 1340 + 40;
    setIsTransitioning(true);

    const displayIndex = currentIndex;
    const actualIndex = displayIndex;

    trackRef.current.style.transition = 'transform 0.5s ease-in-out';
    trackRef.current.style.transform = `translateX(-${actualIndex * slideWidth}px)`;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      const slideWidth = 1340 + 40;

      if (!trackRef.current) return;

      if (currentIndex === 0) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(originalImages.length);
        trackRef.current.style.transform = `translateX(-${originalImages.length * slideWidth}px)`;
      }

      if (currentIndex === originalImages.length + 1) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(1);
        trackRef.current.style.transform = `translateX(-${slideWidth}px)`;
      }
    };

    const node = trackRef.current;
    if (node) node.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      if (node) node.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex]);

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

        <div className={styles.index}>
          {originalImages.map((_, i) => (
            <button
              key={i}
              className={`${styles.indicator} ${
                (currentIndex - 0 + originalImages.length) % originalImages.length === i
                  ? styles.active
                  : ''
              }`}
              onClick={() => setCurrentIndex(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
