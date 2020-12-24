console.log("Service Worker Loaded...")

self.addEventListener("push", (e) => {
    const data = e.data.json()
    console.log("Push Recieved...")

    self.registration.showNotification(data.title, {
        body: "Notified by Guilherme Humberto",
        icon: "https://th.bing.com/th/id/OIP.b9pK77Cwcc6nRvnz_dN2NAHaHa?w=178&h=180&c=7&o=5&dpr=1.25&pid=1.7"
    })
})