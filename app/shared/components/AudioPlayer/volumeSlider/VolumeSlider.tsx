'use client';
import { VolumeSliderProps } from '../Interfaces/Volume-props.interface';
import styles from './VolumeSlider.module.scss';

const VolumeSlider = ({ value, onChange }: VolumeSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange?.(newValue);
  };

  return (
    <div className={styles.sliderRoot}>
      <input
        type="range"
        className={styles.slider}
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={handleChange}
        aria-label="Volume"
        style={{
          background: `linear-gradient(to right, #fff ${value * 100}%, #8f8f8f ${value * 100}%)`,
        }}
      />
    </div>
  );
};

export default VolumeSlider;
