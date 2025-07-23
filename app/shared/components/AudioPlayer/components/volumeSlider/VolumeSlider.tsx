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
          background: `linear-gradient(to right, #620080 ${props.value * 100}%, #a6a5a6 ${props.value * 100}%)`,
        }}
      />
    </div>
  );
};

export default VolumeSlider;
