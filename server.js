const express = require("express")

const mongoose = require("mongoose")

const bodyParser = require("body-parser")

require("dotenv").config()

const app = express()


app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URI,{

}).then(()=>console.log("MongoDB connected")).catch((err)=>console.error("Monogdb connection error",err))

const userRoutes = require("./routes/user")
const jobRoutes = require("./routes/job")
const companyRoutes = require("./routes/company")
const applicationRoutes = require("./routes/application")
const companyHrRoutes = require("./routes/companyHr")

app.use('/users',userRoutes)
app.use('/jobs',jobRoutes)
app.use('/companys',companyRoutes)
app.use('/applications', applicationRoutes)
app.use('/companyHrs',companyHrRoutes)

const Port =process.env.PORT||5000

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})