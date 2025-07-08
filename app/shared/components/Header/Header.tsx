'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Input from '../Input/Input';
import BurgerIcon from './BurgerIcon/BurgerIcon';
import styles from './Header.module.scss';
import LogoutButton from './LogoutButton/LogoutButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const navLinks = ['Home', 'Playlist', 'Song', 'Album', 'Artist', 'Chart'];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <header className={styles.background}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <Image src={'./Logo/Music, Audio/Note.svg'} width={56} height={56} alt="Logo" />
            </div>
            <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
              {navLinks.map(link => (
                <Link
                  key={link}
                  href="#"
                  className={link === activeLink ? styles.active : styles.link}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </Link>
              ))}
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
              <BurgerIcon mode={isOpen ? 'close' : 'burger'} isOpen={isOpen} onToggle={setIsOpen} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
