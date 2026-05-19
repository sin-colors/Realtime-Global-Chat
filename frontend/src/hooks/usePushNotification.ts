export function usePushNotification() {
  async function subscribeUser() {
    const registration = await navigator.serviceWorker.ready;

    // 通知の許可をもらう
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    // ブラウザのプッシュサーバーに登録
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VAPID_PUBLIC_KEY,
    });

    // サーバーに保存
    const token = localStorage.getItem("chat-jwt");
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/notifications/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscription }),
      },
    );
  }

  return { subscribeUser };
}
