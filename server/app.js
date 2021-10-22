const express = require ("express")
const mongoose = require("mongoose")
const cors = require ("cors")
const app = express();
const env = require  ("dotenv")
const userRoute =  require('./router/userRoute')
const postRoute = require ('./router/postRoutes')

env.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.Database_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(data=>{app.listen(5000)})
    .catch(err=>{console.log("db connection failed")})

app.get('/',(req,res)=>{
    res.json("Howdy")
})

app.use('/users',userRoute)
app.use('/posts',postRoute)