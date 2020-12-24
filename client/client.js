const publicVapidKey = "BKOZAzm3uv3g1vKJHzaFzhwhUVMGJSyulub2amGdRCXb2bMqRQuMsYtZT0kq4jxfzlWg-9x07ir7VlYhtreSg-s"

// Checando o service worker
if("serviceWorker" in navigator) {
    send().catch(err => console.log(err))
}

// Registrar SW, Registro PUSH e Send PUSH
async function send() {
    // Registrando service worker
    console.log("Registering service worker...")
    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
    })

    // Registrando Push
    console.log("Service Worker registered...")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("Push Registered...")

    // Enviando Notificações
    console.log("Sending Push...")
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-type": "application/json"
        }
    })
    console.log("PUSH sent...")
}

// Convertendo a sequência de base segura de URL64 em um Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }