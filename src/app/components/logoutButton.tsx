'use client';

import { fireAuth } from '@/lib/firebase';
import { signOut } from '@firebase/auth';

export const LogoutButton = () => {
  const handleClick = async () => {
    try {
      await signOut(fireAuth);
      console.log('ログアウトしました');
    } catch (error) {
      console.log('ログアウトエラー', error);
    }
  };

  return <button onClick={handleClick}>ログアウト</button>;
};
