import mongoose from "mongoose"

const schema=mongoose.Schema

const userSchema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        min:7
    },
    phone:{
        type:String,
        required:true,
        max:10
    }
})

const user=mongoose.model("user",userSchema)

export default user