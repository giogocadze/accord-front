'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Input from '../Input/Input';
import styles from './Header.module.scss';
import BurgerIcon from './components/BurgerIcon/BurgerIcon';
import { BurgerIconModeEnum } from './components/BurgerIcon/enums/burger-icon.enum';
import LogoutButton from './components/LogoutButton/LogoutButton';
import NavLinks from './components/NavLink/NavLinks';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.background}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <Image src={'./Logo/Music, Audio/Note.svg'} width={56} height={56} alt="Logo" />
            </div>
            <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
              <NavLinks />
              {isOpen && (
                <div className={styles.logoutMobile}>
                  <LogoutButton />
                </div>
              )}
            </nav>
            <div className={styles.wrapper}>
              <div className={styles.inputContainer}>
                <Input
                  placeholder="Search"
                  mode="homePageInput"
                  value=""
                  onChange={() => {}}
                  type="text"
                />
              </div>
            </div>
            <div className={styles.box}>
              <LogoutButton />
            </div>
            <button className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
              <BurgerIcon
                mode={isOpen ? BurgerIconModeEnum.Close : BurgerIconModeEnum.Burger}
                isOpen={isOpen}
                onToggle={setIsOpen}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
