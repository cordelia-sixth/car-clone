import { authAdmin } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// セッションクッキーの名前（Firebaseのデフォルト）
const SESSION_COOKIE_NAME = 'firebase-session-token';

/**
 * サーバーコンポーネントでユーザーの認証状態を確認する
 * @returns ユーザー情報またはnull
 */
export async function getServerSession() {
  try {
    // クッキーからセッショントークンを取得
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.getAll(SESSION_COOKIE_NAME)?.[0]?.value;

    // セッションクッキーがない場合は未認証
    if (!sessionCookie) {
      return null;
    }

    // Firebase Adminを使用してセッションを検証
    const decodedClaims = await authAdmin.verifySessionCookie(
      sessionCookie,
      true,
    );

    // 検証されたユーザー情報を返す
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      emailVerified: decodedClaims.email_verified,
      displayName: decodedClaims.name,
      photoURL: decodedClaims.picture,
    };
  } catch (error) {
    // エラーが発生した場合は未認証とみなす
    console.error('セッション検証エラー:', error);
    return null;
  }
}

/**
 * 認証が必要なサーバーコンポーネントで使用する
 * 未認証の場合はリダイレクト
 */
export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    // 未認証の場合はログインページにリダイレクト
    redirect('/');
  }

  return session;
}

/**
 * セッションクッキーを設定するためのAPI関数
 * （APIルートで使用）
 */
export async function createSessionCookie(idToken: string, expiresIn: number) {
  try {
    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn,
    });
    return sessionCookie;
  } catch (error) {
    console.error('セッションクッキー作成エラー:', error);
    throw new Error('セッションの作成に失敗しました');
  }
}
