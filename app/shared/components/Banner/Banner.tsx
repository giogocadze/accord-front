'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { originalImages } from '../utils/bannerImges';
import styles from './Banner.module.scss';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => setCurrentIndex(prev => prev + 1);
  const handlePrev = () => setCurrentIndex(prev => prev - 1);

  const totalSlides = originalImages.length;

  const getSliderImages = () => {
    const first = originalImages[0];
    const last = originalImages[originalImages.length - 1];
    return [last, ...originalImages, first];
  };

  useEffect(() => {
    const slideWidth = 1340 + 40;

    if (!trackRef.current) return;
    setIsTransitioning(true);

    trackRef.current.style.transition = 'transform 0.5s ease-in-out';
    trackRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  useEffect(() => {
    const slideWidth = 1340 + 40;

    const handleTransitionEnd = () => {
      if (!trackRef.current) return;

      if (currentIndex === 0) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(totalSlides);
        trackRef.current.style.transform = `translateX(-${totalSlides * slideWidth}px)`;
      }

      if (currentIndex === totalSlides + 1) {
        trackRef.current.style.transition = 'none';
        setCurrentIndex(1);
        trackRef.current.style.transform = `translateX(-${slideWidth}px)`;
      }
    };

    const node = trackRef.current;
    node?.addEventListener('transitionend', handleTransitionEnd);
    return () => node?.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, totalSlides]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <div className={styles.clickZoneLeft} onClick={handlePrev} />
        <div className={styles.clickZoneRight} onClick={handleNext} />
        <div className={styles.sliderWindow}>
          <div className={styles.sliderTrack} ref={trackRef}>
            {getSliderImages().map((src, i) => (
              <div key={i} className={styles.slide}>
                <Image
                  src={src}
                  alt={`banner-${i}`}
                  width={1340}
                  height={500}
                  className={styles.image}
                  unoptimized
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
                (currentIndex - 1 + totalSlides) % totalSlides === i ? styles.active : ''
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
