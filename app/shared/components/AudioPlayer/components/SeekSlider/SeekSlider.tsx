'use client';
import React from 'react';

import { SeekSliderProps } from '../../Interfaces/SeekSliderPropsInterface';
import styles from './SeekSlider.module.scss';
import { timeFormat } from '@/app/helpers/timeFormat';

const SeekSlider = (props: SeekSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    props.onChange(value);
  };

  const validDuration =
    props.duration && !isNaN(props.duration) && props.duration > 0 ? props.duration : 0;
  const validCurrentTime = props.currentTime && !isNaN(props.currentTime) ? props.currentTime : 0;
  const progressPercentage = validDuration > 0 ? (validCurrentTime / validDuration) * 100 : 0;
  return (
    <div className={styles.seekContainer}>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          className={styles.seekSlider}
          min={0}
          max={validDuration}
          step={0.1}
          value={validCurrentTime}
          onChange={handleChange}
          disabled={validDuration === 0}
          style={{
            background: `linear-gradient(to right, #8a00b4 ${progressPercentage}%, #a6a5a6 ${progressPercentage}%)`,
          }}
        />
      </div>
      <div className={styles.timeLabels}>
        <span>{timeFormat(validCurrentTime)}</span>
        <span>{timeFormat(validDuration)}</span>
      </div>
    </div>
  );
};

export default SeekSlider;
