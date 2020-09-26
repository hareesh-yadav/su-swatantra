import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.MONGODB_URI,{
    dbName:process.env.DB_NAME,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Mongoose Connected")
}).catch((err)=>{
    console.log(err.message)
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to DB")
})

mongoose.connection.on("error", (err)=>{
    console.log(err)
})

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongoose disconnected")
})
process.on("SIGINT",async ()=>{
    await mongoose.connection.close()
    process.exit(0)
})