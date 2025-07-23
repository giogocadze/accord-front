import { ButtonEnum } from '../enums/button.enum';

export interface ButtonPropsInterface {
  title: string;
  disabled?: boolean;
  mode: ButtonEnum;
}
