'use client';

import { useRouter } from 'next/navigation';
import styles from './LogoutButton.module.scss';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    router.push('/login');
  };

  return (
    <button className={styles.container} onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
