const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
require('dotenv').config()
const app = express()

app.set('view-engine','ejs')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

const URL = process.env.MONGODB_URL

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connecton = mongoose.connection
connecton.once("open", () =>{
    console.log('Mongodb connection success..!')
})

const userRoute = require('./routes/userRoute')
app.use("/user", userRoute)
const userAuthRoute = require('./routes/userAuthRoute')
app.use("/user", userAuthRoute)



const driverRoute = require('./routes/driverRoute')
app.use("/driver", driverRoute)
const driverAuthRoute = require('./routes/driverAuthRoute')
app.use("/driver", driverAuthRoute)



const adminRoute = require('./routes/adminRoute')
app.use("/admin", adminRoute)
const adminAuthRoute = require('./routes/adminAuthRoute')
app.use("/admin", adminAuthRoute)



const tripRoute = require('./routes/tripRoute')
app.use("/trip", tripRoute)


app.listen(PORT, () =>{
    console.log(`Server is up and runnig on port number: ${PORT}`)
})

//a b