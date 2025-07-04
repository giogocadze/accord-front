'use client';

import React, { useState } from 'react';
import Input from './components/Input';
import styles from './page.module.css';

const Page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value !== '' && !validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length > 0 && value.length < 6);

    setRepeatPasswordError(repeatPassword !== '' && value !== repeatPassword);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setRepeatPasswordError(password !== value);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        mode="homePageInput"
        placeholder="Search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        type="text"
      />

      <Input
        mode="signInInput"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        type="email"
        isError={emailError}
      />

      <Input
        mode="signInInput"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        isError={passwordError}
      />

      <Input
        mode="signInInput"
        placeholder="Repeat Your Password"
        value={repeatPassword}
        onChange={handleRepeatPasswordChange}
        type="password"
        isError={repeatPasswordError}
      />
    </div>
  );
};

export default Page;
