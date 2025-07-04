export interface InputPropsInterface {
  mode: 'homePageInput' | 'signInInput';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'email' | 'password';
  isError?: boolean;
}
