// このコンポーネントで状態を管理するのでclient componentにする
'use client';

import { fireAuth } from '@/lib/firebase'; // 自分のfirebase設定ファイルをimport
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

// Context型（contextが保持するログイン情報）
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Contextを作成（ログイン情報の初期値が必要）
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// プロバイダーコンポーネント（認証状態を監視して自分のネストコンポーネントに配る）
export function FireAuthProvider({ children }: { children: React.ReactNode }) {
  // ユーザーのログイン状態
  const [user, setUser] = useState<User | null>(null);
  // ログイン状態を確認する時のローダー
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // リッスン開始
    const unsubscribe = onAuthStateChanged(fireAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // コンポーネント破棄時にリスナー解除
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Contextを使うhook
export function useAuth() {
  return useContext(AuthContext);
}
