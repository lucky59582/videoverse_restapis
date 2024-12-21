const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const CONFIG = require("./config/config")
const authMiddleware = require("./middleware/authApiKey")
const appRoutes = require("./routes/index")

app.use(bodyParser.json())

app.get('/ping', (req,res) => {
    res.send("pong")
})
app.use("/api", authMiddleware, appRoutes)

app.listen(CONFIG.APP_PORT, () => {
    console.log(`Server running on port ${CONFIG.APP_PORT}`)
})