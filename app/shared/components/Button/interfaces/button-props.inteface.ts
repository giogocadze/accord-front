import { ButtonEnum } from '../enums/button.enum';

export interface ButtonPropsInterface {
  title: string;
  className?: string;
  disabled?: boolean;
  mode?: ButtonEnum;
}
