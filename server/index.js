require('dotenv').config()
const express = require('express')
const app = express()
const { DatabaseConnection } = require('./Database')
const AuthRouter = require("./Router/authRouter")
const ProductRouter = require("./Router/productRouter")
const CategoryRouter = require("./Router/categoryRouter")
const UseRouter = require("./Router/userRouter")
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')

//Application lavel Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

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
app.use('/products', ProductRouter)
app.use('/category', CategoryRouter)
app.use("/user", UseRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})