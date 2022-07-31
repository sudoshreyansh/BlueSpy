import express from "express"
import cors from 'cors'
import router from "./routes/index.js"

const app = express()
app.use(cors())
app.options('*', cors())

app.use('/api', router)

app.all('*', (req, res) => {
    res.status(404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

app.listen(process.env.PORT || 3000)