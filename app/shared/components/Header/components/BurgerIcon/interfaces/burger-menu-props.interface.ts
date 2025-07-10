import { BurgerIconModeEnum } from '../enums/burger-icon.enum';

export interface BurgerMenuPropsInterface {
  mode: BurgerIconModeEnum;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  className?: string;
}
