function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotification() {
  async function subscribeUser() {
    const registration = await navigator.serviceWorker.ready;

    // 通知の許可をもらう
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    // ブラウザのプッシュサーバーに登録
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
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
