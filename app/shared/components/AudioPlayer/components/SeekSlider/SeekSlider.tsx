'use client';
import React from 'react';
import { formatTime } from '../../../../../helpers/timeformat';
import { SeekSliderProps } from '../../Interfaces/Slider-props.interface';
import styles from './SeekSlider.module.scss';

const SeekSlider = ({ duration, currentTime, onChange }: SeekSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange(value);
  };

  const validDuration = duration && !isNaN(duration) && duration > 0 ? duration : 0;
  const validCurrentTime = currentTime && !isNaN(currentTime) ? currentTime : 0;
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
        <span>{formatTime(validCurrentTime)}</span>
        <span>{formatTime(validDuration)}</span>
      </div>
    </div>
  );
};

export default SeekSlider;
