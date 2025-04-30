/**
 * Firebaseのリフレッシュトークンを送信して新しいIDトークンを取得する関数
 *
 * この関数が必要な理由
 * FirebaseのIDトークンは期限が短い（1時間程度）ので定期的に新しいものを取得し続ける必要がある。
 * サインイン時にリフレッシュトークンも同時に受け取っているので、それを使ってIDトークンを取得するのだ。
 * つまりこの関数を使えばログイン状態が維持できる。
 *
 * 帰ってくるデータの例
 * {
 *  "access_token": "ACCESS_TOKEN",
 *  "expires_in": "3600",
 *  "token_type": "Bearer",
 *  "refresh_token": "REFRESH_TOKEN",
 *  "id_token": "NEW_ID_TOKEN",
 *  "user_id": "some-uid"
 *  }
 *
 * 注意点
 * refresh_tokenは機密性が高いので、必ずサーバーサイドで使うこと。
 * もしクライアントに持たせるならHttpOnly Cookieなどの対策をすること（というより、基本持たせてはいけない）
 *
 *
 * @param refreshToken Firebase Authenticationが発行したリフレッシュトークン
 */
const fetchNewIdToken = async (refreshToken: string) => {
  const res = await fetch(
    // Firebase Auth API（Firebaseのプロジェクト）にリクエストを送信
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_TOKEN_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        // OAuth2の仕様で「リフレッシュトークンを使って再認証する」ことを示す
        grant_type: 'refresh_token',

        // 送信するリフレッシュトークン
        refreshToken,
      }),
    },
  );

  // レスポンスされたIDトークン
  const { id_token } = await res.json();
  return id_token;
};
