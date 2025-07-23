import React from 'react';
import styles from './Button.module.scss';
import { ButtonEnum } from './enums/button.enum';
import { ButtonPropsInterface } from './interfaces/button-props.inteface';

const Button = (props: ButtonPropsInterface) => {
  const mode = props.mode ?? ButtonEnum.BUTTONNEXT;
  const disabled = props.disabled ?? false;

  const modeClass =
    mode === ButtonEnum.REGISTRATION
      ? styles.buttonRegistration
      : mode === ButtonEnum.BUTTONNEXT
        ? styles.buttonNext
        : mode === ButtonEnum.CONFIRMATION
          ? styles.buttonConfirmation
          : mode === ButtonEnum.OUTLINER
            ? styles.outline
            : '';

  const combinedClass = modeClass + (props.mode ? ' ' + props.mode : '');

  return (
    <button className={combinedClass} disabled={disabled}>
      {props.title}
    </button>
  );
};

export default Button;
