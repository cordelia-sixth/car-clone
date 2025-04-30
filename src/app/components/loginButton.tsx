'use client';

import { signIn } from 'next-auth/react';

export const LoginButton = () => {
  // const router = useRouter();

  // const saveUserInfo = async (user: User) => {
  //   if (user) {
  //     try {
  //       // 'users' コレクションに uid をドキュメントIDとして保存
  //       const userRef = doc(firestore, 'users', user.uid);
  //       const userData = {
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //         loginMethod: 'line',
  //         createdAt: new Date(),
  //       };
  //       // ドキュメントが存在する場合はマージ（更新）、存在しない場合は新規作成
  //       await setDoc(userRef, userData, { merge: true });
  //       console.log('LINEユーザー情報をFirestoreに保存しました。', userData);
  //     } catch (error) {
  //       console.log('Firestoreへの保存エラー：', error);
  //     }
  //   }
  // };

  // const handleClick = async () => {
  //   try {
  //     const lineProvider = new OAuthProvider(
  //       process.env.NEXT_PUBLIC_FIREBASE_OIDC_LINE as string,
  //     );
  //     const result = await signInWithPopup(fireAuth, lineProvider);
  //     console.log('LINEログイン成功: ', result.user);
  //     router.push('/dashboard');
  //     saveUserInfo(result.user);
  //   } catch (error) {
  //     console.log('LIENログイン失敗: ', error);
  //   }
  // };

  const openLoginPopup = async () => {
    const result = await signIn('line', {
      callbackUrl: '/dashboard',
      redirect: false,
      popup: true,
    });

    if (result?.error) {
      console.error('ログインエラー', result.error);
    }
  };

  return (
    <button
      className="cursor-pointer bg-green-400 p-5"
      onClick={openLoginPopup}
    >
      LINEでログイン
    </button>
  );
};
