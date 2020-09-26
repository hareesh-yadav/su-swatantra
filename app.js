/* npm modules */
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import bodyParser from "body-parser"
import createError from "http-errors"
// import dotenv from "dotenv"

/* our moudules */
import "./helpers/mongo_connect.js"
import accountRoute from "./routes/account.js"

// dotenv.config()
const app=express()
const port=process.env.PORT||2733

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/",(req,res)=>{
  res.send("hello")
})

app.use("/account",accountRoute)

app.use(async (req,res,next)=>{
  next(createError.NotFound())
})

app.use((err,req,res,next)=>{
  res.send({
    err:{
      status:err.status||500,
      message:err.message
    }
  })
})
app.listen(port, ()=>{
    console.log(`server is ready to hearing on port ${port}`)
})
