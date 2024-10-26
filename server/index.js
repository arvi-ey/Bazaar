require('dotenv').config()
const express = require('express')
const app = express()
const { DatabaseConnection } = require('./Database')
const AuthRouter = require("./Router/authRouter")
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')

//Application lavel Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


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