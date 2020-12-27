const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const webPush = require("web-push")

const app = express()
app.use(express.static(path.join(__dirname, "client")))
app.use(bodyParser.json())

// Chave publica e privada geradas
const publicVapidKey = "BKOZAzm3uv3g1vKJHzaFzhwhUVMGJSyulub2amGdRCXb2bMqRQuMsYtZT0kq4jxfzlWg-9x07ir7VlYhtreSg-s"
const privateVapidKey = "kZy2qeowkgrW_F30Nz_ACtC52ow9R5C6wxjEPD6j-tQ"

webPush.setVapidDetails("maito:test@test.com", publicVapidKey, privateVapidKey)

// Recebendo notificações
app.post("/subscribe", (req, res) => {
    const subscription = req.body
    res.status(201).json({})
    const payload = JSON.stringify({ title: "Primeira notificação enviada" })

    webPush.sendNotification(subscription, payload).catch(err => console.log(err))
})

const port = process.env.PORT || 3333
app.listen(port, () => console.log(`Server started on port ${port}`))
