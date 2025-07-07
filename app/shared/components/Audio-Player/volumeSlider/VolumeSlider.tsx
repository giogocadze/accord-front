'use client';
import * as RadixSlider from '@radix-ui/react-slider';
import { VolumeSliderProps } from '../Interfaces/Volume-props.interface';
import styles from './VolumeSlider.module.scss';
const VolumeSlider = (props: VolumeSliderProps) => {
  const handleChange = (newValue: number[]) => {
    props.onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className={styles.sliderRoot}
      value={[props.value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label="Volume"
      orientation="vertical"
    >
      <RadixSlider.Track className={styles.sliderTrack}>
        <RadixSlider.Range className={styles.sliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.sliderThumb} />
    </RadixSlider.Root>
  );
};

export default VolumeSlider;
