let dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const { DatabaseConnection } = require('./Database')
const AuthRouter = require("./Router/authRouter")

//Application lavel Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Db connection Function
DatabaseConnection(process.env.DB_URL)



app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/auth', AuthRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})