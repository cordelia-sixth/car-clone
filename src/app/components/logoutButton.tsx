'use client';

import { fireAuth } from '@/lib/firebase';
import { signOut } from '@firebase/auth';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await signOut(fireAuth);
      router.push('/');
    } catch (error) {
      console.log('ログアウトエラー', error);
    }
  };

  return (
    <button onClick={handleClick} className="cursor-pointer bg-green-400 p-5">
      ログアウト
    </button>
  );
};
