'use client';

import { useAuth } from '@/provider/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>認証中...</p>;
  }

  return (
    <>
      <h1>{user.displayName}でログイン</h1>
    </>
  );
}
