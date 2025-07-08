import React from 'react';
import styles from './Button.module.scss';
import { ButtonEnum } from './enums/button.enum';
import { ButtonPropsInterface } from './interfaces/button-props.inteface';

const Button = ({
  title,
  className = '',
  disabled = false,
  mode = ButtonEnum.BUTTONNEXT,
}: ButtonPropsInterface) => {
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

  const combinedClass = styles.buttonBase + ' ' + modeClass + (className ? ' ' + className : '');

  return (
    <button className={combinedClass} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
