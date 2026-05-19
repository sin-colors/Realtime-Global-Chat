/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";

// self を ServiceWorkerGlobalScope として型付け
declare const self: ServiceWorkerGlobalScope;

// Vite PWA がビルド時にキャッシュリストを注入する場所
precacheAndRoute(self.__WB_MANIFEST);

// プッシュ通知を受信した時のイベント
self.addEventListener("push", (event: PushEvent) => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: "/" }, // 通知タップ時の遷移先
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 通知をクリックした時のイベント
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if ((client as WindowClient).url === "/" && "focus" in client) {
          return (client as WindowClient).focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }
    }),
  );
});
