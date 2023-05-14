const express = require('express')
const { healthRouter } = require('./routes/healthRoutes')
const cors = require('cors')
const { authentication } = require('./middlewares/authmiddlewares')
const { connection } = require('./config/db')
const { userRouter } = require('./routes/userRoutes')
require('dotenv').config()


require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())


app.use("/user", userRouter)


app.use(authentication)
app.use("/health",healthRouter)



app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server is running on port ${process.env.port}`)
})