'use client';
import { VolumeSliderProps } from '../../Interfaces/VolumeSliderProps.ts';
import styles from './VolumeSlider.module.scss';

const VolumeSlider = (props: VolumeSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    props.onChange?.(newValue);
  };

  return (
    <div className={styles.sliderRoot}>
      <input
        type="range"
        className={styles.slider}
        min={0}
        max={1}
        step={0.01}
        value={props.value}
        onChange={handleChange}
        aria-label="Volume"
        style={{
          background: `linear-gradient(to right, #fff ${props.value * 100}%, #8f8f8f ${props.value * 100}%)`,
        }}
      />
    </div>
  );
};

export default VolumeSlider;
