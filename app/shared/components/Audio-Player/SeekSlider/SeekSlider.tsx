'use client';
import * as RadixSlider from '@radix-ui/react-slider';
import React from 'react';
import { SeekSliderProps } from '../Interfaces/Slider-props.interface';
import styles from './SeekSlider.module.scss';
const SeekSlider = (props: SeekSliderProps) => {
  const handleChange: (value: number[]) => void = value => {
    props.onChange(value[0]);
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.seekContainer}>
      <div className={styles.sliderWrapper}>
        <RadixSlider.Root
          className={styles.seekSlider}
          min={0}
          max={props.duration}
          step={1}
          value={[props.currentTime]}
          onValueChange={handleChange}
          aria-label="Seek"
        >
          <RadixSlider.Track className={styles.seekTrack}>
            <RadixSlider.Range className={styles.seekRange} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={styles.seekThumb} />
        </RadixSlider.Root>
      </div>
      <div className={styles.timeLabels}>
        <span>{formatTime(props.currentTime)}</span>
        <span>{formatTime(props.duration || 0)}</span>
      </div>
    </div>
  );
};

export default SeekSlider;
