'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={() => signIn('line', { callbackUrl: '/', popup: true })}
    >
      ログイン
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={() => signOut()}
    >
      ログアウト
    </button>
  );
};
