export interface InputPropsInterface {
  className?: string;
  mode?: 'homePageInput' | 'signInInput';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  isError?: boolean;
}
