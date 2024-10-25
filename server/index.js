let dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const PORT = dotenv.parsed.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})