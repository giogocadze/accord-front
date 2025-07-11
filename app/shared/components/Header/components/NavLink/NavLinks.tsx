'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './NavLinks.module.scss';

const NavLinks = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const navLinks = ['Home', 'Playlist', 'Song', 'Album', 'Artist', 'Chart'];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className={styles.nav}>
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
    </nav>
  );
};

export default NavLinks;
