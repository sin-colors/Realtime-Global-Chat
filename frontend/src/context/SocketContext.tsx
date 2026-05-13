import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      // authUserがいない（ログアウトした）場合はnullにする
      setSocket(null);
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocketContextはSocketContextProviderの内側で使ってください",
    );
  return context;
}

//-------------------------------------------
// setSocket(newSocket)のエラーについて

// このエラーは、React 18以降の「useEffect の中で同期的に setState を呼ぶと、レンダリングが2回連続（ cascading ）で発生して効率が悪いよ」という警告。
// authUser が変わる（1回目のレンダリング）
// useEffect が走る
// setSocket が走る（2回目のレンダリング）
// という2連発のレンダリングが発生するため、「効率が悪いよ」と教えてくれている。
// しかし、Socket.io のように 「外部システム（サーバー）と React の状態を同期させる」場合は、この挙動（2回レンダリング）は避けられない、かつ正しい挙動

// 無限ループは起きない: useEffect の依存配列が [authUser] だけなので、setSocket を呼んでも authUser が変わらない限り、この useEffect は再実行されない。
// Cascading Render 警告について: この警告は多くの場合、開発環境（StrictMode）でのみ強調される。ログインした瞬間に1回余分にレンダリングされるだけなので、チャットアプリの実用上のパフォーマンスには全く影響しない。

//------------------------------------------
// useSocketContextのFast Refreshについて
// この警告は、Vite（開発ツール）が「このファイルには Reactコンポーネント 以外（ContextオブジェクトやHook関数）もエクスポートされているから、コードを書き換えた時にその部分だけをスマートに更新（ホットリロード）できないよ。ページ全体をリロードしちゃうよ」と言っているもの。
// 開発中にそのファイルを保存したとき、ブラウザが「パッ」と部分更新されるのではなく、ページ全体が「クルッ」とリロードされるだけで、アプリの動作そのものや、本番環境でのパフォーマンスには一切影響しない。
// もしも、ファイルを分割するなら以下のような構成にする
// SocketContext.tsxに、Contextの定義とHookだけ
// SocketContextProvider.tsxに、Providerコンポーネント本体(SocketContextを上のファイルからインポート)
// どちらのファイルもcontextフォルダの中で良いと思う
