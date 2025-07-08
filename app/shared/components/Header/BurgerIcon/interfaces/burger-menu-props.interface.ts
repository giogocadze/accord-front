export interface BurgerMenuPropsInterface {
  mode: 'burger' | 'close';
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  className?: string;
}
